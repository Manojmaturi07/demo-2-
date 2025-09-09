import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Palette, ShoppingBag, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useArt } from '../context/ArtContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { myListings, myPurchases } = useArt();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header/Cover Image */}
          <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="h-32 w-32 rounded-full bg-white p-2 shadow-lg">
                <div className="h-full w-full rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="h-16 w-16 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center mt-1 text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <Link
                  to="/settings"
                  className="inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {user.isAdmin ? 'Admin' : user.isArtist ? 'Artist' : 'Collector'}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Artworks Listed</p>
                    <p className="text-2xl font-bold text-pink-600">{myListings.length}</p>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Palette className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Purchases</p>
                    <p className="text-2xl font-bold text-blue-600">{myPurchases.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {[...myListings, ...myPurchases]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((artwork) => (
                    <motion.div
                      key={artwork.id}
                      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Link to={`/artwork/${artwork.id}`} className="flex items-center">
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">{artwork.title}</h3>
                          <p className="text-sm text-gray-600">
                            {myListings.includes(artwork) ? 'Listed for sale' : 'Purchased'} •{' '}
                            {new Date(artwork.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-auto text-lg font-bold text-purple-600">
                          ${artwork.price}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;