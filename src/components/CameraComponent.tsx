import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/utils/translations';
import { useToast } from '@/components/ui/use-toast';

interface CameraComponentProps {
  language: 'fi' | 'et' | 'en';
  onPhotoCapture: (photoData: string) => void;
}

export const CameraComponent: React.FC<CameraComponentProps> = ({
  language,
  onPhotoCapture
}) => {
  const t = getTranslations(language);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Start camera using useCallback from the example
  const startCamera = useCallback(async () => {
    console.log('startCamera function called');
    try {
      const constraints = {
        video: { facingMode: 'environment' }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) videoRef.current.play();
        };
        setIsCameraActive(true);
        console.log('Camera is now active');
      }
    } catch (err) {
      console.error('Error accessing the camera:', err);
      toast({
        title: t.cameraError,
        description: t.cameraPermissionDenied,
        variant: 'destructive'
      });
    }
  }, [t, toast]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Take photo
  const takePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        
        // Stop camera after taking photo
        stopCamera();
      }
    }
  }, [stopCamera]);

  // Retake photo
  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  // Send photo
  const sendPhoto = useCallback(() => {
    if (capturedImage) {
      onPhotoCapture(capturedImage);
      toast({
        title: t.photoSent,
        description: t.photoSentSuccess
      });
      
      // Reset after sending
      setCapturedImage(null);
    }
  }, [capturedImage, onPhotoCapture, t, toast]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Camera preview or captured image */}
      <div className="relative w-full h-32 sm:h-40 bg-gray-100 rounded-lg overflow-hidden mb-3">
        {isCameraActive && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={true} /* Required for autoplay on mobile browsers */
            className="w-full h-full object-cover"
          />
        )}
        
        {capturedImage && (
          <img 
            src={capturedImage} 
            alt={t.capturedPhoto} 
            className="w-full h-full object-cover" 
          />
        )}
        
        {!isCameraActive && !capturedImage && (
          <div className="flex flex-col items-center justify-center h-full">
            <Camera size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm">{t.cameraPlaceholder}</p>
          </div>
        )}
      </div>

      {/* Hidden canvas for capturing photos */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera controls */}
      <div className="flex justify-center space-x-3 w-full">
        {!isCameraActive && !capturedImage && (
          <Button 
            onClick={() => startCamera()}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6"
            type="button"
          >
            {t.startCamera}
          </Button>
        )}
        
        {isCameraActive && (
          <Button 
            onClick={takePhoto}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6"
            type="button"
          >
            {t.takePhoto}
          </Button>
        )}
        
        {capturedImage && (
          <>
            <Button 
              onClick={retakePhoto}
              variant="outline"
              className="rounded-full px-4"
              type="button"
            >
              <X size={16} className="mr-1" />
              {t.retakePhoto}
            </Button>
            
            <Button 
              onClick={sendPhoto}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
              type="button"
            >
              {t.sendPhoto}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
