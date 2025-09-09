import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useArt } from '../context/ArtContext';
import { motion } from 'framer-motion';
import { Users, Palette, Flag, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { artworks, artists } = useArt();

  // Calculate statistics
  const totalArtworks = artworks.length;
  const totalArtists = artists.length;
  const totalSales = artworks.reduce((acc, art) => acc + art.soldCount, 0);
  const recentArtworks = [...artworks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-gray-600 mt-2">Here's what's happening in your art gallery</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Artworks</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalArtworks}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Palette className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Artists</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalArtists}</h3>
              </div>
              <div className="bg-pink-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalSales}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Link to="/admin/reports" className="block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Reports</p>
                  <h3 className="text-2xl font-bold text-gray-900">0</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <Flag className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Recent Artworks */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Artworks</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentArtworks.map((artwork) => (
                  <tr key={artwork.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-md object-cover" src={artwork.imageUrl} alt={artwork.title} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{artwork.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{artwork.artist}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${artwork.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        artwork.sold
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {artwork.sold ? 'Sold' : 'Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(artwork.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;