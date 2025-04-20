// Landing section functionality

class LandingSection {
  constructor() {
    this.section = document.getElementById('landing');
    this.parallaxContainer = this.section.querySelector('.parallax-container');
    this.parallaxLayers = this.section.querySelectorAll('.parallax-layer');
    this.content = this.section.querySelector('.content');
    
    // Initialize the landing section
    this.initialize();
  }
  
  initialize() {
    // Set up the parallax effect
    this.setupParallaxEffect();
    
    // Intersection observer to trigger animations when section is visible
    this.setupIntersectionObserver();
  }
  
  setupParallaxEffect() {
    // Parallax effect on mouse move
    const throttledParallax = window.utils.throttle((e) => {
      window.utils.applyParallax(e, this.parallaxLayers);
    }, 30);
    
    // Apply parallax on mousemove
    this.section.addEventListener('mousemove', throttledParallax);
    
    // Also apply some parallax on device orientation change if on mobile
    if (window.utils.isMobile()) {
      window.addEventListener('deviceorientation', (e) => {
        const tiltX = e.beta;  // -90 to 90
        const tiltY = e.gamma; // -90 to 90
        
        // Convert tilt to mouse position equivalent
        const mouseX = (tiltY / 90) * window.innerWidth;
        const mouseY = (tiltX / 90) * window.innerHeight;
        
        window.utils.applyParallax({ clientX: mouseX, clientY: mouseY }, this.parallaxLayers, 0.03);
      });
    }
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When section becomes visible
          this.onSectionVisible();
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(this.section);
  }
  
  onSectionVisible() {
    // Start playing background music when section is visible
    window.audioController.startBackgroundMusic();
    
    // Ensure content has fade-in class
    if (!this.content.classList.contains('fade-in')) {
      this.content.classList.add('fade-in');
    }
  }
}

// Initialize the landing section
window.landingSection = new LandingSection();