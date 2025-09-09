import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Artwork } from '../types';
import { useArt } from '../context/ArtContext';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose }) => {
  const { purchaseArtwork } = useArt();
  const navigate = useNavigate();
  
  const handlePurchase = () => {
    purchaseArtwork(artwork.id);
    onClose();
    navigate('/my-purchases');
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl overflow-hidden shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-1 rounded-full bg-white bg-opacity-20 text-gray-800 hover:bg-opacity-30 transition-all z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="md:w-1/2 relative">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:w-1/2 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{artwork.title}</h2>
          <p className="text-gray-600 mb-4">by {artwork.artist}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {artwork.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="my-4 p-4 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">${artwork.price}</h3>
            {!artwork.sold ? (
              <button
                onClick={handlePurchase}
                className="w-full py-3 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                Buy Now
              </button>
            ) : (
              <p className="text-gray-500 italic">This artwork has been sold</p>
            )}
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Details</h3>
            <p className="text-gray-700">
              <span className="font-medium">Created:</span> {new Date(artwork.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Sold Count:</span> {artwork.soldCount}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArtworkModal;