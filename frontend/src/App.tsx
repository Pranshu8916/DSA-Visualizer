import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { VisualizerPage } from './pages/VisualizerPage';
import { DesignAlgorithm } from './pages/DesignAlgorithm';
import { Blogs } from './pages/Blogs';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-[#F8FBFF] text-[#1A2340] flex flex-col font-sans">
          {/* Top Floating Glassmorphism Navbar */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/visualizer" element={<VisualizerPage />} />
              <Route path="/sorting" element={<Navigate to="/visualizer?tab=sorting" replace />} />
              <Route path="/searching" element={<Navigate to="/visualizer?tab=searching" replace />} />
              <Route path="/stack" element={<Navigate to="/visualizer?tab=stack" replace />} />
              <Route path="/queue" element={<Navigate to="/visualizer?tab=queue" replace />} />
              <Route path="/linked-list" element={<Navigate to="/visualizer?tab=linkedlist" replace />} />
              <Route path="/tree" element={<Navigate to="/visualizer?tab=tree" replace />} />
              <Route path="/graph" element={<Navigate to="/visualizer?tab=graph" replace />} />
              <Route path="/recursion" element={<Navigate to="/visualizer?tab=recursion" replace />} />
              <Route path="/design-algorithm" element={<DesignAlgorithm />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer Component */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
