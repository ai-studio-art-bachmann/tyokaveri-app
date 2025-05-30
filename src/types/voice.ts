
export interface VoiceState {
  status: 'idle' | 'greeting' | 'recording' | 'sending' | 'waiting' | 'playing';
  isRecording: boolean;
  isPlaying: boolean;
  error: string | null;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface ConversationConfig {
  language: 'fi' | 'et' | 'en';
  webhookUrl: string;
}
