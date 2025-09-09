export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isArtist?: boolean;
  artistId?: string;
  isAdmin?: boolean;
  createdAt: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  location: string;
  birthplace: string;
  experience: string;
  imageUrl: string;
  specialties: string[];
  joinedDate: string;
  userId: string;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  tags: string[];
  artist: string;
  artistId: string;
  sold: boolean;
  soldCount: number;
  createdAt: string;
}

export interface Report {
  id: string;
  artworkId: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface Transaction {
  id: string;
  artworkId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export interface ArtContextType {
  artworks: Artwork[];
  myListings: Artwork[];
  myPurchases: Artwork[];
  artists: Artist[];
  reports: Report[];
  transactions: Transaction[];
  addArtwork: (artwork: Omit<Artwork, 'id' | 'artistId' | 'sold' | 'soldCount' | 'createdAt'>, artistInfo?: Omit<Artist, 'id' | 'joinedDate'>) => void;
  purchaseArtwork: (artworkId: string) => void;
  searchArtworks: (query: string) => Artwork[];
  getArtist: (id: string) => Artist | undefined;
  reportArtwork: (artworkId: string, reason: string, reportedBy: string) => void;
  removeArtwork: (artworkId: string) => void;
  removeArtist: (artistId: string) => void;
  removeUser: (userId: string) => void;
  removeReport: (reportId: string) => void;
  updateReportStatus: (reportId: string, status: Report['status']) => void;
}

export interface AdminStats {
  totalUsers: number;
  totalArtworks: number;
  totalArtists: number;
  totalSales: number;
  recentUsers: User[];
  recentArtworks: Artwork[];
  pendingReports: Report[];
}