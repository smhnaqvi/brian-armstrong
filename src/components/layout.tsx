import { Outlet } from 'react-router-dom'
import Sidebar from "./sidebar"
import { LogoText } from './logo';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[70px] p-6 relative min-h-screen">
        <div className="flex flex-col gap-1 mb-8">
          <h1 className='text-primary'>Simulator</h1>
          <LogoText />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;