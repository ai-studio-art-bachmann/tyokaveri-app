
export interface Translations {
  // Header texts
  headerTitle: string;
  headerSubtitle: string;
  
  // Voice button states
  startConversation: string;
  greetingInProgress: string;
  listening: string;
  sending: string;
  waitingResponse: string;
  playingResponse: string;
  readyForClick: string;
  
  // Chat messages
  startRecording: string;
  stopRecording: string;
  sendingToServer: string;
  processingResponse: string;
  playingAudio: string;
  readyForNext: string;
  startConversationPrompt: string;
  greetingPlayed: string;
  readyToListen: string;
  listeningClickWhenReady: string;
  processingAudio: string;
  
  // Buttons and controls
  resetConversation: string;
  
  // Empty state
  pressToStart: string;
  
  // Footer
  footerText: string;
  
  // Error messages
  voiceError: string;
  tryAgain: string;
  unknownError: string;
  recordingFailed: string;
  noAudioDetected: string;

  // Tab navigation
  audioTab: string;
  filesTab: string;
  cameraTab: string;

  // Camera component
  startCamera: string;
  takePhoto: string;
  retakePhoto: string;
  sendPhoto: string;
  capturedPhoto: string;
  cameraPlaceholder: string;
  cameraError: string;
  cameraPermissionDenied: string;
  photoSent: string;
  photoSentSuccess: string;
  videoNoDimensionsError: string;
  videoLoadError: string;
  invalidWebhookUrl: string;
  uploadError: string;
  stopCamera: string;
  uploading: string;
  noSpeechDetected: string;
  recognitionError: string;
  voiceNamingNotAvailable: string;
  noPhotoOrFilenameError: string;
  zoomErrorTitle: string;
  zoomErrorDescription: string;
  switchingCameraText: string;
  switchToBackCamera: string;
  switchToFrontCamera: string;
  zoomInLabel: string;
  zoomOutLabel: string;

  // File upload component
  selectFile: string;
  sendFile: string;
  cancel: string;
  dragDropFiles: string;
  orClickToUpload: string;
  selectedFile: string;
  fileSent: string;
  fileSentSuccess: string;
}

export const translations: Record<'fi' | 'et' | 'en', Translations> = {
  fi: {
    headerTitle: 'Älykästä apua työmaalle!',
    headerSubtitle: 'Ääniohjattu työkalu rakennustyömaalle',
    startConversation: 'Aloita keskustelu',
    greetingInProgress: 'Tervehdys käynnissä...',
    listening: 'Kuuntelen...',
    sending: 'Lähetän...',
    waitingResponse: 'Odotan vastausta...',
    playingResponse: 'Toistan vastausta...',
    readyForClick: 'Kliki kun olet valmis!',
    startRecording: 'Alusta puhuminen...',
    stopRecording: 'Pysäytän nauhoituksen...',
    sendingToServer: 'Lähetän palvelimelle...',
    processingResponse: 'Käsittelen vastausta...',
    playingAudio: 'Toistan äänivastauksen...',
    readyForNext: 'Valmis seuraavaan kysymykseen!',
    startConversationPrompt: 'Aloitan keskustelun...',
    greetingPlayed: 'Tervehdys toistettu!',
    readyToListen: 'Valmis kuuntelemaan!',
    listeningClickWhenReady: 'Kuuntelen... Kliki uuesti kun olet valmis!',
    processingAudio: 'Ääniviestin sisältö käsitellään...',
    resetConversation: 'Aloita alusta',
    pressToStart: 'Paina mikrofonia aloittaaksesi keskustelun',
    footerText: '© AI Studio Art Bachmann',
    voiceError: 'Virhe äänikäskyssä',
    tryAgain: 'Yritä uudelleen',
    unknownError: 'Tuntematon virhe',
    recordingFailed: 'Äänitallennus epäonnistui - ei ääntä havaittu',
    noAudioDetected: 'Ei ääntä havaittu',
    
    // Tab navigation
    audioTab: 'Ääni',
    filesTab: 'Tiedostot',
    cameraTab: 'Kamera',
    
    // Camera component
    startCamera: 'Käynnistä kamera',
    takePhoto: 'Ota kuva',
    retakePhoto: 'Ota uusi kuva',
    sendPhoto: 'Lähetä kuva',
    capturedPhoto: 'Otettu kuva',
    cameraPlaceholder: 'Paina käynnistääksesi kameran',
    cameraError: 'Kameravirhe',
    cameraPermissionDenied: 'Kameran käyttöoikeus evätty',
    photoSent: 'Kuva lähetetty',
    photoSentSuccess: 'Kuva lähetetty onnistuneesti',
    videoNoDimensionsError: 'Videovirta käynnistyi, mutta kelvollisia mittoja ei löytynyt.',
    videoLoadError: 'Videovirran lataaminen epäonnistui.',
    invalidWebhookUrl: 'Virheellinen tai puuttuva lataus-URL. Tarkista asetukset.',
    uploadError: 'Latausvirhe',
    stopCamera: 'Pysäytä kamera',
    uploading: 'Lähetetään...',
    noSpeechDetected: 'Puhetta ei havaittu.',
    recognitionError: 'Tunnistusvirhe.',
    voiceNamingNotAvailable: 'Ääninimeäminen ei ole saatavilla.',
    noPhotoOrFilenameError: 'Kuva tai tiedostonimi puuttuu.',
    zoomErrorTitle: 'Zoom-virhe',
    zoomErrorDescription: 'Zoom-tasoa ei voitu asettaa.',
    switchingCameraText: 'Vaihdetaan kameraa...',
    switchToBackCamera: 'Takakamera',
    switchToFrontCamera: 'Etukamera',
    zoomInLabel: 'Suurenna',
    zoomOutLabel: 'Pienennä',
    
    // File upload component
    selectFile: 'Valitse tiedosto',
    sendFile: 'Lähetä tiedosto',
    cancel: 'Peruuta',
    dragDropFiles: 'Vedä ja pudota tiedostot tähän',
    orClickToUpload: 'tai klikkaa valitaksesi',
    selectedFile: 'Valittu tiedosto',
    fileSent: 'Tiedosto lähetetty',
    fileSentSuccess: 'Tiedosto lähetetty onnistuneesti'
  },
  et: {
    headerTitle: 'Nutikas abi ehitusplatsile!',
    headerSubtitle: 'Häälega juhitav tööriist ehitusplatsile',
    startConversation: 'Alusta vestlust',
    greetingInProgress: 'Tervitus käib...',
    listening: 'Kuulan...',
    sending: 'Saadan...',
    waitingResponse: 'Ootan vastust...',
    playingResponse: 'Mängin vastust...',
    readyForClick: 'Kliki kui oled valmis!',
    startRecording: 'Alusta rääkimist...',
    stopRecording: 'Peatan salvestamise...',
    sendingToServer: 'Saadan serverisse...',
    processingResponse: 'Töötlen vastust...',
    playingAudio: 'Mängin helivastust...',
    readyForNext: 'Valmis järgmiseks küsimuseks!',
    startConversationPrompt: 'Alustan vestlust...',
    greetingPlayed: 'Tervitus mängitud!',
    readyToListen: 'Valmis kuulama!',
    listeningClickWhenReady: 'Kuulan... Kliki uuesti kui oled valmis!',
    processingAudio: 'Helistsõnumi sisu töödeldakse...',
    resetConversation: 'Alusta otsast',
    pressToStart: 'Vajuta mikrofoni vestluse alustamiseks',
    footerText: '© AI Studio Art Bachmann',
    voiceError: 'Viga häälkäskluses',
    tryAgain: 'Proovi uuesti',
    unknownError: 'Tundmatu viga',
    recordingFailed: 'Helisalvestus ebaõnnestus - heli ei tuvastatud',
    noAudioDetected: 'Heli ei tuvastatud',
    
    // Tab navigation
    audioTab: 'Hääl',
    filesTab: 'Tiedostot',
    cameraTab: 'Kaamera',
    
    // Camera component
    startCamera: 'Käivita kaamera',
    takePhoto: 'Tee pilt',
    retakePhoto: 'Tee uus pilt',
    sendPhoto: 'Saada pilt',
    capturedPhoto: 'Tehtud pilt',
    cameraPlaceholder: 'Vajuta kaamera käivitamiseks',
    cameraError: 'Kaamera viga',
    cameraPermissionDenied: 'Kaamera kasutamise õigus keelatud',
    photoSent: 'Pilt saadetud',
    photoSentSuccess: 'Pilt edukalt saadetud',
    videoNoDimensionsError: 'Videovoog käivitus, kuid kehtivaid mõõtmeid ei leitud.',
    videoLoadError: 'Videovoo laadimine ebaõnnestus.',
    invalidWebhookUrl: 'Vigane või puuduv üleslaadimise URL. Palun kontrolli seadistust.',
    uploadError: 'Üleslaadimise viga',
    stopCamera: 'Peata kaamera',
    uploading: 'Üleslaadimine...',
    noSpeechDetected: 'Kõnet ei tuvastatud.',
    recognitionError: 'Tuvastusviga.',
    voiceNamingNotAvailable: 'Häälnimetamine pole saadaval.',
    noPhotoOrFilenameError: 'Foto või failinimi puudub.',
    zoomErrorTitle: 'Suumi viga',
    zoomErrorDescription: 'Suumi taset ei saanud määrata.',
    switchingCameraText: 'Kaamera vahetamine...',
    switchToBackCamera: 'Tagakaamera',
    switchToFrontCamera: 'Esikaamera',
    zoomInLabel: 'Suurenda',
    zoomOutLabel: 'Vähenda',
    
    // File upload component
    selectFile: 'Vali fail',
    sendFile: 'Saada fail',
    cancel: 'Tühista',
    dragDropFiles: 'Lohista ja kukuta failid siia',
    orClickToUpload: 'või klõpsa valimiseks',
    selectedFile: 'Valitud fail',
    fileSent: 'Fail saadetud',
    fileSentSuccess: 'Fail edukalt saadetud'
  },
  en: {
    // Header texts
    headerTitle: 'Smart help for construction sites!',
    headerSubtitle: 'Voice-controlled tool for construction sites',

    // Voice button states
    startConversation: 'Start conversation',
    greetingInProgress: 'Greeting in progress...',
    listening: 'Listening...',
    sending: 'Sending...',
    waitingResponse: 'Waiting for response...',
    playingResponse: 'Playing response...',
    readyForClick: 'Click when ready!',

    // Chat messages
    startRecording: 'Start speaking...',
    stopRecording: 'Stopping recording...',
    sendingToServer: 'Sending to server...',
    processingResponse: 'Processing response...',
    playingAudio: 'Playing audio response...',
    readyForNext: 'Ready for next question!',
    startConversationPrompt: 'Starting conversation...',
    greetingPlayed: 'Greeting played!',
    readyToListen: 'Ready to listen!',
    listeningClickWhenReady: 'Listening... Click again when ready!',
    processingAudio: 'Processing audio message content...',

    // Buttons and controls
    resetConversation: 'Start Over',

    // Empty state
    pressToStart: 'Press the microphone to start the conversation',

    // Footer
    footerText: '© AI Studio Art Bachmann',

    // Error messages
    voiceError: 'Error in voice command',
    tryAgain: 'Try again',
    unknownError: 'Unknown error',
    recordingFailed: 'Audio recording failed - no sound detected',
    noAudioDetected: 'No sound detected',

    // Tab navigation
    audioTab: 'Audio',
    filesTab: 'Files',
    cameraTab: 'Camera',

    // Camera component
    startCamera: 'Start Camera',
    takePhoto: 'Take Photo',
    retakePhoto: 'Retake Photo',
    sendPhoto: 'Send Photo',
    capturedPhoto: 'Captured Photo',
    cameraPlaceholder: 'Press to start camera',
    cameraError: 'Camera Error',
    cameraPermissionDenied: 'Camera permission denied',
    photoSent: 'Photo sent',
    photoSentSuccess: 'Photo sent successfully',
    videoNoDimensionsError: 'Video stream started but no valid dimensions found.',
    videoLoadError: 'Failed to load video stream.',
    invalidWebhookUrl: 'Invalid or missing upload URL. Please check configuration.',
    uploadError: 'Upload Error',
    stopCamera: 'Stop Camera',
    uploading: 'Uploading...',
    noSpeechDetected: 'No speech detected.',
    recognitionError: 'Recognition error.',
    voiceNamingNotAvailable: 'Voice naming not available.',
    noPhotoOrFilenameError: 'Photo or filename is missing.',
    zoomErrorTitle: 'Zoom Error',
    zoomErrorDescription: 'Could not set zoom level.',
    switchingCameraText: 'Switching camera...',
    switchToBackCamera: 'Back Camera',
    switchToFrontCamera: 'Front Camera',
    zoomInLabel: 'Zoom In',
    zoomOutLabel: 'Zoom Out',

    // File upload component
    selectFile: 'Select File',
    sendFile: 'Send File',
    cancel: 'Cancel',
    dragDropFiles: 'Drag and drop files here',
    orClickToUpload: 'or click to upload',
    selectedFile: 'Selected file',
    fileSent: 'File sent',
    fileSentSuccess: 'File sent successfully'
  }
};

export const getTranslations = (language: 'fi' | 'et' | 'en'): Translations => {
  return translations[language];
};
