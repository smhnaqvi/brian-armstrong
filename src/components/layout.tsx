import { Outlet } from 'react-router-dom'
import Sidebar from "./sidebar"
import { LogoText } from './logo';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 relative">
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