import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { CATEGORIES } from '../utils/constants';
import { Plus, CalendarDays, Award } from 'lucide-react';
import LogAchievementModal from '../components/LogAchievementModal';

const Achievements = () => {
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: achievements, loading, refetch } = useFetch('/achievements');
  
  const filteredAchievements = achievements?.filter(
    ach => filter === 'All' ? true : ach.category === filter
  ) || [];

  return (
    <div className="animate-in fade-in duration-300 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-zinc-950 mb-2 tracking-tight font-grosek">Timeline</h1>
          <p className="text-zinc-500 font-medium font-manrope">Track your journey and milestones over time.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl flex items-center gap-2 font-bold shadow-md transition-all active:scale-[0.98] font-grosek"
        >
          <Plus className="w-5 h-5" /> Log Achievement
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {['All', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition-all font-semibold border ${
              filter === cat 
                ? 'bg-[#d4fe44] border-[#c4ec3e] text-zinc-950 shadow-sm' 
                : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-zinc-200 ml-4 md:ml-6 mt-10 space-y-12">
        {loading ? (
          <div className="text-zinc-500 ml-10 font-medium">Loading timeline...</div>
        ) : filteredAchievements.length === 0 ? (
          <div className="text-zinc-500 ml-10 font-medium">No achievements found in this category.</div>
        ) : (
          filteredAchievements.map((ach) => (
            <div key={ach._id} className="relative pl-10 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-white border-[4px] border-[#d4fe44] group-hover:scale-125 transition-transform shadow-sm" />
              
              <div className="bg-white border border-zinc-200 rounded-[1.5rem] p-6 sm:p-8 hover:border-zinc-300 transition-colors shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wide">
                      <Award className="w-4 h-4" /> {ach.category}
                    </span>
                    <span className="bg-[#d4fe44] text-zinc-950 px-2.5 py-1 rounded-lg text-xs font-bold">+{ach.points} XP</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 font-medium text-sm">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(ach.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-zinc-950 mb-2">{ach.title}</h3>
                <p className="text-zinc-600 leading-relaxed font-medium mb-6">{ach.description}</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                  <img src={ach.student?.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-zinc-200" />
                  <span className="font-semibold text-sm text-zinc-800">{ach.student?.name}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <LogAchievementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => refetch()} 
      />
    </div>
  );
};

export default Achievements;
