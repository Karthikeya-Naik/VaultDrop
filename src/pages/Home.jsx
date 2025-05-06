import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { checkKey } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [key, setKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a key in localStorage
    const storedKey = localStorage.getItem('vaultdrop_access_key');
    if (storedKey) {
      // If we have a key, navigate to vault
      navigate('/vault');
    }
  }, []); // Empty dependency array means this runs once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!key.trim()) {
      setError('Please enter a key');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Check if key exists
      const response = await checkKey(key);
      
      if (response.success) {
        // Store key in localStorage for use in Vault page
        localStorage.setItem('vaultdrop_access_key', key);
        // Pass the key to parent component before navigating
        props.onKeySubmit(key, response.keyExists || false);
        // Navigate to vault page
        navigate('/vault');
      } else {
        setError(response.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section - Title on left, form on right */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Title and description */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.7 }}
            >
              <motion.h1 
                className="text-5xl font-extrabold sm:text-6xl lg:text-7xl"
                variants={fadeIn}
              >
                <span className="text-[#3A86FF]">Vault</span>
                <span className="text-[#8338EC]">Drop</span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-xl text-gray-700 max-w-md"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
              >
                Secure file storage with key-based access. No account needed, no data shared. 
                Your files, your control.
              </motion.p>
              
              <motion.div 
                className="mt-8 flex space-x-4"
                variants={fadeIn}
                transition={{ delay: 0.4 }}
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No Registration
                </span>
                
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Simple & Secure
                </span>
              </motion.div>
            </motion.div>
            
            {/* Right side - Access key form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3A86FF] rounded-full opacity-10 blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#8338EC] rounded-full opacity-10 blur-2xl"></div>
              
              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden relative z-10"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-8 py-10">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Enter Your Access Key</h2>
                    <p className="mt-2 text-gray-600">
                      Access your files or create a new vault
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
                        Access Key
                      </label>
                      <input
                        type="text"
                        id="key"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3A86FF] focus:border-[#3A86FF] transition-all"
                        placeholder="Enter your secure access key"
                        required
                      />
                      {error && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 text-sm text-[#FF006E]"
                        >
                          {error}
                        </motion.p>
                      )}
                    </div>
                    
                    <div className="mt-8">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#3A86FF] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A86FF] transition-colors ${
                          isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : 'Access Vault'}
                      </motion.button>
                    </div>
                  </form>
                </div>
                
                <div className="bg-gray-50 px-8 py-4">
                  <div className="text-sm text-center">
                    <p className="text-gray-600">
                      First time? Enter any key to create a new vault.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-40 right-0 w-64 h-64 bg-[#3A86FF] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#8338EC] rounded-full opacity-5 blur-3xl"></div>
      </section>
      
      {/* How it works section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">How VaultDrop Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Secure, simple, and private file storage without the complexity
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#3A86FF] bg-opacity-10 rounded-full flex items-center justify-center text-[white] mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">1. Enter Your Key</h3>
              <p className="text-gray-600 leading-relaxed">
                Create a new vault with any key or access an existing one. Your key is never stored - remember it!
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#8338EC] bg-opacity-10 rounded-full flex items-center justify-center text-[white] mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">2. Upload Your Files</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload images, videos, PDFs, or save text notes securely in your private vault.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#FF006E] bg-opacity-10 rounded-full flex items-center justify-center text-[white] mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">3. Access Anytime</h3>
              <p className="text-gray-600 leading-relaxed">
                Return using the same key to access your files from any device, anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Features section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Designed for privacy and simplicity, VaultDrop offers the perfect solution for secure file storage
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              variants={fadeIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 bg-[#3A86FF] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Private Access</h3>
              <p className="text-gray-600">
                Only those with your access key can view or download your files.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              variants={fadeIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 bg-[#8338EC] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Multiple File Types</h3>
              <p className="text-gray-600">
                Store images, videos, PDFs, and text notes in one secure location.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              variants={fadeIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 bg-[#FF006E] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">No Registration</h3>
              <p className="text-gray-600">
                Skip account creation and go straight to storing your files.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              variants={fadeIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 bg-[#38B000] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Cross-Device Access</h3>
              <p className="text-gray-600">
                Access your files from any device with your secure key.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Security section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">Security First Approach</h2>
              <p className="mt-4 text-lg text-gray-600">
                VaultDrop is designed with your privacy and security as the top priority. We've built the system
                to ensure your data remains protected and accessible only to those with your unique access key.
              </p>
              
              <ul className="mt-8 space-y-4">
                <motion.li 
                  className="flex items-start"
                  variants={fadeIn}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#38B000]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-800">No Account Required</h3>
                    <p className="mt-1 text-gray-600">Your privacy matters - no personal information collected, no registration forms.</p>
                  </div>
                </motion.li>
                
                <motion.li 
                  className="flex items-start"
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#38B000]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-800">Simple Key Access</h3>
                    <p className="mt-1 text-gray-600">One key unlocks your vault from anywhere, anytime.</p>
                  </div>
                </motion.li>
                
                <motion.li 
                  className="flex items-start"
                  variants={fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#38B000]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-800">File Management</h3>
                    <p className="mt-1 text-gray-600">Easily upload, download, and delete files as needed.</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="mt-10 lg:mt-0"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3A86FF] to-[#8338EC] rounded-2xl transform rotate-3 scale-105 opacity-10"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                  <div className="p-6 rounded-xl bg-gray-50 mb-6">
                    <svg className="w-12 h-12 text-[#3A86FF] mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-xl font-bold text-center mb-4">Your Security Guarantee</h3>
                    <p className="text-gray-600 text-center">
                      We've designed VaultDrop with security as our foundation. Your files remain private, accessible only with your unique key.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-800">Private file storage</span>
                    </div>
                    
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-800">Zero tracking or analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Types of files section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">Store Any File Type</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              VaultDrop supports a wide range of file formats to meet all your storage needs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#3A86FF] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">Images</h3>
              <p className="text-sm text-gray-500">JPG, PNG, GIF</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#8338EC] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">Videos</h3>
              <p className="text-sm text-gray-500">MP4, MOV, AVI</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#FF006E] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">Documents</h3>
              <p className="text-sm text-gray-500">PDF, DOC, TXT</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#38B000] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">Notes</h3>
              <p className="text-sm text-gray-500">Text Notes</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#3A86FF] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">Archives</h3>
              <p className="text-sm text-gray-500">ZIP, RAR</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#8338EC] bg-opacity-10 rounded-full flex items-center justify-center text-[#ffffff] mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">Other</h3>
              <p className="text-sm text-gray-500">Any File Type</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-[#3A86FF] to-[#8338EC] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold sm:text-4xl mb-6"
            variants={fadeIn}
          >
            Ready to Secure Your Files?
          </motion.h2>
          
          <motion.p 
            className="text-xl opacity-90 max-w-2xl mx-auto mb-10"
            variants={fadeIn}
          >
            Create your private vault today. No registration, no hassle.
            Just enter a key and start uploading.
          </motion.p>
          
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <a 
              href="#top" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-[#3A86FF] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#3A86FF] focus:ring-white transition-colors"
            >
              Get Started Now
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;