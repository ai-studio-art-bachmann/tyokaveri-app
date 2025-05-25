import React, { useState } from 'react';
import { VoiceButton } from '@/components/VoiceButton';
import { CameraComponent } from '@/components/CameraComponent';
import { FileUploadComponent } from '@/components/FileUploadComponent';
import { TabSelector, TabType } from '@/components/TabSelector';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/utils/translations';
import { VoiceState } from '@/types/voice';
import { uploadFile, uploadPhoto } from '@/services/uploadService';
import { useToast } from '@/components/ui/use-toast';

interface InteractionPanelProps {
  voiceState: VoiceState;
  onVoiceInteraction: () => void;
  isVoiceDisabled: boolean;
  isWaitingForClick: boolean;
  language: 'fi' | 'et' | 'en';
  webhookUrl: string;
  onReset: () => void;
  hasMessages: boolean;
}

export const InteractionPanel: React.FC<InteractionPanelProps> = ({
  voiceState,
  onVoiceInteraction,
  isVoiceDisabled,
  isWaitingForClick,
  language,
  webhookUrl,
  onReset,
  hasMessages
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('audio');
  const t = getTranslations(language);
  const { toast } = useToast();

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handlePhotoCapture = async (photoData: string) => {
    try {
      const success = await uploadPhoto(photoData, webhookUrl);
      if (success) {
        toast({
          title: t.photoSent,
          description: t.photoSentSuccess
        });
      } else {
        toast({
          title: t.unknownError,
          description: 'Failed to upload photo',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: t.unknownError,
        description: 'Error uploading photo',
        variant: 'destructive'
      });
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const success = await uploadFile(file, webhookUrl);
      if (success) {
        toast({
          title: t.fileSent,
          description: t.fileSentSuccess
        });
      } else {
        toast({
          title: t.unknownError,
          description: 'Failed to upload file',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: t.unknownError,
        description: 'Error uploading file',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg mt-4 mb-8">
      <TabSelector 
        currentTab={activeTab} 
        onTabChange={handleTabChange} 
        language={language} 
      />
      
      <div className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {activeTab === 'audio' && (
            <>
              <VoiceButton
                voiceState={voiceState}
                onPress={onVoiceInteraction}
                disabled={isVoiceDisabled}
                isWaitingForClick={isWaitingForClick}
                language={language}
              />
              
              {hasMessages && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onReset}
                  className="text-xs px-4 py-2 rounded-full border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  {t.resetConversation}
                </Button>
              )}
            </>
          )}
          
          {activeTab === 'camera' && (
            <CameraComponent 
              language={language}
              onPhotoCapture={handlePhotoCapture}
            />
          )}
          
          {activeTab === 'files' && (
            <FileUploadComponent 
              language={language}
              onFileUpload={handleFileUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
};
