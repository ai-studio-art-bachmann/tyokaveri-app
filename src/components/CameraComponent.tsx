import React, { useRef, useState, useEffect } from 'react';
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
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Start camera
  const startCamera = async () => {
    console.log('startCamera function called');
    try {
      console.log('Attempting to access camera...');
      
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }
      
      // First try to access the environment camera (back camera on mobile)
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false
        });
        
        console.log('Back camera access granted');
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded');
            if (videoRef.current) videoRef.current.play();
          };
          setStream(mediaStream);
          setIsCameraActive(true);
          console.log('Camera is now active');
        }
      } catch (envError) {
        // If environment camera fails, try with default camera
        console.log('Back camera failed, trying default camera', envError);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        
        console.log('Default camera access granted');
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded');
            if (videoRef.current) videoRef.current.play();
          };
          setStream(mediaStream);
          setIsCameraActive(true);
          console.log('Camera is now active');
        }
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: t.cameraError,
        description: typeof error === 'object' && error !== null ? (error as Error).message : t.cameraPermissionDenied,
        variant: 'destructive'
      });
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Take photo
  const takePhoto = () => {
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
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Send photo
  const sendPhoto = () => {
    if (capturedImage) {
      onPhotoCapture(capturedImage);
      toast({
        title: t.photoSent,
        description: t.photoSentSuccess
      });
      setCapturedImage(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Camera preview or captured image */}
      <div className="relative w-full h-32 sm:h-40 bg-gray-100 rounded-lg overflow-hidden mb-3">
        {isCameraActive && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={true} /* Required for autoplay on some mobile browsers */
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(1)' }} /* Fix potential mirroring issues */
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
            onClick={(e) => {
              e.preventDefault(); // Prevent default button behavior
              console.log('Camera button clicked');
              // Add a small delay to help Android process the click event
              setTimeout(() => {
                startCamera();
              }, 100);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6"
            type="button" // Explicitly set button type
          >
            {t.startCamera}
          </Button>
        )}
        
        {isCameraActive && (
          <Button 
            onClick={takePhoto}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6"
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
            >
              <X size={16} className="mr-1" />
              {t.retakePhoto}
            </Button>
            
            <Button 
              onClick={sendPhoto}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
            >
              {t.sendPhoto}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
