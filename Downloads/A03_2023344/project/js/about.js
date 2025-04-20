// About section functionality

class AboutSection {
  constructor() {
    this.section = document.getElementById('about');
    this.avatarImage = this.section.querySelector('.avatar-image');
    this.helloAudio = document.getElementById('hello-audio');
    
    // Initialize
    this.initialize();
  }
  
  initialize() {
    // Set up avatar interactions only
    this.setupAvatarInteractions();
  }
  
  setupAvatarInteractions() {
    // Avatar hover effect
    this.avatarImage.addEventListener('mouseenter', () => {
      this.avatarImage.classList.add('waving');
    });
    
    this.avatarImage.addEventListener('mouseleave', () => {
      this.avatarImage.classList.remove('waving');
    });
    
    // Avatar click effect - play hello sound
    this.avatarImage.addEventListener('click', () => {
      // Play hello sound
      window.audioController.playHelloSound();
      
      // Add wave animation
      this.avatarImage.classList.remove('waving');
      void this.avatarImage.offsetWidth; // Trigger reflow
      this.avatarImage.classList.add('waving');
    });
  }
}

// Initialize the about section
window.aboutSection = new AboutSection();