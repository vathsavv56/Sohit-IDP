import { Link } from 'react-router';
import { Award, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-zinc-950 font-bold text-xl">
        <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center">
            <Award className="text-[#d4fe44] w-5 h-5" />
        </div>
        <span className="tracking-tight">AchieveTrack</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
               <span className="text-zinc-900 text-sm font-semibold leading-none">{user.name}</span>
               <span className="text-zinc-500 text-xs">{user.department}</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-zinc-200 flex items-center justify-center overflow-hidden border border-zinc-300">
              <img src={user.avatar} alt="avatar" />
            </div>
            <button 
              onClick={logout}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/login" className="text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="px-5 py-2 text-sm bg-[#d4fe44] hover:bg-[#c4ec3e] text-zinc-950 rounded-full font-bold transition-colors border-2 border-transparent hover:border-zinc-950">
              Join Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
