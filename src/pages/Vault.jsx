import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getFiles, uploadFiles, deleteFile, deleteAllFiles } from '../services/api';
import FileCard from '../components/FileCard';

const Vault = ({ accessKey, isNewKey }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);
  
  // Redirect to home if no access key
  useEffect(() => {
    if (!accessKey) {
      navigate('/');
    } else {
      fetchFiles();
    }
  }, [accessKey, navigate]);
  
  // Fetch files for this access key
  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await getFiles(accessKey);
      
      if (response.success) {
        setFiles(response.files);
        setNotes(response.notes);
      } else {
        setError(response.message || 'Failed to load your vault');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0 && !noteContent.trim()) {
      setError('Please add a file or enter some text before saving');
      return;
    }
    
    try {
      setError('');
      setIsSaving(true);
      
      const response = await uploadFiles(accessKey, selectedFiles, noteContent);
      
      if (response.success) {
        // Clear form
        setSelectedFiles([]);
        setNoteContent('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Show success message
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        
        // Refresh files list
        fetchFiles();
      } else {
        setError(response.message || 'Failed to save to your vault');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle file deletion
  const handleDeleteFile = async (fileId, fileType) => {
    try {
      const response = await deleteFile(fileId, accessKey, fileType);
      
      if (response.success) {
        // Remove file from state
        if (fileType === 'text') {
          setNotes(notes.filter(note => note.id !== fileId));
        } else {
          setFiles(files.filter(file => file.id !== fileId));
        }
      } else {
        setError(response.message || 'Failed to delete file');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error(err);
    }
  };
  
  // Handle clearing all files
  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to delete all files and notes? This cannot be undone.')) {
      try {
        const response = await deleteAllFiles(accessKey);
        
        if (response.success) {
          setFiles([]);
          setNotes([]);
        } else {
          setError(response.message || 'Failed to clear vault');
        }
      } catch (err) {
        setError('Network error. Please check your connection and try again.');
        console.error(err);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#EDF2F7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center items-center mb-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#212529] mb-2">
              Your Secure Vault
            </h1>
            <p className="text-[#6c757d] max-w-2xl mx-auto">
              Your files and notes are securely stored and accessible only with your access key.
            </p>
          </div>
        </motion.div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#FFEEF2] border-l-4 border-[#FF006E] text-[#FF006E] p-4 mb-6 rounded-md shadow-sm" 
            role="alert"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-[#FF006E]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#E6F6EC] border-l-4 border-[#38B000] text-[#38B000] p-4 mb-6 rounded-md shadow-sm" 
            role="alert"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-[#38B000]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">Successfully saved to your vault!</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E2E8F0]"
            >
              <div className="px-6 py-5 border-b border-[#E2E8F0] bg-gradient-to-r from-[#3A86FF] to-[#8338EC]">
                <h2 className="text-xl font-semibold text-white">Add to Your Vault</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="px-6 py-5">
                <div className="mb-5">
                  <label className="block text-sm font-medium text-[#212529] mb-2">
                    Upload Files
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#E2E8F0] border-dashed rounded-lg transition-colors duration-300 hover:border-[#3A86FF]">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-[#8338EC]"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-[#6c757d]">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#3A86FF] hover:text-[#8338EC] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#3A86FF] transition-colors duration-300"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileChange}
                            ref={fileInputRef}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-[#6c757d]">
                        Images, videos, PDFs up to 10MB
                      </p>
                    </div>
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-[#3A86FF] font-medium">
                        {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                      </p>
                      <ul className="mt-1 text-xs text-[#6c757d] max-h-24 overflow-y-auto">
                        {selectedFiles.map((file, index) => (
                          <li key={index} className="truncate py-1 border-b border-dashed border-[#E2E8F0] last:border-0">
                            <span className="inline-block w-3 h-3 rounded-full bg-[#8338EC] mr-2"></span>
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="mb-5">
                  <label htmlFor="text-note" className="block text-sm font-medium text-[#212529] mb-2">
                    Add Text Note
                  </label>
                  <textarea
                    id="text-note"
                    name="text-note"
                    rows={4}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="block w-full border border-[#E2E8F0] rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-[#3A86FF] focus:border-[#3A86FF] sm:text-sm transition-colors duration-300"
                    placeholder="Type your secure note here..."
                  />
                </div>
                
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSaving}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#3A86FF] to-[#8338EC] hover:from-[#2563EB] hover:to-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A86FF] ${
                      isSaving ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save to Vault'
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
            
            {(files.length > 0 || notes.length > 0) && (
              <div className="mt-5">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleClearAll}
                  className="w-full flex justify-center py-3 px-4 border border-[#FF006E] text-sm font-medium rounded-lg text-[#FF006E] bg-white hover:bg-[#FFEEF2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF006E] transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All Files & Notes
                </motion.button>
              </div>
            )}
          </div>
          
          {/* Files and Notes Display */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <motion.div 
                  // animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-16 w-16 rounded-full border-t-4 border-b-4 border-[#3A86FF]"
                />
              </div>
            ) : (
              <div>
                {files.length === 0 && notes.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg p-8 text-center border border-[#E2E8F0]"
                  >
                    <div className="inline-block">
                      <svg className="mx-auto h-20 w-20 text-[#8338EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[#212529]">Your vault is empty</h3>
                    <p className="mt-2 text-[#6c757d]">
                      {isNewKey 
                        ? "Start by adding files or notes to your new vault."
                        : "Add some files or notes to your vault."}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-6 inline-block py-2 px-4 bg-gradient-to-r from-[#3A86FF] to-[#8338EC] text-white rounded-lg font-medium cursor-pointer"
                      onClick={() => document.getElementById('file-upload').click()}
                    >
                      Add Your First File
                    </motion.div>
                  </motion.div>
                ) : (
                  <div>
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl font-bold text-[#212529] mb-6"
                    >
                      Your Stored Files & Notes
                      <div className="h-1 w-20 bg-gradient-to-r from-[#3A86FF] to-[#8338EC] rounded-full mt-2"></div>
                    </motion.h2>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.05 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {/* Display files */}
                      {files.map((file) => (
                        <motion.div
                          key={`file-${file.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FileCard 
                            file={file} 
                            onDelete={(id) => handleDeleteFile(id, file.file_type)}
                          />
                        </motion.div>
                      ))}
                      
                      {/* Display text notes */}
                      {notes.map((note) => (
                        <motion.div
                          key={`note-${note.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-xl shadow-lg p-4 border border-[#E2E8F0] hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="flex items-start">
                            <div className="mr-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3A86FF] to-[#8338EC] flex items-center justify-center text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-[#6c757d] font-medium">
                                {new Date(note.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              <div className="mt-2 text-[#212529] whitespace-pre-wrap bg-[#F8F9FA] p-3 rounded-lg border border-[#E2E8F0]">
                                {note.content}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteFile(note.id, 'text')}
                              className="p-2 text-[#6c757d] rounded-full hover:bg-[#FFEEF2] hover:text-[#FF006E] transition-colors duration-200"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;