import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useArt } from '../context/ArtContext';
import { ArrowRight, Palette } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { artworks } = useArt();
  
  // Get a preview of some artworks
  const artworkPreviews = artworks.slice(0, 4);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-200 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-pink-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-40 blur-3xl"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="mx-auto h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Palette className="h-10 w-10 text-purple-600" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block">Discover, Buy, and Sell</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                Timeless Art
              </span>
            </motion.h1>
            
            <motion.p 
              className="max-w-md mx-auto text-xl text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore a curated collection of premium art, paintings, and digital works from top artists.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                to={isAuthenticated ? "/gallery" : "/register"} 
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              >
                {isAuthenticated ? "View Gallery" : "Get Started"} 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              {!isAuthenticated && (
                <Link 
                  to="/login" 
                  className="px-8 py-3 bg-white text-gray-800 font-medium rounded-full border border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Sign In
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Art Previews Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h2 
          className="text-2xl font-bold text-gray-900 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Featured Artworks
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {artworkPreviews.map((artwork) => (
            <motion.div 
              key={artwork.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="bg-white bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              <Link to={isAuthenticated ? `/artwork/${artwork.id}` : '/login'}>
                <div className="aspect-w-16 aspect-h-12 relative h-48 overflow-hidden">
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{artwork.title}</h3>
                  <p className="text-purple-600 font-bold">${artwork.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Features Section */}
      <div className="relative bg-white bg-opacity-50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Our Gallery
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="p-6 bg-white rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Curated Collection</h3>
              <p className="text-gray-600">Every piece is hand-selected by our team of art experts to ensure quality and authenticity.</p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-white rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Transactions</h3>
              <p className="text-gray-600">Buy and sell with confidence through our secure platform with buyer and seller protection.</p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-white rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Artist Community</h3>
              <p className="text-gray-600">Join a thriving community of artists and art enthusiasts sharing their passion.</p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Palette className="h-6 w-6 text-purple-400" />
              <span className="ml-2 text-lg font-bold text-white">ArtGallery</span>
            </div>
            
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ArtGallery. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;