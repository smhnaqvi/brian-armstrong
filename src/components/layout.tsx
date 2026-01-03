import { Outlet } from 'react-router-dom'
import Sidebar from "./sidebar"

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[70px] p-6 relative min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;