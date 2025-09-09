import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useArt } from '../context/ArtContext';
import { Palette, Search, Menu, X, Users, Flag, UserCircle, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { searchArtworks } = useArt();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/gallery?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white bg-opacity-10 backdrop-blur-lg fixed w-full z-10 border-b border-white border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/gallery" : "/"} className="flex items-center">
              <Palette className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                ArtGallery
              </span>
            </Link>
          </div>
          
          {isAuthenticated && (
            <div className="hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by title, description, or tags..."
                  className="pl-10 pr-4 py-2 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64 text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          )}
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {isAuthenticated ? (
                user?.isAdmin ? (
                  <>
                    <Link 
                      to="/admin" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-1" />
                      Dashboard
                    </Link>
                    <Link 
                      to="/admin/users" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                    >
                      <UserCircle className="h-4 w-4 mr-1" />
                      Users
                    </Link>
                    <Link 
                      to="/admin/reports" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                    >
                      <Flag className="h-4 w-4 mr-1" />
                      Reports
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/gallery" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all"
                    >
                      Gallery
                    </Link>
                    <Link 
                      to="/artists" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Artists
                    </Link>
                    <Link 
                      to="/my-listings" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all"
                    >
                      My Listings
                    </Link>
                    <Link 
                      to="/my-purchases" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all"
                    >
                      My Purchases
                    </Link>
                    <Link 
                      to="/sell-art" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all"
                    >
                      Sell Art
                    </Link>
                  </>
                )
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 rounded-md bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-all"
                  >
                    Register
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                  >
                    <UserCircle className="h-5 w-5 mr-2" />
                    {user?.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white bg-opacity-10 backdrop-blur-lg">
            {isAuthenticated ? (
              user?.isAdmin ? (
                <>
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/admin/users" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Users
                  </Link>
                  <Link 
                    to="/admin/reports" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Reports
                  </Link>
                </>
              ) : (
                <>
                  {/* Mobile search */}
                  <form onSubmit={handleSearch} className="p-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full text-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>

                  <Link 
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>

                  <Link 
                    to="/gallery" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link 
                    to="/artists" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Artists
                  </Link>
                  <Link 
                    to="/my-listings" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link 
                    to="/my-purchases" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Purchases
                  </Link>
                  <Link 
                    to="/sell-art" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sell Art
                  </Link>
                </>
              )
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-500 transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;