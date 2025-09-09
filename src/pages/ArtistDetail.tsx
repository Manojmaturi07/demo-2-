import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArt } from '../context/ArtContext';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowLeft, Mail, Globe, Award } from 'lucide-react';
import { sampleArtists } from '../data/sampleArtists';
import ArtCard from '../components/ArtCard';

const ArtistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artworks } = useArt();
  
  const artist = sampleArtists.find(a => a.id === id);
  const artistArtworks = artworks.filter(art => art.artistId === id);
  
  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Artist not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Artists
        </motion.button>

        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-48 md:h-64 bg-purple-100">
            <motion.img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {artist.name}
                </motion.h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  Currently in {artist.location}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-4">
                <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact
                </button>
                <button className="flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all">
                  <Globe className="h-5 w-5 mr-2" />
                  Website
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">From</h3>
                <p className="text-gray-600">{artist.birthplace}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Joined</h3>
                <p className="text-gray-600">
                  {new Date(artist.joinedDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {artist.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{artist.bio}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
              <div className="flex items-start">
                <Award className="h-6 w-6 text-purple-600 mr-3 mt-1" />
                <p className="text-gray-600 leading-relaxed">{artist.experience}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Artworks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {artistArtworks.map((artwork) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ArtCard artwork={artwork} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;