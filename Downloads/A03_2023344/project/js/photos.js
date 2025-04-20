// Photos section with Kai Mode functionality

class PhotosSection {
  constructor() {
    this.section = document.getElementById('photos');
    this.jumbledText = this.section.querySelector('.jumbled-text');
    this.photoStrip = this.section.querySelector('.photo-strip');
    this.kaiModeOverlay = this.section.querySelector('.kai-mode-overlay');
    this.kaiStoryImage = this.section.querySelector('.kai-story-image');
    this.kaiCaption = this.section.querySelector('.kai-caption');
    
    this.kaiModeActive = false;
    this.kaiModeInterval = null;
    this.currentKaiImageIndex = 0;
    
    this.initialize();
  }
  
  initialize() {
    this.setupJumbledText();
    this.setupPhotoStrip();
    this.setupKaiMode();
  }
  
  setupJumbledText() {
    window.utils.createJumbledText(this.jumbledText);
  }
  
  setupPhotoStrip() {
    this.photoStrip.addEventListener('wheel', (e) => {
      if (!this.kaiModeActive) {
        e.preventDefault();
        this.photoStrip.scrollLeft += e.deltaY;
      }
    });
    
    const photoItems = this.photoStrip.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('pulse-light');
      });
      
      item.addEventListener('mouseleave', () => {
        item.classList.remove('pulse-light');
      });
    });
  }
  
  setupKaiMode() {
    document.addEventListener('keydown', (e) => {
      if (window.utils.isInViewport(this.section)) {
        if (e.code === 'Space' && !this.kaiModeActive) {
          e.preventDefault();
          this.activateKaiMode();
        } else if (this.kaiModeActive) {
          this.deactivateKaiMode();
        }
      }
    });
    
    this.kaiModeOverlay.addEventListener('click', () => {
      if (this.kaiModeActive) {
        this.deactivateKaiMode();
      }
    });
  }
  
  activateKaiMode() {
    this.kaiModeActive = true;
    this.kaiModeOverlay.classList.add('active');
    window.audioController.playKaiNarration();
    
    this.currentKaiImageIndex = 0;
    this.updateKaiImage();
    
    this.kaiModeInterval = setInterval(() => {
      this.currentKaiImageIndex = (this.currentKaiImageIndex + 1) % window.appConfig.kaiMode.images.length;
      this.updateKaiImage();
    }, window.appConfig.kaiMode.interval);
  }
  
  deactivateKaiMode() {
    this.kaiModeActive = false;
    this.kaiModeOverlay.classList.remove('active');
    window.audioController.stopKaiNarration();
    clearInterval(this.kaiModeInterval);
  }
  
  updateKaiImage() {
    const { images, captions } = window.appConfig.kaiMode;
    
    // Fade out current image
    this.kaiStoryImage.style.opacity = '0';
    this.kaiCaption.style.opacity = '0';
    
    setTimeout(() => {
      // Update content
      this.kaiStoryImage.style.backgroundImage = `url(${images[this.currentKaiImageIndex]})`;
      this.kaiCaption.textContent = captions[this.currentKaiImageIndex];
      
      // Fade in new content
      this.kaiStoryImage.style.opacity = '1';
      this.kaiCaption.style.opacity = '1';
    }, 500);
  }
}

// Initialize the photos section
window.photosSection = new PhotosSection();