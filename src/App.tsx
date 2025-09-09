import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ArtProvider } from './context/ArtContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Gallery from './pages/Gallery';
import ArtworkDetail from './pages/ArtworkDetail';
import SellArt from './pages/SellArt';
import MyListings from './pages/MyListings';
import MyPurchases from './pages/MyPurchases';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminReports from './pages/AdminReports';
import UserProfile from './pages/UserProfile';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user?.isAdmin) {
    return <Navigate to="/gallery" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/gallery" element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        } />
        
        <Route path="/artists" element={
          <ProtectedRoute>
            <Artists />
          </ProtectedRoute>
        } />
        
        <Route path="/artist/:id" element={
          <ProtectedRoute>
            <ArtistDetail />
          </ProtectedRoute>
        } />
        
        <Route path="/artwork/:id" element={
          <ProtectedRoute>
            <ArtworkDetail />
          </ProtectedRoute>
        } />
        
        <Route path="/sell-art" element={
          <ProtectedRoute>
            <SellArt />
          </ProtectedRoute>
        } />
        
        <Route path="/my-listings" element={
          <ProtectedRoute>
            <MyListings />
          </ProtectedRoute>
        } />
        
        <Route path="/my-purchases" element={
          <ProtectedRoute>
            <MyPurchases />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/users" element={
          <ProtectedRoute adminOnly>
            <AdminUsers />
          </ProtectedRoute>
        } />

        <Route path="/admin/reports" element={
          <ProtectedRoute adminOnly>
            <AdminReports />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ArtProvider>
          <AppContent />
        </ArtProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;