/**
 * Service for handling file and photo uploads
 */

// Function to upload a file to the server
export const uploadFile = async (file: File, webhookUrl: string): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'file');
    formData.append('filename', file.name);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error uploading file:', error);
    return false;
  }
};

// Function to upload a photo to the server
export const uploadPhoto = async (photoDataUrl: string, webhookUrl: string): Promise<boolean> => {
  try {
    // Convert data URL to blob
    const response = await fetch(photoDataUrl);
    const blob = await response.blob();
    
    // Create a file from the blob
    const filename = `photo_${new Date().toISOString().replace(/[:.]/g, '-')}.jpg`;
    const file = new File([blob], filename, { type: 'image/jpeg' });
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'photo');
    formData.append('filename', filename);

    const uploadResponse = await fetch(webhookUrl, {
      method: 'POST',
      body: formData
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed with status: ${uploadResponse.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return false;
  }
};
