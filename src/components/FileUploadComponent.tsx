import React, { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/utils/translations';
import { useToast } from '@/components/ui/use-toast';

interface FileUploadComponentProps {
  language: 'fi' | 'et' | 'en';
  onFileUpload: (file: File) => void;
}

export const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  language,
  onFileUpload
}) => {
  const t = getTranslations(language);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    console.log('File upload button clicked');
    if (fileInputRef.current) {
      console.log('Triggering file input click');
      fileInputRef.current.click();
    }
  };

  // Clear selected file
  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Send the file
  const sendFile = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      toast({
        title: t.fileSent,
        description: t.fileSentSuccess
      });
      clearSelectedFile();
    }
  };

  // Get file icon and name display
  const getFileDisplay = () => {
    if (!selectedFile) return null;
    
    const fileName = selectedFile.name;
    const fileSize = (selectedFile.size / 1024).toFixed(1) + ' KB';
    
    return (
      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex-shrink-0 mr-3">
          <File size={24} className="text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{fileName}</p>
          <p className="text-xs text-gray-500">{fileSize}</p>
        </div>
        <button 
          onClick={clearSelectedFile}
          className="ml-2 text-gray-400 hover:text-gray-500"
        >
          <X size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* File preview area */}
      <div className="w-full mb-4">
        {previewUrl ? (
          <div className="relative w-full h-32 sm:h-40 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={previewUrl} 
              alt={selectedFile?.name || t.selectedFile} 
              className="w-full h-full object-contain" 
            />
            <button 
              onClick={clearSelectedFile}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-1 text-white"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div 
            onClick={handleUploadClick}
            className="w-full h-32 sm:h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <Upload size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm">{t.dragDropFiles}</p>
            <p className="text-gray-400 text-xs mt-1">{t.orClickToUpload}</p>
          </div>
        )}
      </div>

      {/* Selected file info */}
      {selectedFile && !previewUrl && getFileDisplay()}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
      />

      {/* Upload controls */}
      <div className="flex justify-center space-x-3 w-full mt-3">
        {!selectedFile ? (
          <Button 
            onClick={() => {
              console.log('File select button in UI clicked');
              handleUploadClick();
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6"
          >
            {t.selectFile}
          </Button>
        ) : (
          <>
            <Button 
              onClick={clearSelectedFile}
              variant="outline"
              className="rounded-full px-4"
            >
              <X size={16} className="mr-1" />
              {t.cancel}
            </Button>
            
            <Button 
              onClick={sendFile}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
            >
              {t.sendFile}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
