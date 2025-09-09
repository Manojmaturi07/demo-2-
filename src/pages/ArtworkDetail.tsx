import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArt } from '../context/ArtContext';
import { Artwork } from '../types';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';

const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { artworks, purchaseArtwork } = useArt();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundArtwork = artworks.find(art => art.id === id);
      if (foundArtwork) {
        setArtwork(foundArtwork);
      } else {
        navigate('/gallery');
      }
    }
  }, [id, artworks, navigate]);

  const handlePurchase = () => {
    setShowCheckout(true);
  };

  const handleCheckoutComplete = () => {
    if (artwork) {
      purchaseArtwork(artwork.id);
      navigate('/my-purchases');
    }
  };

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading artwork...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Gallery
        </motion.button>

        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              className="p-8 md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{artwork.title}</h1>
              
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <p className="text-gray-600">by {artwork.artist}</p>
              </div>
              
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <p className="text-gray-600">
                  {new Date(artwork.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="flex items-start mb-6">
                <Tag className="h-5 w-5 text-gray-500 mr-2 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-purple-600">${artwork.price}</h2>
                  <span className="text-sm text-gray-500">
                    Sold: {artwork.soldCount} time{artwork.soldCount !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {!artwork.sold ? (
                  <motion.button
                    onClick={handlePurchase}
                    className="w-full py-3 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Now
                  </motion.button>
                ) : (
                  <p className="text-center text-gray-500 italic py-3">This artwork has been sold</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showCheckout && artwork && (
        <CheckoutModal
          artwork={artwork}
          onClose={() => setShowCheckout(false)}
          onComplete={handleCheckoutComplete}
        />
      )}
    </div>
  );
};

export default ArtworkDetail;