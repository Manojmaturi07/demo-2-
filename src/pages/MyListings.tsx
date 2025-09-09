import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArt } from '../context/ArtContext';
import ArtCard from '../components/ArtCard';
import ArtworkModal from '../components/ArtworkModal';
import { motion } from 'framer-motion';
import { Artwork } from '../types';
import { Plus } from 'lucide-react';

const MyListings: React.FC = () => {
  const { myListings } = useArt();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Listings
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/sell-art" 
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Listing
            </Link>
          </motion.div>
        </div>
        
        {myListings.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">You don't have any listings yet</h2>
            <p className="text-gray-600 mb-6">Start selling your artwork by creating your first listing.</p>
            <Link 
              to="/sell-art" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-md"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Listing
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {myListings.map((artwork) => (
              <motion.div 
                key={artwork.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                <ArtCard 
                  artwork={artwork} 
                  onBuy={() => setSelectedArtwork(artwork)}
                  showBuyButton={false}
                  showSoldCount={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      )}
    </div>
  );
};

export default MyListings;