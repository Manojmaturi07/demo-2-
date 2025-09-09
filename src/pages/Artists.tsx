import React from 'react';
import { Link } from 'react-router-dom';
import { useArt } from '../context/ArtContext';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Palette } from 'lucide-react';
import { sampleArtists } from '../data/sampleArtists';

const Artists: React.FC = () => {
  const { artworks } = useArt();

  const getArtistStats = (artistId: string) => {
    const artistWorks = artworks.filter(art => art.artistId === artistId);
    return {
      totalWorks: artistWorks.length,
      totalSold: artistWorks.reduce((acc, art) => acc + art.soldCount, 0),
      recentWork: artistWorks.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-3xl font-bold text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Artists
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
          {sampleArtists.map((artist) => {
            const stats = getArtistStats(artist.id);
            return (
              <motion.div
                key={artist.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <Link to={`/artist/${artist.id}`} className="block">
                  <div className="flex items-center mb-4">
                    <img 
                      src={artist.imageUrl} 
                      alt={artist.name}
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{artist.name}</h2>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {artist.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{artist.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {artist.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-purple-600">{stats.totalWorks}</p>
                      <p className="text-sm text-gray-600">Artworks</p>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-pink-600">{stats.totalSold}</p>
                      <p className="text-sm text-gray-600">Sold</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {new Date(artist.joinedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Palette className="h-4 w-4 mr-1" />
                      View Profile
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Artists;