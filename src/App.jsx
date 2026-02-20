import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Background from './components/common/Background';
import LoadingScreen from './components/common/LoadingScreen';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const SquadDirectory = lazy(() => import('./components/squad/SquadDirectory'));
const StudentProfile = lazy(() => import('./pages/StudentProfile'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Journey = lazy(() => import('./pages/Journey'));

function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen text-white">
      <LoadingScreen />
      <Background />
      <Navbar />

      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/squad" element={<SquadDirectory />} />
            <Route path="/universe" element={<Gallery />} />
            <Route path="/roadmap" element={<Journey />} />
            <Route path="/student/:id" element={<StudentProfile />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      {/* Footer */}
      <footer className="py-10 text-center text-white/20 text-xs border-t border-white/5">
        <p>© 2026 SQUAD 139 | KALVIUM ACADEMY | BUILT WITH PASSION</p>
      </footer>
    </div>
  );
}

export default App;
