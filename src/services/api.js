// API base URL - adjust this to point to your backend PHP server
const API_BASE_URL = 'http://localhost/projectvault/api';

// Check if a key exists
export const checkKey = async (accessKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check_key.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_key: accessKey }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error checking key:', error);
    return { success: false, message: 'Network error occurred' };
  }
};

// Get files and notes for a key
export const getFiles = async (accessKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_files.php?access_key=${encodeURIComponent(accessKey)}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching files:', error);
    return { success: false, message: 'Network error occurred' };
  }
};

// Upload files and text notes
export const uploadFiles = async (accessKey, files, noteContent = '') => {
  try {
    const formData = new FormData();
    formData.append('access_key', accessKey);
    
    if (noteContent) {
      formData.append('note_content', noteContent);
    }
    
    // Add files to form data
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append(`file_${i}`, files[i]);
      }
    }
    
    const response = await fetch(`${API_BASE_URL}/upload.php`, {
      method: 'POST',
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading files:', error);
    return { success: false, message: 'Network error occurred' };
  }
};

// Delete a single file
export const deleteFile = async (fileId, accessKey, fileType = 'file') => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete_file.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        file_id: fileId, 
        access_key: accessKey,
        file_type: fileType
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, message: 'Network error occurred' };
  }
};

// Delete all files for a key
export const deleteAllFiles = async (accessKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete_all.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_key: accessKey }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting all files:', error);
    return { success: false, message: 'Network error occurred' };
  }
};