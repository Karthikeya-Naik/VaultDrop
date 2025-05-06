import { motion } from 'framer-motion';

const HowItWorks = () => {
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

  const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut"
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
            How <span className="text-[#3A86FF]">Vault</span>Drop Works
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-[#8338EC] mx-auto my-4"
          />
          <p className="mt-3 max-w-xl mx-auto text-lg text-gray-600 sm:text-xl">
            Simple, secure, and straightforward file storage
          </p>
        </motion.div>

        {/* Step 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={1}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 bg-[#3A86FF] md:w-24 flex items-center justify-center py-4 md:py-0">
                <span className="text-white text-3xl font-bold">1</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#3A86FF]/20 rounded-full flex items-center justify-center text-[#3A86FF] mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#212529]">Create or Enter Your Access Key</h3>
                </div>
                <p className="text-gray-600">
                  On the home page, enter any key of your choice to create a new vault. This key will be your 
                  unique identifier to access your files in the future. If you've already created a vault, simply 
                  enter your existing key to access your files.
                </p>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 bg-[#F8F9FA] p-4 rounded-md border border-gray-200"
                >
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Important:</span> Remember your access key! We don't store your key in a way 
                    that can be recovered. If you forget it, you won't be able to access your files.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={2}
          className="mt-8 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 bg-[#8338EC] md:w-24 flex items-center justify-center py-4 md:py-0">
                <span className="text-white text-3xl font-bold">2</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#8338EC]/20 rounded-full flex items-center justify-center text-[#8338EC] mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#212529]">Upload Your Files</h3>
                </div>
                <p className="text-gray-600">
                  Once you've entered your key, you'll be taken to your vault. Here, you can upload images, videos, 
                  PDFs, or create text notes. Simply click on the upload button and select the files you want to 
                  store. For text notes, use the text editor to write and save your content.
                </p>
                
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[
                    { 
                      icon: <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />,
                      label: "Images"
                    },
                    { 
                      icon: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />,
                      label: "Videos"
                    },
                    { 
                      icon: <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />,
                      label: "PDFs"
                    },
                    { 
                      icon: <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />,
                      label: "Text Notes"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#3A86FF]/10 p-2 rounded text-center"
                    >
                      <svg className="w-8 h-8 mx-auto text-[#3A86FF]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        {item.icon}
                      </svg>
                      <p className="mt-1 text-xs font-medium text-[#3A86FF]">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={3}
          className="mt-8 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 bg-[#3A86FF] md:w-24 flex items-center justify-center py-4 md:py-0">
                <span className="text-white text-3xl font-bold">3</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#3A86FF]/20 rounded-full flex items-center justify-center text-[#3A86FF] mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#212529]">Access Your Files Anytime</h3>
                </div>
                <p className="text-gray-600">
                  Whenever you need to access your files, simply return to VaultDrop and enter the same access key. 
                  Your files will be instantly available to view, download, or manage. You can access your vault from 
                  any device with an internet connection.
                </p>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 bg-[#38B000]/10 p-4 rounded-md border border-[#38B000]/20"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-[#38B000]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-[#38B000]">
                        Your files are always available as long as you remember your access key.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 4 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={4}
          className="mt-8 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 bg-[#8338EC] md:w-24 flex items-center justify-center py-4 md:py-0">
                <span className="text-white text-3xl font-bold">4</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#8338EC]/20 rounded-full flex items-center justify-center text-[#8338EC] mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#212529]">Manage Your Files</h3>
                </div>
                <p className="text-gray-600">
                  Within your vault, you can manage your files by deleting individual files or clearing your entire vault. 
                  The intuitive interface allows you to easily organize and manage your stored content. For added security, 
                  you can log out of your vault by clicking the logout button in the navigation bar.
                </p>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 flex items-center bg-[#FF006E]/10 p-4 rounded-md border border-[#FF006E]/20"
                >
                  <svg className="h-5 w-5 text-[#FF006E] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-[#FF006E]">
                    Always log out when using shared or public computers to protect your vault access.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={5}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-2 bg-[#3A86FF]" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-[#212529] mb-6">Security First Approach</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Security Feature 1 */}
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
                    <h3 className="text-lg font-semibold text-[#212529]">End-to-End Encryption</h3>
                  </div>
                  <p className="text-gray-600 ml-13 pl-12">
                    Your files are encrypted during transfer and at rest, ensuring maximum protection.
                  </p>
                </motion.div>
                
                {/* Security Feature 2 */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#3A86FF]/20 rounded-full flex items-center justify-center text-[#3A86FF] mr-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#212529]">No Data Collection</h3>
                  </div>
                  <p className="text-gray-600 ml-13 pl-12">
                    We don't track your usage or collect personal information beyond what's necessary.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={6}
          className="mt-12 max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-2 bg-[#FF006E]" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-[#212529] mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {[
                  { 
                    question: "Is VaultDrop really free to use?", 
                    answer: "Yes, VaultDrop is completely free for personal use. We may introduce premium features in the future, but the core functionality will always remain free."
                  },
                  { 
                    question: "What happens if I forget my access key?", 
                    answer: "Unfortunately, if you forget your access key, there is no way to recover your files. We do not store keys in a way that allows recovery, as this is essential to our security model. We strongly recommend storing your key somewhere safe."
                  },
                  { 
                    question: "How secure is VaultDrop?", 
                    answer: "VaultDrop uses secure storage methods to protect your files. Your access key is never stored in its original form, ensuring that only you can access your files. However, for highly sensitive data, we recommend additional encryption before uploading."
                  },
                  { 
                    question: "Is there a file size limit?", 
                    answer: "Yes, individual files are limited to 25MB to ensure optimal performance. If you need to store larger files, consider splitting them into smaller parts or using compression."
                  },
                  { 
                    question: "Can I share my files with others?", 
                    answer: "The simplest way to share files is to share your access key with trusted individuals. However, remember that anyone with your key can access, modify, or delete your files, so share with caution."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-[#F8F9FA] p-5 rounded-lg shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-[#212529] mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          custom={7}
          className="mt-12 max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-2 bg-[#38B000]" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-[#212529] mb-8">What Our Users Say</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    quote: "VaultDrop is perfect for storing my important documents. The key-based system is intuitive and secure.",
                    author: "Alex M., Teacher"
                  },
                  {
                    quote: "I needed a quick solution without registration hassles. VaultDrop delivered exactly what I needed.",
                    author: "Jamie L., Photographer"
                  },
                  {
                    quote: "The simplicity is what makes VaultDrop special. Easy access without compromising security.",
                    author: "Taylor S., Freelancer"
                  },
                  {
                    quote: "I recommend VaultDrop to anyone who wants secure storage without creating yet another account.",
                    author: "Morgan P., Developer"
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

        {/* Get Started CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={8}
          className="mt-12 max-w-4xl mx-auto mb-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#3A86FF] to-[#8338EC] rounded-lg shadow-xl overflow-hidden p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white/90 mb-6 max-w-lg mx-auto">
              Experience the simplicity and security of VaultDrop. No registration, no hassle - just secure file storage.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#FFFFFF" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-[#3A86FF] font-bold rounded-md shadow-md transition duration-200"
            >
              Try VaultDrop Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;