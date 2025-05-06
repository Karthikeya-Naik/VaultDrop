import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vault from './pages/Vault';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';

function App() {
  const [accessKey, setAccessKey] = useState('');
  const [keyExists, setKeyExists] = useState(false);
  
  // Check if access key is stored in localStorage on app load
  useEffect(() => {
    const storedKey = localStorage.getItem('vaultdrop_access_key');
    if (storedKey) {
      setAccessKey(storedKey);
    }
  }, []);

  // Function to handle access key submission
  const handleKeySubmit = (key, exists) => {
    setAccessKey(key);
    setKeyExists(exists);
    localStorage.setItem('vaultdrop_access_key', key);
  };

  // Function to handle logout/clear key
  const handleLogout = () => {
    setAccessKey('');
    setKeyExists(false);
    localStorage.removeItem('vaultdrop_access_key');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar accessKey={accessKey} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  accessKey ? (
                    <Navigate to="/vault" replace />
                  ) : (
                    <Home onKeySubmit={handleKeySubmit} />
                  )
                } 
              />
              <Route 
                path="/vault" 
                element={
                  accessKey ? (
                    <Vault 
                      accessKey={accessKey} 
                      keyExists={keyExists} 
                      onLogout={handleLogout}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
              path="/about" 
              element={<About />} 
            />
            <Route 
              path="/how-it-works" 
              element={<HowItWorks />} 
            />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;