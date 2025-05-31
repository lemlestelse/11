import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Music, Disc, ShoppingBag, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-blackmetal-900">
      {/* Sidebar */}
      <div className="w-64 bg-blackmetal-800 border-r border-blackmetal-600 fixed h-full">
        <div className="p-6">
          <Link to="/admin" className="text-2xl font-bold text-blood-red">
            Admin Panel
          </Link>
        </div>
        
        <nav className="mt-6">
          <Link
            to="/admin"
            className={`flex items-center px-6 py-3 text-grimdark-300 hover:bg-blackmetal-700 hover:text-blood-red transition-colors duration-200 ${
              isActive('/admin') ? 'bg-blackmetal-700 text-blood-red' : ''
            }`}
          >
            <Home size={20} className="mr-3" />
            Dashboard
          </Link>
          
          <Link
            to="/admin/bands"
            className={`flex items-center px-6 py-3 text-grimdark-300 hover:bg-blackmetal-700 hover:text-blood-red transition-colors duration-200 ${
              isActive('/admin/bands') ? 'bg-blackmetal-700 text-blood-red' : ''
            }`}
          >
            <Music size={20} className="mr-3" />
            Bands
          </Link>
          
          <Link
            to="/admin/releases"
            className={`flex items-center px-6 py-3 text-grimdark-300 hover:bg-blackmetal-700 hover:text-blood-red transition-colors duration-200 ${
              isActive('/admin/releases') ? 'bg-blackmetal-700 text-blood-red' : ''
            }`}
          >
            <Disc size={20} className="mr-3" />
            Releases
          </Link>
          
          <Link
            to="/admin/products"
            className={`flex items-center px-6 py-3 text-grimdark-300 hover:bg-blackmetal-700 hover:text-blood-red transition-colors duration-200 ${
              isActive('/admin/products') ? 'bg-blackmetal-700 text-blood-red' : ''
            }`}
          >
            <ShoppingBag size={20} className="mr-3" />
            Products
          </Link>
          
          <Link
            to="/"
            className="flex items-center px-6 py-3 text-grimdark-300 hover:bg-blackmetal-700 hover:text-blood-red transition-colors duration-200 mt-auto"
          >
            <LogOut size={20} className="mr-3" />
            Exit Admin
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLayout;