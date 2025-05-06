import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring", 
        stiffness: 200 
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          variants={containerVariants}
        >
          <motion.div 
            className="mb-6 md:mb-0"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-xl font-bold flex items-center"
              variants={logoVariants}
              // whileHover="hover"
            >
              <svg className="w-6 h-6 mr-2 text-[#3A86FF]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
              <span className="text-[#3A86FF]">Vault</span>
              <span className="text-[#8338EC]">Drop</span>
            </motion.h3>
            <motion.p 
              className="text-sm text-gray-400 mt-2"
              variants={itemVariants}
            >
              Secure file storage with key-based access
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col md:flex-row md:space-x-12"
            variants={containerVariants}
          >
            <motion.div 
              className="mb-6 md:mb-0"
              variants={itemVariants}
            >
              <motion.h4 
                className="text-sm font-semibold text-gray-300 mb-3 border-b border-gray-700 pb-2"
                variants={itemVariants}
              >
                Features
              </motion.h4>
              <motion.ul className="text-sm text-gray-400 space-y-2">
                <motion.li 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 3, color: "#3A86FF" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#3A86FF] mr-2">✓</span> 
                  Secure Key-Based Access
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 3, color: "#3A86FF" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#3A86FF] mr-2">✓</span> 
                  Multi-File Upload
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 3, color: "#3A86FF" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#3A86FF] mr-2">✓</span> 
                  Text Notes
                </motion.li>
              </motion.ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <motion.h4 
                className="text-sm font-semibold text-gray-300 mb-3 border-b border-gray-700 pb-2"
                variants={itemVariants}
              >
                Security
              </motion.h4>
              <motion.ul className="text-sm text-gray-400 space-y-2">
                <motion.li 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 3, color: "#8338EC" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#8338EC] mr-2">✓</span> 
                  No User Registration
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 3, color: "#8338EC" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#8338EC] mr-2">✓</span> 
                  No Keys Stored
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 3, color: "#8338EC" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#8338EC] mr-2">✓</span> 
                  Private Access
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400"
          variants={itemVariants}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            whileHover={{ scale: 1.02, color: "#3A86FF" }}
            transition={{ duration: 0.2 }}
          >
            © {new Date().getFullYear()} VaultDrop. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;