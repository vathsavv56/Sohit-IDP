import { useState } from 'react';
import { Link } from 'react-router';
import { Award, ArrowUpRight, ShieldCheck, Zap, LineChart, MoveRight } from 'lucide-react';

const Landing = () => {
  const [openFaq, setOpenFaq] = useState(0); // Index of the currently open FAQ

  const faqs = [
    {
      question: "Is my data safe with this platform?",
      answer: "We support a wide range of verified institutional achievements to ensure that your data is securely logged and safely managed throughout your academic journey, giving you a smooth experience."
    },
    {
      question: "How do I verify an achievement?",
      answer: "When you log an achievement, your department administrators will review the details and automatically verify it. Once verified, you will receive the corresponding points and digital badges."
    },
    {
      question: "Are there any fees for using the tracker?",
      answer: "No, the AchieveTrack platform is completely free for all verified students and faculty. Enjoy all premium features, including AI insights and the public leaderboard without any cost."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f2f3ef] text-zinc-950 selection:bg-[#d4fe44] selection:text-black pb-24">
      {/* Navbar inside the container to match the padding of the app */}
      <div className="pt-6 px-4 md:px-8 max-w-7xl mx-auto">
        <nav className="w-full h-20 flex items-center justify-between z-10 bg-white rounded-t-[2rem] px-8 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center">
               <Award className="w-5 h-5 text-[#d4fe44]" />
            </div>
            <span className="font-grosek font-bold text-xl tracking-tight">AchieveTrack</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a href="#features" className="hover:text-zinc-600 transition-colors">Features</a>
            <a href="#mission" className="hover:text-zinc-600 transition-colors">Mission</a>
            <a href="#faq" className="hover:text-zinc-600 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="font-medium text-sm hover:text-zinc-600 transition-colors">Sign In</Link>
            <Link to="/register" className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-sm font-medium transition-colors font-grosek">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section Container */}
        <main className="bg-white rounded-b-[2rem] px-8 py-16 md:py-24 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Text */}
          <div className="max-w-2xl relative z-10">
            {/* Launch pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-sm font-jmono font-bold uppercase tracking-wider mb-8 text-zinc-600">
               <span className="w-2 h-2 rounded-full bg-[#d4fe44] animate-pulse"></span>
               Vercel Monorepo Ready
            </div>

            <h1 className="font-grosek text-6xl lg:text-[5rem] font-black tracking-tight leading-[1.05] mb-6">
              Track & Earn <br />
              Digital Badges <br />
              <span className="text-zinc-400 font-medium italic">with AI Precision.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-500 max-w-lg mb-10 font-medium leading-relaxed">
              Log your academic accomplishments, securely climb the global leaderboard, and get dynamic Gemini AI insights to guide your next big milestone.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link to="/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d4fe44] hover:bg-[#c4ec3e] text-zinc-950 rounded-xl text-lg transition-all group font-grosek font-bold">
                Start Tracking Free
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </Link>
              <a href="#features" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl text-lg transition-all font-grosek font-bold">
                Explore Features
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                 <img src="https://ui-avatars.com/api/?name=A+B&background=18181b&color=fff" className="w-10 h-10 rounded-full border-2 border-white relative z-30" alt="" />
                 <img src="https://ui-avatars.com/api/?name=C+D&background=22c55e&color=fff" className="w-10 h-10 rounded-full border-2 border-white relative z-20" alt="" />
                 <img src="https://ui-avatars.com/api/?name=E+F&background=f59e0b&color=fff" className="w-10 h-10 rounded-full border-2 border-white relative z-10" alt="" />
               </div>
               <div className="flex flex-col">
                 <div className="flex items-center gap-1 text-zinc-900 pb-1">
                   {[...Array(5)].map((_,i) => <svg key={i} className="w-4 h-4 fill-[#d4fe44] text-[#d4fe44]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                 </div>
                 <span className="text-sm font-semibold text-zinc-600">Rated 4.9/5 by 10k+ Students</span>
               </div>
            </div>
          </div>

          {/* Right Visual element (Mockup / Shapes) */}
          <div className="relative w-full max-w-[480px] bg-[#d4fe44] rounded-[2rem] p-8 aspect-square flex flex-col shadow-sm border border-zinc-200">
             
             {/* Stat Tag Overlaid */}
             <div className="absolute top-10 -left-6 bg-white rounded-2xl p-4 shadow-[4px_4px_0_0_#18181b] border border-zinc-950 z-20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                  <LineChart className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                   <div className="text-[10px] font-jmono uppercase tracking-widest text-zinc-500 font-bold">Total Points</div>
                   <div className="text-2xl font-grosek font-black text-zinc-950 tracking-tight">12,450 XP</div>
                </div>
             </div>

             <div className="bg-zinc-950 w-full h-[85%] rounded-[1.5rem] mt-auto self-center border-[6px] border-zinc-900 border-b-0 rounded-b-none relative overflow-hidden flex flex-col p-6 text-white font-manrope">
                <div className="text-xs text-zinc-400 mb-1 font-jmono tracking-widest uppercase mt-4">Global Rank</div>
                <div className="text-5xl font-grosek font-bold mb-8 flex items-end gap-2 text-white tracking-tight">
                  #4 <span className="text-sm font-jmono pb-2 text-[#d4fe44] uppercase bg-[#d4fe44]/10 px-2 py-0.5 rounded">Top 1%</span>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                     <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center"><Award className="w-5 h-5"/></div>
                        <div>
                          <span className="block text-sm font-bold text-white leading-tight">Hackathon Winner</span>
                          <span className="block text-xs text-zinc-400 mt-0.5 font-medium">Computer Science</span>
                        </div>
                     </div>
                     <span className="text-[#d4fe44] text-base font-jmono font-bold">+500</span>
                   </div>
                   
                   <div className="flex items-center justify-between bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                     <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center"><Zap className="w-5 h-5"/></div>
                        <div>
                          <span className="block text-sm font-bold text-white leading-tight">Top Performer</span>
                          <span className="block text-xs text-zinc-400 mt-0.5 font-medium">Monthly Assessment</span>
                        </div>
                     </div>
                     <span className="text-[#d4fe44] text-base font-jmono font-bold">+250</span>
                   </div>
                </div>
             </div>
             
             {/* Floating rotating badge */}
             <div className="absolute -right-8 bottom-24 w-28 h-28 rounded-full bg-white border-2 border-zinc-950 shadow-[4px_4px_0_0_#18181b] flex items-center justify-center group cursor-default z-20">
               <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
                 <path id="curve" fill="transparent" d="M 50 15 A 35 35 0 1 1 49.9 15" />
                 <text className="text-[10px] font-jmono uppercase font-bold tracking-widest fill-zinc-950">
                   <textPath href="#curve"> • VERIFIED BADGES • AI INSIGHTS </textPath>
                 </text>
               </svg>
               <Award className="w-8 h-8 absolute text-[#d4fe44] fill-zinc-950 border-white" />
             </div>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 mt-32 text-center">
        <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-zinc-300 text-xs font-bold uppercase tracking-widest mb-8 font-jmono">
          Features
        </div>
        <h2 className="font-grosek text-4xl md:text-5xl font-bold mb-4 tracking-tight">Everything you need</h2>
        <p className="text-zinc-500 max-w-xl mx-auto mb-16">A simple, powerful set of tools to track accomplishments and gain actionable insights seamlessly.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-3xl p-8 border border-zinc-200 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-6 border border-zinc-200">
              <ShieldCheck className="w-5 h-5 text-zinc-950" />
            </div>
            <h3 className="text-xl font-bold mb-3">Verified Badges</h3>
            <p className="text-zinc-500 text-sm flex-1 mb-6">Earn and display official digital badges verified by administrators to prove your skills.</p>
            <div className="mt-auto px-4 py-2 bg-[#d4fe44]/20 text-zinc-900 w-max rounded-md font-semibold text-xs cursor-pointer hover:bg-[#d4fe44] transition-colors">
              Learn more ↗
            </div>
          </div>

          <div className="bg-[#d4fe44] rounded-3xl p-8 border border-[#c4ec3e] flex flex-col shadow-sm">
            <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mb-6 border border-[#c4ec3e]">
              <LineChart className="w-5 h-5 text-zinc-950" />
            </div>
            <h3 className="text-xl font-bold mb-3">Dynamic Leaderboard</h3>
            <p className="text-zinc-800 text-sm flex-1 mb-6">Rank yourself against peers safely and keep the motivational momentum high.</p>
            <div className="mt-auto px-4 py-2 bg-zinc-950 text-white w-max rounded-md font-semibold text-xs cursor-pointer hover:bg-zinc-800 transition-colors">
              Learn more ↗
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-zinc-200 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-6 border border-zinc-200">
              <Zap className="w-5 h-5 text-zinc-950" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Suggestions</h3>
            <p className="text-zinc-500 text-sm flex-1 mb-6">Leverage intelligent Gemini AI insights to auto-describe achievements and set new goals.</p>
            <div className="mt-auto px-4 py-2 bg-[#d4fe44]/20 text-zinc-900 w-max rounded-md font-semibold text-xs cursor-pointer hover:bg-[#d4fe44] transition-colors">
              Learn more ↗
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="max-w-4xl mx-auto px-6 mt-32 text-center pb-16">
        <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-zinc-300 text-xs font-bold uppercase tracking-widest mb-8 font-jmono">
          Our Mission
        </div>
        <h2 className="font-grosek text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
          We provide a secure, intuitive, <br className="hidden md:block" />
          and efficient platform
        </h2>
        <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">
          We believe in a decentralized future where every student has full control over their academic portfolio, verifying their achievements seamlessly and beautifully.
        </p>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-3xl mx-auto px-6 mt-20 mb-32 pb-16">
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 font-jmono">
             FAQs
           </div>
           <h2 className="font-grosek text-3xl md:text-4xl font-bold tracking-tight mb-4">
             Frequently asked questions
           </h2>
           <p className="text-zinc-500 font-medium">We have given answers to the most popular questions below</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className={`border ${isOpen ? 'bg-white border-zinc-200 shadow-sm' : 'bg-transparent border-zinc-200'} rounded-[1.5rem] p-6 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer transition-all duration-300 group`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-jmono font-bold text-xs shrink-0 ${isOpen ? 'bg-zinc-950 text-white mt-1 md:mt-0' : 'bg-white border text-zinc-500 border-zinc-300'}`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between cursor-pointer w-full">
                      <h3 className={`font-bold text-lg transition-colors ${isOpen ? 'text-zinc-950' : 'text-zinc-950 group-hover:text-zinc-600'}`}>
                        {faq.question}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-[#d4fe44] flex items-center justify-center shrink-0 transition-transform">
                        <span className="text-zinc-950 font-bold text-xl leading-none">{isOpen ? '−' : '+'}</span>
                      </div>
                  </div>
                  {isOpen && (
                    <div className="overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-zinc-600 mt-4 leading-relaxed font-medium">
                          {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Landing;
