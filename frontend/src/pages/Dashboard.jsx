import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Award, Zap, Trophy, Target, TrendingUp, Send, Loader2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import api from '../utils/api';
import LogAchievementModal from '../components/LogAchievementModal';

const Dashboard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am your AI Mentor. How can I help you rank up today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const fetchActivityData = async () => {
      if (!user?._id) return;
      try {
        const { data } = await api.get(`/achievements?studentId=${user._id}`);
        // Process data for the last 30 days
        const last30Days = [...Array(30)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (29 - i));
          return {
            date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            points: 0,
            originalDate: d
          };
        });

        data.forEach(ach => {
           const achDate = new Date(ach.date);
           const match = last30Days.find(
             day => day.originalDate.toDateString() === achDate.toDateString()
           );
           if (match) {
             match.points += ach.points;
           }
        });

        setChartData(last30Days);
      } catch (error) {
        console.error('Failed to fetch activity data:', error);
      }
    };
    fetchActivityData();
  }, [user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatLoading(true);

    try {
      const response = await api.post('/ai/chat', { 
        message: userMessage,
        context: `User is ${user?.name}, department ${user?.department}. Total Points: ${user?.totalPoints}.` 
      });
      setChatMessages(prev => [...prev, { role: 'assistant', content: response.data.text }]);
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-grosek text-4xl font-bold text-zinc-950 mb-2 tracking-tight">Overview</h1>
          <p className="text-zinc-500 font-medium">Welcome back, {user?.name}. Here's what's happening.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-[#d4fe44] hover:bg-[#c4ec3e] text-zinc-950 font-bold border border-[#c4ec3e] rounded-xl transition-all active:scale-[0.98] flex items-center gap-2 text-sm shadow-sm font-grosek"
        >
          <Award className="w-5 h-5" />
          Log Achievement
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          icon={<Trophy className="text-amber-500" />} 
          label="Total Points" 
          value={user?.totalPoints || 0}
          bgClass="bg-amber-100"
        />
        <StatCard 
          icon={<Award className="text-indigo-500" />} 
          label="Badges Earned" 
          value={user?.badges?.length || 0}
          bgClass="bg-indigo-100"
        />
        <StatCard 
          icon={<TrendingUp className="text-emerald-600" />} 
          label="Current Rank" 
          value="Top 15%"
          bgClass="bg-emerald-100"
        />
        <StatCard 
          icon={<Target className="text-blue-500" />} 
          label="Active Goals" 
          value="2"
          bgClass="bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 shadow-sm min-h-[350px] flex flex-col">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-grosek text-2xl font-bold text-zinc-950">Activity Timeline</h3>
               <button className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-semibold text-zinc-600 font-jmono uppercase tracking-widest hover:bg-zinc-100 transition-colors">Last 30 Days</button>
             </div>
             <div className="flex-1 w-full h-[250px] mt-4">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d4fe44" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#d4fe44" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: '#71717a'}} 
                        minTickGap={20}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: '#71717a'}} 
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ color: '#71717a', fontWeight: 600, marginBottom: '4px' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="points" 
                        stroke="#afcc1f" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorPoints)" 
                        activeDot={{ r: 6, fill: '#18181b', stroke: '#fff', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50">
                     <Loader2 className="w-6 h-6 animate-spin text-zinc-400 mb-2" />
                     <span className="text-zinc-500 text-sm font-medium">Loading timeline...</span>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Right Column (AI Chat) */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-[#d4fe44] border border-[#c4ec3e] rounded-[2rem] p-6 shadow-sm flex-1 flex flex-col min-h-[450px] max-h-[500px]">
             
             <div className="flex justify-between items-center mb-4 shrink-0 px-2">
               <h3 className="font-grosek text-2xl font-bold text-zinc-950 flex items-center gap-2">
                 <Zap className="w-6 h-6" fill="currentColor" /> AI Mentor
               </h3>
             </div>
             
             {/* Chat Messages */}
             <div className="flex-1 overflow-y-auto mb-4 space-y-3 font-manrope pr-2 custom-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3.5 rounded-2xl max-w-[85%] text-sm font-medium leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-zinc-950 text-white rounded-tr-sm' 
                        : 'bg-white/80 border border-[#c4ec3e] text-zinc-900 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="p-4 rounded-2xl bg-white/80 border border-[#c4ec3e] text-zinc-900 rounded-tl-sm shadow-sm flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                       <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                       <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
             </div>
             
             {/* Chat Input */}
             <form onSubmit={handleSendMessage} className="shrink-0 relative">
               <input
                 type="text"
                 value={chatInput}
                 onChange={(e) => setChatInput(e.target.value)}
                 disabled={chatLoading}
                 placeholder="Ask for advice or goals..."
                 className="w-full bg-white border border-[#c4ec3e] text-zinc-950 font-medium text-sm rounded-xl py-3.5 pl-4 pr-12 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-sm placeholder:text-zinc-400"
               />
               <button 
                 type="submit" 
                 disabled={!chatInput.trim() || chatLoading}
                 className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors"
               >
                  <Send className="w-4 h-4 -ml-0.5" />
               </button>
             </form>

          </div>
        </div>
      </div>

      <LogAchievementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { /* Refetch logic or toast trigger if necessary */ }} 
      />
    </div>
  );
};

const StatCard = ({ icon, label, value, bgClass }) => (
  <div className="bg-white border border-zinc-200 rounded-[1.5rem] p-6 flex flex-col gap-4 shadow-sm hover:-translate-y-1 transition-transform cursor-default">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/50 shadow-inner ${bgClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 font-jmono">{label}</p>
      <h4 className="font-grosek text-4xl font-black text-zinc-950 tracking-tight">{value}</h4>
    </div>
  </div>
);

export default Dashboard;
