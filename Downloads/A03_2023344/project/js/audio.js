// Audio controller for the portfolio site

class AudioController {
  constructor() {
    // Audio elements
    this.backgroundMusic = document.getElementById('background-music');
    this.introNarration = document.getElementById('intro-narration');
    this.hoverSound = document.getElementById('hover-sound');
    this.kaiNarration = document.getElementById('kai-narration');
    this.helloAudio = document.getElementById('hello-audio');
    
    // Controls
    this.musicToggleBtn = document.getElementById('toggle-music');
    this.musicOnIcon = document.querySelector('.music-on');
    this.musicOffIcon = document.querySelector('.music-off');
    
    // State
    this.musicPlaying = false;
    this.narrationPlayed = false;
    
    // Initialize
    this.setupEventListeners();
    this.setVolumes();
    
    // Create audio context for hover sounds (to avoid delay)
    this.setupAudioContext();
  }
  
  setupEventListeners() {
    // Music toggle button
    this.musicToggleBtn.addEventListener('click', () => this.toggleBackgroundMusic());
    
    // Page visibility change
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    
    // Corridor hover sounds
    const corridorFrames = document.querySelectorAll('.corridor-frame');
    corridorFrames.forEach(frame => {
      frame.addEventListener('mouseenter', () => this.playHoverSound());
    });
    
    // Avatar click sound
    const avatar = document.querySelector('.avatar-image');
    if (avatar) {
      avatar.addEventListener('click', () => this.playHelloSound());
    }
  }
  
  setVolumes() {
    const { backgroundVolume, effectsVolume, narrationVolume } = window.appConfig.audio;
    
    this.backgroundMusic.volume = backgroundVolume;
    this.introNarration.volume = narrationVolume;
    this.hoverSound.volume = effectsVolume;
    this.kaiNarration.volume = narrationVolume;
    this.helloAudio.volume = effectsVolume;
  }
  
  setupAudioContext() {
    // Create audio context for low-latency sounds
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.hoverSoundBuffer = null;
    
    // Only try to load hover sound if it exists
    this.hasHoverSound = false;
    
    // Check if hover sound exists first
    fetch('assets/audio/hover.mp3', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          this.hasHoverSound = true;
          return fetch('assets/audio/hover.mp3');
        }
        throw new Error('Hover sound file not found');
      })
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        this.hoverSoundBuffer = audioBuffer;
      })
      .catch(() => {
        // Silently fail - hover sound is optional
        this.hasHoverSound = false;
      });
  }
  
  playIntroNarration() {
    if (!this.narrationPlayed) {
      this.introNarration.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
      this.narrationPlayed = true;
    }
  }
  
  startBackgroundMusic() {
    this.backgroundMusic.play().then(() => {
      this.musicPlaying = true;
      this.updateMusicToggleButton();
      // After music starts, play the intro narration
      this.playIntroNarration();
    }).catch(error => {
      console.log('Auto-play prevented:', error);
      this.musicPlaying = false;
      this.updateMusicToggleButton();
    });
  }
  
  toggleBackgroundMusic() {
    if (this.musicPlaying) {
      this.backgroundMusic.pause();
      this.musicPlaying = false;
    } else {
      this.backgroundMusic.play().catch(console.error);
      this.musicPlaying = true;
      
      // If narration hasn't played yet, play it now
      if (!this.narrationPlayed) {
        this.playIntroNarration();
      }
    }
    
    this.updateMusicToggleButton();
  }
  
  updateMusicToggleButton() {
    if (this.musicPlaying) {
      this.musicOnIcon.style.display = 'block';
      this.musicOffIcon.style.display = 'none';
    } else {
      this.musicOnIcon.style.display = 'none';
      this.musicOffIcon.style.display = 'block';
    }
  }
  
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden, pause audio
      if (this.musicPlaying) {
        this.backgroundMusic.pause();
      }
    } else {
      // Page is visible again, resume audio if it was playing
      if (this.musicPlaying) {
        this.backgroundMusic.play().catch(console.error);
      }
    }
  }
  
  playHoverSound() {
    // Using audio element (fallback)
    this.hoverSound.currentTime = 0;
    this.hoverSound.play().catch(console.error);
    
    // Using Audio Context for lower latency (if available)
    if (this.hasHoverSound && this.hoverSoundBuffer && this.audioContext.state === 'running') {
      const source = this.audioContext.createBufferSource();
      source.buffer = this.hoverSoundBuffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    }
  }
  
  playHelloSound() {
    this.helloAudio.currentTime = 0;
    this.helloAudio.play().catch(console.error);
  }
  
  playKaiNarration() {
    this.kaiNarration.currentTime = 0;
    this.kaiNarration.play().catch(console.error);
  }
  
  stopKaiNarration() {
    this.kaiNarration.pause();
    this.kaiNarration.currentTime = 0;
  }
}

// Export the audio controller
window.audioController = new AudioController();