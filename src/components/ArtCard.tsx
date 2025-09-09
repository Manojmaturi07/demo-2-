import React from 'react';
import { Link } from 'react-router-dom';
import { Artwork } from '../types';
import { useAuth } from '../context/AuthContext';
import { useArt } from '../context/ArtContext';
import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';

interface ArtCardProps {
  artwork: Artwork;
  onBuy?: () => void;
  showBuyButton?: boolean;
  showSoldCount?: boolean;
}

const ArtCard: React.FC<ArtCardProps> = ({ 
  artwork, 
  onBuy, 
  showBuyButton = true,
  showSoldCount = false
}) => {
  const { user, isAuthenticated } = useAuth();
  const { reportArtwork } = useArt();
  const { id, title, imageUrl, price, tags, artist, soldCount } = artwork;

  const handleReport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      const reason = prompt('Please provide a reason for reporting this artwork:');
      if (reason) {
        reportArtwork(id, reason, user.id);
        alert('Thank you for your report. Our admin team will review it.');
      }
    }
  };

  return (
    <motion.div 
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white border-opacity-20"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={isAuthenticated ? `/artwork/${id}` : '/login'}>
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {isAuthenticated && (
            <button
              onClick={handleReport}
              className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
              title="Report artwork"
            >
              <Flag className="h-4 w-4 text-red-500" />
            </button>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{title}</h3>
          <p className="text-purple-600 font-bold">${price}</p>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">by {artist}</p>
        
        {showSoldCount && (
          <p className="text-sm text-gray-600 mb-2">Sold: {soldCount} time{soldCount !== 1 ? 's' : ''}</p>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {isAuthenticated && showBuyButton && (
          <Link to={isAuthenticated ? `/artwork/${id}` : '/login'}>
            <button
              onClick={onBuy}
              className="w-full py-2 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Buy Now
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default ArtCard;