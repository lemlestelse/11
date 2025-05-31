import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Disc, ShoppingBag } from 'lucide-react';
import { bands } from '../../data/bands';
import { releases } from '../../data/releases';
import { products } from '../../data/products';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Bands</h2>
            <Music className="text-blood-red" size={24} />
          </div>
          <p className="text-3xl font-bold text-blood-red mb-2">{bands.length}</p>
          <Link to="/admin/bands" className="text-sm text-grimdark-300 hover:text-blood-red">
            Manage Bands →
          </Link>
        </div>

        <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Releases</h2>
            <Disc className="text-blood-red" size={24} />
          </div>
          <p className="text-3xl font-bold text-blood-red mb-2">{releases.length}</p>
          <Link to="/admin/releases" className="text-sm text-grimdark-300 hover:text-blood-red">
            Manage Releases →
          </Link>
        </div>

        <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Products</h2>
            <ShoppingBag className="text-blood-red" size={24} />
          </div>
          <p className="text-3xl font-bold text-blood-red mb-2">{products.length}</p>
          <Link to="/admin/products" className="text-sm text-grimdark-300 hover:text-blood-red">
            Manage Products →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blackmetal-800 border border-blackmetal-600 p-6">
          <h2 className="text-xl font-bold mb-4">Recent Bands</h2>
          <div className="space-y-4">
            {bands.slice(-5).reverse().map(band => (
              <div key={band.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{band.name}</h3>
                  <p className="text-sm text-grimdark-300">{band.country}</p>
                </div>
                <Link 
                  to={`/bands/${band.id}`} 
                  className="text-sm text-blood-red hover:text-blood-red/80"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blackmetal-800 border border-blackmetal-600 p-6">
          <h2 className="text-xl font-bold mb-4">Recent Releases</h2>
          <div className="space-y-4">
            {releases.slice(-5).reverse().map(release => (
              <div key={release.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{release.title}</h3>
                  <p className="text-sm text-grimdark-300">{release.artist}</p>
                </div>
                <Link 
                  to={`/releases/${release.id}`} 
                  className="text-sm text-blood-red hover:text-blood-red/80"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;