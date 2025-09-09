import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArt } from '../context/ArtContext';
import ArtCard from '../components/ArtCard';
import ArtworkModal from '../components/ArtworkModal';
import { motion } from 'framer-motion';
import { Artwork } from '../types';
import { ShoppingBag } from 'lucide-react';

const MyPurchases: React.FC = () => {
  const { myPurchases } = useArt();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-3xl font-bold text-gray-900 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Purchases
        </motion.h1>
        
        {myPurchases.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mx-auto h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No purchases yet</h2>
            <p className="text-gray-600 mb-6">Explore our gallery and find artwork that speaks to you.</p>
            <Link 
              to="/gallery" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-md"
            >
              Browse Gallery
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
            {myPurchases.map((artwork) => (
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

export default MyPurchases;