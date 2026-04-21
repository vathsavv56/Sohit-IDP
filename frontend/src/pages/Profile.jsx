import { useAuth } from '../hooks/useAuth';
import { Award, ShieldCheck, Mail, Briefcase, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="animate-in fade-in duration-300 max-w-4xl mx-auto space-y-10">
      {/* Profile Header */}
      <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 sm:p-10 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-32 bg-[#d4fe44]" />
        
        <div className="relative pt-12 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="w-28 h-28 rounded-3xl bg-white border-[6px] border-white shadow-xl overflow-hidden flex-shrink-0">
            <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 text-center sm:text-left mt-2">
            <h1 className="text-4xl font-extrabold text-zinc-950 mb-3 tracking-tight">{user?.name}</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 font-medium text-sm text-zinc-500">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {user?.email}</span>
              <span className="flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full"><Briefcase className="w-4 h-4" /> {user?.department}</span>
              <span className="flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full"><Calendar className="w-4 h-4" /> Member since 2026</span>
            </div>
          </div>
          
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 text-center min-w-[140px]">
            <p className="text-xs text-zinc-500 uppercase font-black tracking-wider mb-2">Total Points</p>
            <p className="text-4xl font-black text-zinc-950">{user?.totalPoints || 0}</p>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 sm:p-10 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-950 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
             <Award className="w-5 h-5 text-indigo-600" /> 
          </div>
          Badge Showcase
        </h2>
        
        {user?.badges?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {user.badges.map(badge => (
              <div key={badge._id} className="bg-zinc-50 border border-zinc-200 rounded-[1.5rem] p-6 text-center hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                <div className={`w-16 h-16 mx-auto rounded-full bg-white shadow-sm flex items-center justify-center mb-4 border border-zinc-200 text-zinc-800`}>
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-zinc-950 font-bold text-base mb-2">{badge.name}</h3>
                <p className="text-zinc-500 text-xs font-medium leading-relaxed">{badge.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-50 border-2 border-zinc-200 border-dashed rounded-[2rem] p-12 text-center text-zinc-500">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-40 text-zinc-400" />
            <p className="font-semibold text-zinc-600">You haven't earned any digital badges yet.<br/>Log achievements to unlock them!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
