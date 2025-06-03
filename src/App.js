import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Profile from './pages/Profile';
import './App.css';

// Main App component sets up routing and navigation
function App() {
  return (
    <MovieProvider>
      <Router>
        {/* Navigation bar with links to Home and Favorites */}
        <nav className="main-nav">
          <Link to="/" className="nav-btn">Home</Link>
          <Link to="/favorites" className="nav-btn">Favorites</Link>
          <Link to="/about" className="nav-btn">About</Link>
          <Link to="/profile" className="nav-btn">Profile</Link>
          
        </nav>
        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;