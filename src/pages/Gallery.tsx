import React, { useState } from 'react';
import { useArt } from '../context/ArtContext';
import ArtCard from '../components/ArtCard';
import { motion } from 'framer-motion';
import { Tag, X } from 'lucide-react';
import { Artwork } from '../types';

const Gallery: React.FC = () => {
  const { artworks } = useArt();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = [...new Set(artworks.flatMap(art => art.tags))].sort();

  // Sort and get latest 4 artworks
  const latestArtworks = [...artworks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  // Filter by selected tags
  const filteredArtworks = selectedTags.length > 0
    ? latestArtworks.filter(art => selectedTags.some(tag => art.tags.includes(tag)))
    : latestArtworks;

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => setSelectedTags([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Artworks
        </motion.h1>

        {/* Tag Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center mb-2">
            <Tag className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Filter by Tags</h2>

            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="ml-4 text-sm text-purple-600 hover:text-purple-700 flex items-center"
              >
                Clear filters <X className="h-4 w-4 ml-1" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Artworks */}
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No artworks match your selected tags.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                <ArtCard artwork={artwork} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
