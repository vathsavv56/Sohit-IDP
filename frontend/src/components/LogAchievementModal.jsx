import { useState } from 'react';
import { X, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { CATEGORIES } from '../utils/constants';

const LogAchievementModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0] || 'Academics',
    points: 10
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) {
      return toast.error('Please enter a title first to generate a description!');
    }
    
    setIsAiGenerating(true);
    try {
      const response = await api.post('/ai/generate-description', {
        title: formData.title,
        category: formData.category
      });
      setFormData(prev => ({ ...prev, description: response.data.description }));
      toast.success('Description generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate description');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return toast.error('Fill required fields');

    setIsSubmitting(true);
    try {
      await api.post('/achievements', formData);
      toast.success('Achievement logged! Awaiting approval.');
      onSuccess?.(); // Triggers a refetch or update on dashboard if needed
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit achievement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="flex justify-between items-center p-6 border-b border-zinc-100">
          <h2 className="font-grosek text-2xl font-bold text-zinc-950 tracking-tight">Log Achievement</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-zinc-800 mb-1.5 font-manrope">Achievement Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-950 rounded-xl p-3 focus:ring-4 focus:ring-[#d4fe44]/30 focus:border-[#d4fe44] outline-none transition-all font-medium placeholder:text-zinc-400"
              placeholder="e.g. Won 1st Place deeply Hacks"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1.5 font-manrope">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-950 rounded-xl p-3 focus:ring-4 focus:ring-[#d4fe44]/30 focus:border-[#d4fe44] outline-none transition-all font-medium cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1.5 font-manrope">Points Claim</label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-950 rounded-xl p-3 focus:ring-4 focus:ring-[#d4fe44]/30 focus:border-[#d4fe44] outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1.5">
               <label className="block text-sm font-semibold text-zinc-800 font-manrope">Description</label>
               <button 
                 type="button" 
                 onClick={handleGenerateDescription}
                 disabled={isAiGenerating}
                 className="text-xs flex items-center gap-1 text-zinc-500 hover:text-zinc-950 font-bold transition-colors disabled:opacity-50"
               >
                 {isAiGenerating ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3 text-amber-500" />}
                 AI Writer
               </button>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-950 rounded-xl p-3 focus:ring-4 focus:ring-[#d4fe44]/30 focus:border-[#d4fe44] outline-none transition-all font-medium resize-none placeholder:text-zinc-400"
              placeholder="Detail your contribution and success..."
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-zinc-950 bg-[#d4fe44] hover:bg-[#c4ec3e] font-bold rounded-xl text-base px-5 py-3.5 flex items-center justify-center transition-all disabled:opacity-70 active:scale-[0.98] shadow-sm font-grosek"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit for Approval'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default LogAchievementModal;
