import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArt } from '../context/ArtContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Upload, X, Plus, Check } from 'lucide-react';

const tagOptions = [
  'Abstract', 'Landscape', 'Portrait', 'Modern', 'Contemporary', 
  'Digital', 'Painting', 'Photography', 'Sculpture', 'Nature',
  'Urban', 'Geometric', 'Minimalist', 'Colorful', 'Space',
  'Fantasy', 'Vintage', 'Classic', 'Surreal', 'Comic'
];

const specialtyOptions = [
  'Oil Painting', 'Watercolor', 'Digital Art', 'Photography',
  'Sculpture', 'Mixed Media', 'Illustration', 'Street Art',
  'Contemporary', 'Traditional', 'Abstract', 'Realism',
  'Portrait', 'Landscape', 'Still Life', 'Conceptual Art'
];

const SellArt: React.FC = () => {
  const { addArtwork } = useArt();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Artwork form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  // Artist form state (for first-time artists)
  const [location, setLocation] = useState('');
  const [birthplace, setBirthplace] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    // Validate artwork fields
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price.trim()) newErrors.price = 'Price is required';
    if (isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Price must be a positive number';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (tags.length === 0) newErrors.tags = 'At least one tag is required';
    
    // Validate artist fields for first-time artists
    if (!user?.isArtist) {
      if (!location.trim()) newErrors.location = 'Location is required';
      if (!birthplace.trim()) newErrors.birthplace = 'Birthplace is required';
      if (!bio.trim()) newErrors.bio = 'Bio is required';
      if (!experience.trim()) newErrors.experience = 'Experience is required';
      if (specialties.length === 0) newErrors.specialties = 'At least one specialty is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add artwork with artist info if needed
    addArtwork(
      {
        title,
        description,
        imageUrl,
        price: Number(price),
        tags
      },
      !user?.isArtist ? {
        name: user?.name || '',
        bio,
        location,
        birthplace,
        experience,
        imageUrl: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Default artist image
        specialties,
        userId: user?.id || ''
      } : undefined
    );
    
    navigate('/my-listings');
  };
  
  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const toggleSpecialty = (specialty: string) => {
    setSpecialties(prev => prev.includes(specialty) ? prev.filter(s => s !== specialty) : [...prev, specialty]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {user?.isArtist ? 'Sell Your Artwork' : 'Become an Artist'}
        </motion.h1>
        
        <motion.div 
          className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Artwork Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Artwork Details</h2>
              
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Artwork Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.title ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                  } focus:border-transparent focus:outline-none focus:ring-2`}
                  placeholder="Enter a title for your artwork"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.description ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                  } focus:border-transparent focus:outline-none focus:ring-2`}
                  placeholder="Describe your artwork"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
              
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`w-full pl-7 pr-4 py-2 rounded-lg border ${
                      errors.price ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                    } focus:border-transparent focus:outline-none focus:ring-2`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>
              
              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <div className="flex items-center">
                  <input
                    id="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.imageUrl ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                    } focus:border-transparent focus:outline-none focus:ring-2`}
                    placeholder="Enter the URL of your artwork image"
                  />
                  <Upload className="h-5 w-5 text-gray-400 ml-2" />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter a URL to an existing image online (e.g., from your personal website or an image hosting service).
                </p>
                {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
                
                {/* Image Preview */}
                {imageUrl && (
                  <div className="mt-2 relative inline-block">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="h-32 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/1573434/pexels-photo-1573434.jpeg';
                        setErrors({...errors, imageUrl: 'Invalid image URL. Please provide a valid direct link to an image.'});
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Select tags that best describe your artwork</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className="ml-1 text-purple-600 hover:text-purple-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                  
                  {tags.length === 0 && (
                    <span className="text-sm text-gray-500 italic">No tags selected yet</span>
                  )}
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Available Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions
                      .filter(tag => !tags.includes(tag))
                      .map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                          <Plus className="h-3 w-3 mr-1" /> {tag}
                        </button>
                      ))}
                  </div>
                </div>
                {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
              </div>
            </div>

            {/* Artist Section - Only show if user is not already an artist */}
            {!user?.isArtist && (
              <div className="space-y-6 pt-8 border-t">
                <h2 className="text-xl font-semibold text-gray-900">Artist Profile</h2>
                
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.location ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                    } focus:border-transparent focus:outline-none focus:ring-2`}
                    placeholder="e.g., New York, USA"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                {/* Birthplace */}
                <div>
                  <label htmlFor="birthplace" className="block text-sm font-medium text-gray-700 mb-1">
                    Birthplace
                  </label>
                  <input
                    id="birthplace"
                    type="text"
                    value={birthplace}
                    onChange={(e) => setBirthplace(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.birthplace ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                    } focus:border-transparent focus:outline-none focus:ring-2`}
                    placeholder="e.g., London, UK"
                  />
                  {errors.birthplace && <p className="mt-1 text-sm text-red-600">{errors.birthplace}</p>}
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Artist Bio
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.bio ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                    } focus:border-transparent focus:outline-none focus:ring-2`}
                    placeholder="Tell us about yourself and your artistic journey"
                  />
                  {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <textarea
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.experience ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                    } focus:border-transparent focus:outline-none focus:ring-2`}
                    placeholder="Describe your artistic experience and achievements"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>

                {/* Specialties */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialties
                  </label>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Select your areas of expertise</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                      >
                        {specialty}
                        <button
                          type="button"
                          onClick={() => toggleSpecialty(specialty)}
                          className="ml-1 text-purple-600 hover:text-purple-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                    
                    {specialties.length === 0 && (
                      <span className="text-sm text-gray-500 italic">No specialties selected yet</span>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {specialtyOptions
                        .filter(specialty => !specialties.includes(specialty))
                        .map((specialty) => (
                          <button
                            key={specialty}
                            type="button"
                            onClick={() => toggleSpecialty(specialty)}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                          >
                            <Plus className="h-3 w-3 mr-1" /> {specialty}
                          </button>
                        ))}
                    </div>
                  </div>
                  {errors.specialties && <p className="mt-1 text-sm text-red-600">{errors.specialties}</p>}
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                whileH

over={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Check className="h-5 w-5 mr-2" />
                {user?.isArtist ? 'List Artwork for Sale' : 'Become an Artist & List Artwork'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SellArt;