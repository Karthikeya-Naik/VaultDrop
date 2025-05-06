import { useState } from 'react';
import { motion } from 'framer-motion';

const FileCard = ({ file, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setIsDeleting(true);
      await onDelete(file.id, file.file_type);
      setIsDeleting(false);
    }
  };
  
  // Determine file icon based on file type
  const getFileIcon = () => {
    switch (file.file_type) {
      case 'image':
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3A86FF] to-[#8338EC] flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'video':
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF006E] to-[#8338EC] flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
        );
      case 'pdf':
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF006E] to-[#3A86FF] flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8338EC] to-[#3A86FF] flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };
  
  // Create a formatted date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // For images and videos, show content with hover functionality
  const renderFileContent = () => {
    if (file.file_type === 'image') {
      return (
        <div className="flex justify-center my-2 relative overflow-hidden rounded-lg">
          <img 
            src={file.file_path} 
            alt={file.original_filename} 
            className="max-h-48 max-w-full object-contain rounded-lg shadow-md"
          />
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg"
            >
              <button 
                className="bg-white text-[#3A86FF] py-1 px-3 rounded-lg shadow-lg font-medium"
                onClick={() => window.open(file.file_path, '_blank')}
              >
                View Full Size
              </button>
            </motion.div>
          )}
        </div>
      );
    } else if (file.file_type === 'video') {
      return (
        <div className="flex justify-center my-2 relative overflow-hidden rounded-lg">
          <video 
            src={file.file_path}
            className="max-h-48 max-w-full object-contain rounded-lg shadow-md"
            // poster={file.file_path + '?poster=true'}
          />
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg"
            >
              <button 
                className="bg-white text-[#3A86FF] py-1 px-3 rounded-lg shadow-lg font-medium"
                onClick={() => window.open(file.file_path, '_blank')}
              >
                Play Video
              </button>
            </motion.div>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center my-3">
          <a 
            href={file.file_path} 
            target="_blank" 
            rel="noopener noreferrer"
            className="py-2 px-4 bg-gradient-to-r from-[#3A86FF] to-[#8338EC] text-white rounded-lg font-medium flex items-center shadow-md hover:shadow-lg transition-shadow"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            View/Download
          </a>
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-lg p-4 border border-[#E2E8F0] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start mb-2">
        <div className="mr-3">
          {getFileIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-[#212529] truncate">
            {file.original_filename}
          </h3>
          <p className="text-sm text-[#6c757d] mt-1">
            {formatDate(file.created_at)}
          </p>
          
          <div className="mt-1">
            <span className="inline-block px-2 py-1 bg-[#F8F9FA] text-[#6c757d] text-xs rounded-full">
              {file.file_type.toUpperCase()}
            </span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`p-2 text-[#6c757d] rounded-full hover:bg-[#FFEEF2] hover:text-[#FF006E] transition-colors ${
            isDeleting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isDeleting ? (
            <svg 
              className="w-5 h-5 animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>
      
      {renderFileContent()}
      
      {file.file_type !== 'image' && file.file_type !== 'video' && (
        <div className="mt-2 text-xs text-[#6c757d] text-center">
          <span className="inline-block w-2 h-2 rounded-full bg-[#38B000] mr-1"></span>
          Secure file storage
        </div>
      )}
    </motion.div>
  );
};

export default FileCard;