// Infinite Corridor section functionality

class CorridorSection {
  constructor() {
    this.section = document.getElementById('infinite-corridor');
    this.corridorContainer = this.section.querySelector('.corridor-container');
    this.frames = this.section.querySelectorAll('.corridor-frame');
    
    // Initialize
    this.initialize();
  }
  
  initialize() {
    // Set up frame hover effect
    this.setupFrameHoverEffect();
    
    // Set up horizontal scroll animation
    this.setupHorizontalScroll();
    
    // Duplicate frames for infinite effect
    this.duplicateFrames();
  }
  
  setupFrameHoverEffect() {
    this.frames.forEach(frame => {
      // Play sound on hover
      frame.addEventListener('mouseenter', () => {
        window.audioController.playHoverSound();
        
        // Add pulse effect
        frame.classList.add('pulse-light');
      });
      
      frame.addEventListener('mouseleave', () => {
        // Remove pulse effect
        frame.classList.remove('pulse-light');
      });
    });
  }
  
  setupHorizontalScroll() {
    // Smooth scroll behavior for horizontal scrolling
    this.corridorContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      const delta = e.deltaY || e.detail || e.wheelDelta;
      this.corridorContainer.scrollLeft += delta;
    });
    
    // Touch scrolling for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.corridorContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    this.corridorContainer.addEventListener('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
      const deltaX = touchStartX - touchEndX;
      this.corridorContainer.scrollLeft += deltaX / 3;
      touchStartX = touchEndX;
    });
  }
  
  duplicateFrames() {
    // Clone frames to create infinite corridor effect
    const framesToAdd = 5; // Number of duplicated frame sets
    
    for (let i = 0; i < framesToAdd; i++) {
      this.frames.forEach(frame => {
        const clone = frame.cloneNode(true);
        
        // Add event listeners to clones
        clone.addEventListener('mouseenter', () => {
          window.audioController.playHoverSound();
          clone.classList.add('pulse-light');
        });
        
        clone.addEventListener('mouseleave', () => {
          clone.classList.remove('pulse-light');
        });
        
        this.corridorContainer.appendChild(clone);
      });
    }
    
    // Auto-scroll animation
    this.startAutoScroll();
  }
  
  startAutoScroll() {
    const scrollSpeed = 0.5; // pixels per frame
    let scrollDirection = 1; // 1 for right, -1 for left
    let lastScrollPos = this.corridorContainer.scrollLeft;
    let userScrollDetected = false;
    
    // Check if user has scrolled
    this.corridorContainer.addEventListener('scroll', () => {
      if (Math.abs(this.corridorContainer.scrollLeft - lastScrollPos) > 10) {
        userScrollDetected = true;
        setTimeout(() => {
          userScrollDetected = false;
          lastScrollPos = this.corridorContainer.scrollLeft;
        }, 1000);
      }
    });
    
    // Auto-scroll animation
    const autoScroll = () => {
      if (!userScrollDetected) {
        this.corridorContainer.scrollLeft += scrollSpeed * scrollDirection;
        
        // Check if we need to reverse direction
        const maxScroll = this.corridorContainer.scrollWidth - this.corridorContainer.clientWidth;
        
        if (this.corridorContainer.scrollLeft >= maxScroll - 10) {
          scrollDirection = -1;
        } else if (this.corridorContainer.scrollLeft <= 10) {
          scrollDirection = 1;
        }
      }
      
      requestAnimationFrame(autoScroll);
    };
    
    requestAnimationFrame(autoScroll);
  }
}

// Initialize the corridor section
window.corridorSection = new CorridorSection();