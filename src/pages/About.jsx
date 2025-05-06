import { motion } from 'framer-motion';

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#E9ECEF] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-[#212529] sm:text-5xl sm:tracking-tight lg:text-6xl">
            About <span className="text-[#3A86FF]">Vault</span>Drop
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-[#8338EC] mx-auto my-4"
          />
          <p className="mt-3 max-w-xl mx-auto text-lg text-gray-600 sm:text-xl">
            Secure, simple file storage with no registration required
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={1}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-2 bg-[#3A86FF]" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-[#212529] mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At VaultDrop, we believe that secure file storage should be accessible to everyone without the hassle of
                creating accounts or remembering complex passwords. Our mission is to provide a simple yet powerful solution
                for storing and accessing your important files using just a single access key.
              </p>
              <p className="text-gray-600">
                Whether you need to store important documents, share files, or just keep your personal data safe,
                VaultDrop offers a straightforward approach to file management with security at its core.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={2}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-2 bg-[#8338EC]" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-[#212529] mb-6">Key Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1 */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#3A86FF]/20 rounded-full flex items-center justify-center text-[#3A86FF] mr-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#212529]">Key-Based Access</h3>
                  </div>
                  <p className="text-gray-600 ml-13 pl-12">
                    No usernames or passwords to remember. Just enter your unique access key to retrieve your files.
                  </p>
                </motion.div>
                
                {/* Feature 2 */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#3A86FF]/20 rounded-full flex items-center justify-center text-[#3A86FF] mr-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#212529]">Multi-File Support</h3>
                  </div>
                  <p className="text-gray-600 ml-13 pl-12">
                    Upload images, videos, PDFs, and text notes all in one secure location.
                  </p>
                </motion.div>
                
                {/* Feature 3 */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#3A86FF]/20 rounded-full flex items-center justify-center text-[#3A86FF] mr-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#212529]">Secure Storage</h3>
                  </div>
                  <p className="text-gray-600 ml-13 pl-12">
                    Your files are stored securely and are only accessible with your unique key.
                  </p>
                </motion.div>
                
                {/* Feature 4 */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#3A86FF]/20 rounded-full flex items-center justify-center text-[#3A86FF] mr-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#212529]">Access Anywhere</h3>
                  </div>
                  <p className="text-gray-600 ml-13 pl-12">
                    Access your files from any device with an internet connection and your access key.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={3}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-2 bg-[#FF006E]" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-[#212529] mb-6">Why Choose VaultDrop?</h2>
              
              <div className="space-y-6">
                {[
                  { title: "No Registration Required", description: "Access your files instantly without creating an account." },
                  { title: "Simple Interface", description: "Our intuitive design makes file management easy for everyone." },
                  { title: "Privacy Focused", description: "We prioritize your privacy and the security of your files." },
                  { title: "Free to Use", description: "VaultDrop is completely free for personal use." }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex bg-[#F8F9FA] p-4 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[#38B000]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700"><span className="font-medium">{item.title}</span> - {item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={4}
          className="mt-12 max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-2 bg-[#8338EC]" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-[#212529] mb-6">Our Team</h2>
              
              <p className="text-center text-gray-600 mb-8">
                VaultDrop was created by a team of passionate developers who believe in making secure file storage 
                accessible to everyone. We're constantly working to improve and enhance the platform based on user feedback.
              </p>
              
              <div className="flex justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#3A86FF] text-white rounded-md transition duration-200 font-medium shadow-md"
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Section: Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={5}
          className="mt-12 max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-2 bg-[#38B000]" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-[#212529] mb-8">What Our Users Say</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    quote: "VaultDrop has revolutionized how I store and access my important documents. The key-based system is brilliantly simple!",
                    author: "Sarah J., Designer"
                  },
                  {
                    quote: "I needed a quick solution to store some PDFs securely. VaultDrop was perfect - no account creation, just instant access.",
                    author: "Michael T., Entrepreneur"
                  },
                  {
                    quote: "The security and simplicity of VaultDrop make it my go-to storage solution. I recommend it to all my colleagues.",
                    author: "David R., IT Professional"
                  },
                  {
                    quote: "As someone who values privacy, I appreciate VaultDrop's approach to secure file storage without unnecessary personal information.",
                    author: "Emma L., Student"
                  }
                ].map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="bg-[#F8F9FA] p-6 rounded-lg relative"
                  >
                    <svg className="h-8 w-8 text-[#3A86FF]/20 absolute top-4 left-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <div className="pl-6">
                      <p className="italic text-gray-600 mb-4">{testimonial.quote}</p>
                      <p className="font-medium text-[#3A86FF]">{testimonial.author}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;