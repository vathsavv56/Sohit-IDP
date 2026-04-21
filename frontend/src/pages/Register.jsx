import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Award, Mail, Lock, User, Briefcase, Loader2 } from 'lucide-react';
import { DEPARTMENTS } from '../utils/constants';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'General'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!name || !email || !password) return toast.error('Please fill all required fields');
    
    setIsSubmitting(true);
    try {
      await register(formData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f3ef] flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      <div className="w-full max-w-md z-10 my-8">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-zinc-200 shadow-sm">
              <Award className="w-8 h-8 text-[#d4fe44]" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-zinc-950">AchieveTrack</span>
          </Link>
        </div>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-950 mb-2 text-center">Create Account</h2>
          <p className="text-zinc-500 text-center text-sm mb-8">Start tracking your journey today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-zinc-50 border border-zinc-200 text-zinc-950 rounded-xl block w-full pl-10 p-3 focus:ring-2 focus:ring-[#d4fe44] focus:border-[#d4fe44] outline-none transition-all placeholder:text-zinc-400 font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-zinc-50 border border-zinc-200 text-zinc-950 rounded-xl block w-full pl-10 p-3 focus:ring-2 focus:ring-[#d4fe44] focus:border-[#d4fe44] outline-none transition-all placeholder:text-zinc-400 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1.5">Department</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
                </div>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-950 rounded-xl block w-full pl-10 pr-10 p-3 focus:ring-4 focus:ring-[#d4fe44]/30 focus:border-[#d4fe44] outline-none transition-all appearance-none font-medium cursor-pointer shadow-sm"
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept} className="bg-white text-zinc-900 font-medium">{dept}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-zinc-950 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-500 font-bold rounded-xl text-base px-5 py-3.5 text-center transition-all disabled:opacity-70 flex items-center justify-center mt-6"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-sm font-medium text-zinc-500 mt-8 text-center">
            Already have an account? <Link to="/login" className="text-zinc-950 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
