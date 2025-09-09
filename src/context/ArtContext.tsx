import React, { createContext, useState, useEffect, useContext } from 'react';
import { Artwork, ArtContextType, Artist } from '../types';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from '../utils/uuid';
import { sampleArtworks } from '../data/sampleArtworks';
import { sampleArtists } from '../data/sampleArtists';

const ArtContext = createContext<ArtContextType | undefined>(undefined);

export const useArt = () => {
  const context = useContext(ArtContext);
  if (!context) {
    throw new Error('useArt must be used within an ArtProvider');
  }
  return context;
};

export const ArtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [myListings, setMyListings] = useState<Artwork[]>([]);
  const [myPurchases, setMyPurchases] = useState<Artwork[]>([]);

  useEffect(() => {
    const storedArtworks = localStorage.getItem('artworks');
    const storedArtists = localStorage.getItem('artists');

    if (storedArtworks) {
      setArtworks(JSON.parse(storedArtworks));
    } else {
      setArtworks(sampleArtworks);
      localStorage.setItem('artworks', JSON.stringify(sampleArtworks));
    }

    if (storedArtists) {
      setArtists(JSON.parse(storedArtists));
    } else {
      setArtists(sampleArtists);
      localStorage.setItem('artists', JSON.stringify(sampleArtists));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const userListings = artworks.filter(art => art.artistId === user.artistId);
      setMyListings(userListings);

      const storedPurchases = localStorage.getItem(`purchases_${user.id}`);
      if (storedPurchases) {
        const purchaseIds = JSON.parse(storedPurchases);
        const userPurchases = artworks.filter(art => purchaseIds.includes(art.id));
        setMyPurchases(userPurchases);
      } else {
        setMyPurchases([]);
      }
    } else {
      setMyListings([]);
      setMyPurchases([]);
    }
  }, [user, artworks]);

  const getArtist = (id: string) => {
    return artists.find(artist => artist.id === id);
  };

  const addArtwork = (
    artworkData: Omit<Artwork, 'id' | 'artistId' | 'sold' | 'soldCount' | 'createdAt'>,
    artistInfo?: Omit<Artist, 'id' | 'joinedDate'>
  ) => {
    if (!user) return;

    let artistId = user.artistId;

    // Convert user to artist if they're not already one
    if (!user.isArtist && artistInfo) {
      artistId = uuidv4();
      const newArtist: Artist = {
        id: artistId,
        ...artistInfo,
        userId: user.id,
        joinedDate: new Date().toISOString()
      };

      const updatedArtists = [...artists, newArtist];
      setArtists(updatedArtists);
      localStorage.setItem('artists', JSON.stringify(updatedArtists));

      // Update user with artist status
      updateUser({
        isArtist: true,
        artistId
      });
    }

    const newArtwork: Artwork = {
      ...artworkData,
      id: uuidv4(),
      artistId: artistId!,
      artist: user.name,
      sold: false,
      soldCount: 0,
      createdAt: new Date().toISOString()
    };

    const updatedArtworks = [...artworks, newArtwork];
    setArtworks(updatedArtworks);
    localStorage.setItem('artworks', JSON.stringify(updatedArtworks));
  };

  const purchaseArtwork = (artworkId: string) => {
    if (!user) return;

    const updatedArtworks = artworks.map(art => {
      if (art.id === artworkId) {
        return {
          ...art,
          sold: true,
          soldCount: art.soldCount + 1
        };
      }
      return art;
    });
    setArtworks(updatedArtworks);
    localStorage.setItem('artworks', JSON.stringify(updatedArtworks));

    const storedPurchases = localStorage.getItem(`purchases_${user.id}`);
    const purchases = storedPurchases ? JSON.parse(storedPurchases) : [];
    
    if (!purchases.includes(artworkId)) {
      const updatedPurchases = [...purchases, artworkId];
      localStorage.setItem(`purchases_${user.id}`, JSON.stringify(updatedPurchases));
    }
  };

  const searchArtworks = (query: string): Artwork[] => {
    if (!query) return artworks;
    
    const lowerCaseQuery = query.toLowerCase();
    return artworks.filter(art => 
      art.title.toLowerCase().includes(lowerCaseQuery) || 
      art.description.toLowerCase().includes(lowerCaseQuery) ||
      art.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
  };

  const value = {
    artworks,
    artists,
    myListings,
    myPurchases,
    addArtwork,
    purchaseArtwork,
    searchArtworks,
    getArtist
  };

  return <ArtContext.Provider value={value}>{children}</ArtContext.Provider>;
};