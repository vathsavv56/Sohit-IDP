import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { CATEGORIES } from '../utils/constants';
import { Trophy, Medal, Star, Filter } from 'lucide-react';

const Leaderboard = () => {
  const [department, setDepartment] = useState('');
  const { data: leaderboard, loading } = useFetch(
    `/leaderboard${department ? `?department=${department}` : ''}`
  );

  return (
    <div className="animate-in fade-in duration-300 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-zinc-950 mb-2 tracking-tight">Leaderboard</h1>
          <p className="text-zinc-500 font-medium">See how you stack up against your peers.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-full py-1.5 px-2 shadow-sm">
          <Filter className="w-4 h-4 text-zinc-400 ml-2" />
          <select 
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-transparent text-zinc-950 font-semibold outline-none text-sm pr-4 appearance-none cursor-pointer"
          >
            <option value="">All Departments</option>
            {CATEGORIES.map(dept => ( 
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f9faf8] text-zinc-500 uppercase text-xs tracking-wider border-b border-zinc-200">
              <tr>
                <th className="px-8 py-5 font-bold">Rank</th>
                <th className="px-8 py-5 font-bold">Student</th>
                <th className="px-8 py-5 font-bold">Department</th>
                <th className="px-8 py-5 font-bold">Points</th>
                <th className="px-8 py-5 font-bold text-right">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-zinc-500 font-medium">Loading rankings...</td>
                </tr>
              ) : leaderboard?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-zinc-500 font-medium">No ranking data available.</td>
                </tr>
              ) : (
                leaderboard?.map((student, index) => {
                  const isTop3 = index < 3;
                  const isFirst = index === 0;
                  return (
                    <tr 
                      key={student._id} 
                      className={`hover:bg-zinc-50 transition-colors ${isFirst ? 'bg-[#d4fe44]/10' : ''}`}
                    >
                      <td className="px-8 py-5">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold ${isFirst ? 'bg-[#d4fe44] text-zinc-950 shadow-sm' : 'bg-zinc-100 text-zinc-600'}`}>
                          {isFirst ? <Trophy className="w-5 h-5 fill-zinc-950" /> : 
                           index === 1 ? <Medal className="text-slate-500 w-5 h-5" /> : 
                           index === 2 ? <Medal className="text-amber-600 w-5 h-5" /> : 
                           <span>{index + 1}</span>}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={student.avatar} alt="" className="w-10 h-10 rounded-full border border-zinc-200" />
                          <span className={`font-bold text-base ${isFirst ? 'text-zinc-950' : 'text-zinc-800'}`}>{student.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-zinc-500 font-medium">{student.department}</td>
                      <td className="px-8 py-5">
                        <span className="font-extrabold text-zinc-950 text-base">
                          {student.totalPoints}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {student.badges?.slice(0, 3).map((badge, i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                              <Star className={`w-4 h-4 ${badge.color || 'text-indigo-500'}`} fill="currentColor" />
                            </div>
                          ))}
                          {student.badges?.length > 3 && (
                            <span className="text-xs font-bold text-zinc-500 ml-2 rounded-full bg-zinc-100 px-2 py-1">+{student.badges.length - 3}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
