import { NavLink } from 'react-router';
import { LayoutDashboard, Award, Trophy, User, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  
  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { to: '/achievements', icon: <Award size={20} />, label: 'Achievements' },
    { to: '/leaderboard', icon: <Trophy size={20} />, label: 'Leaderboard' },
    { to: '/profile', icon: <User size={20} />, label: 'Profile' }
  ];

  if (user?.role === 'admin') {
    navItems.push({ to: '/admin', icon: <ShieldAlert size={20} />, label: 'Admin Panel' });
  }

  return (
    <aside className="w-64 bg-white border-r border-zinc-200 h-[calc(100vh-4rem)] hidden md:block sticky top-16">
      <nav className="p-4 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                isActive 
                  ? 'bg-[#d4fe44] text-zinc-950 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        {/* The Support Banner was here and is now removed */}
      </nav>
    </aside>
  );
};

export default Sidebar;
