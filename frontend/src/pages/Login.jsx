import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Award, Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Please fill all fields');
    
    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f3ef] flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-zinc-200 shadow-sm">
              <Award className="w-8 h-8 text-[#d4fe44]" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-zinc-950">AchieveTrack</span>
          </Link>
        </div>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-950 mb-2 text-center">Welcome back</h2>
          <p className="text-zinc-500 text-center text-sm mb-8">Sign in to track your achievements</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 text-zinc-950 rounded-xl block w-full pl-10 p-3 focus:ring-2 focus:ring-[#d4fe44] focus:border-[#d4fe44] outline-none transition-all placeholder:text-zinc-400 font-medium"
                  placeholder="student@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 text-zinc-950 rounded-xl block w-full pl-10 p-3 focus:ring-2 focus:ring-[#d4fe44] focus:border-[#d4fe44] outline-none transition-all placeholder:text-zinc-400 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-zinc-950 bg-[#d4fe44] hover:bg-[#c4ec3e] focus:ring-4 focus:outline-none focus:ring-[#d4fe44]/50 font-bold rounded-xl text-base px-5 py-3.5 text-center transition-all disabled:opacity-70 flex items-center justify-center mt-6 border border-[#c4ec3e]"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
            </button>
          </form>

          <p className="text-sm font-medium text-zinc-500 mt-8 text-center">
            Don't have an account? <Link to="/register" className="text-zinc-950 hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
