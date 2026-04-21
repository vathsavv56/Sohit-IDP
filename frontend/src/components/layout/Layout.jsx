import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f2f3ef] flex flex-col font-sans selection:bg-[#d4fe44] selection:text-black">
      <Navbar />
      <div className="flex flex-1 max-w-[1400px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-white m-4 rounded-[2rem] border border-zinc-200 shadow-sm min-h-[calc(100vh-6rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
