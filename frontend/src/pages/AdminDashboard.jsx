import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { ShieldCheck, Check, X, Loader2, Award } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const { user } = useAuth();

  const fetchPending = async () => {
    try {
      const { data } = await api.get('/achievements/pending');
      setPending(data);
    } catch (error) {
      toast.error('Failed to fetch pending achievements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleReview = async (id, status) => {
    setProcessingId(id);
    try {
      await api.put(`/achievements/${id}/approve`, { status });
      toast.success(`Achievement ${status}!`);
      // Remove it from the list instantly for snappy UI
      setPending((prev) => prev.filter((ach) => ach._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Review failed');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-grosek text-4xl font-bold text-zinc-950 mb-2 tracking-tight">Admin Reviews</h1>
          <p className="text-zinc-500 font-medium">Review and verify student accomplishments to maintain leaderboard integrity.</p>
        </div>
        <div className="px-5 py-2.5 bg-zinc-100 text-zinc-600 rounded-xl flex items-center gap-2 font-bold font-jmono text-xs uppercase tracking-widest border border-zinc-200">
          <ShieldCheck className="w-4 h-4" /> Admin Access
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-[2rem] p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-200">
            <Award className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="font-grosek text-2xl font-bold text-zinc-950 mb-2">You're all caught up!</h3>
          <p className="text-zinc-500 font-medium">There are no pending achievements left to verify right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((ach) => (
            <div key={ach._id} className="bg-white border border-zinc-200 rounded-[1.5rem] p-6 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm hover:border-zinc-300 transition-colors">
              
              <div className="flex items-center gap-4 shrink-0">
                <img 
                  src={ach.student?.avatar || `https://ui-avatars.com/api/?name=${ach.student?.name || 'S'}&background=d4fe44&color=000`} 
                  alt="" 
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-200 shadow-sm"
                />
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                  <h4 className="font-bold text-lg text-zinc-950">{ach.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md text-[10px] font-bold font-jmono uppercase tracking-widest">
                      {ach.category}
                    </span>
                    <span className="px-2.5 py-1 bg-[#d4fe44]/20 text-zinc-900 rounded-md text-[10px] font-bold font-jmono uppercase tracking-widest">
                      +{ach.points} XP
                    </span>
                  </div>
                </div>
                <p className="text-zinc-600 text-sm font-medium leading-relaxed">{ach.description}</p>
                <div className="text-xs text-zinc-400 font-medium">
                  Submitted by <span className="text-zinc-700 font-bold">{ach.student?.name}</span> ({ach.student?.department})
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-zinc-100 shrink-0">
                <button
                  onClick={() => handleReview(ach._id, 'rejected')}
                  disabled={processingId === ach._id}
                  className="flex-1 md:flex-none px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-bold text-sm rounded-xl transition-colors active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
                <button
                  onClick={() => handleReview(ach._id, 'approved')}
                  disabled={processingId === ach._id}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                >
                  {processingId === ach._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} 
                  Approve
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
