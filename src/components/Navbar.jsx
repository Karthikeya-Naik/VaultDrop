import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ accessKey, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
  };
  
  const logoVariants = {
    initial: { rotate: -10, scale: 0.9 },
    animate: { 
      rotate: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#3A86FF] to-[#8338EC] text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="w-8 h-8 mr-2 text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                </svg>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <span className="text-xl font-bold">
                  <span className="text-white">Vault</span>
                  <span className="text-white">Drop</span>
                </span>
              </motion.div>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <Link to="/" className="text-white hover:text-blue-200 transition duration-200 font-medium">
                Home
              </Link>
            </motion.div>
            
            <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <Link to="/how-it-works" className="text-white hover:text-blue-200 transition duration-200 font-medium">
                How It Works
              </Link>
            </motion.div>
            
            <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <Link to="/about" className="text-white hover:text-blue-200 transition duration-200 font-medium">
                About
              </Link>
            </motion.div>
            
            {accessKey && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center space-x-4 ml-4"
              >
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="text-sm bg-blue-900 bg-opacity-70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-400 border-opacity-20 shadow-inner"
                >
                  Active Key: {accessKey.substring(0, 3)}***
                </motion.span>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={onLogout}
                  className="px-4 py-1.5 text-sm rounded-md bg-red-500 hover:bg-red-600 transition duration-200 font-medium shadow-sm"
                >
                  Logout
                </motion.button>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu with AnimatePresence for smooth enter/exit */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-gradient-to-r from-[#3A86FF] to-[#8338EC] bg-opacity-95 backdrop-blur-sm"
          >
            <div className="px-3 pt-2 pb-3 space-y-1.5 sm:px-4 shadow-inner">
              <motion.div 
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <Link 
                  to="/" 
                  className="block px-3 py-2.5 rounded-lg text-white hover:bg-blue-600 transition duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </motion.div>
              
              <motion.div 
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Link 
                  to="/how-it-works" 
                  className="block px-3 py-2.5 rounded-lg text-white hover:bg-blue-600 transition duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
              </motion.div>
              
              <motion.div 
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/about" 
                  className="block px-3 py-2.5 rounded-lg text-white hover:bg-blue-600 transition duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>
              
              {accessKey && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col space-y-2 p-2 mt-3 border-t border-blue-400 border-opacity-30 pt-3"
                >
                  <motion.span 
                    whileHover={{ scale: 1.02 }}
                    className="text-sm bg-blue-900 bg-opacity-50 px-3 py-2 rounded-lg inline-block shadow-inner"
                  >
                    Active Key: {accessKey.substring(0, 3)}***
                  </motion.span>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 transition duration-200 font-medium shadow-sm"
                  >
                    Logout
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;