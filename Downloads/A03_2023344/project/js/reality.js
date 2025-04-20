// Hall of Reality section functionality

class RealitySection {
  constructor() {
    this.section = document.getElementById('hall-of-reality');
    this.collage = this.section.querySelector('.reality-collage');
    this.collageItems = this.section.querySelectorAll('.collage-item');
    this.floatingModel = this.section.querySelector('.floating-model');
    this.collageVideos = [
      this.section.querySelector('#video-radiation'),
      this.section.querySelector('#video-schematics'),
      this.section.querySelector('#video-xray'),
      this.section.querySelector('#video-kai')
    ];
    
    // Track press state
    this.isPressed = false;
    this.touchTimer = null;
    this.touchDuration = 500; // ms before showing 3D model
    this.collageImageOrder = Array.from(this.collage.querySelectorAll('.collage-item'));
    
    // Initialize
    this.initialize();
  }

  initialize() {
    // Set up 3D effect for collage
    this.setup3DEffect();
    // Set up long press handling for 3D model
    this.setupLongPressHandling();
    // Set up collage image cycling
    this.setupCollageCycling();
  }

  setupCollageCycling() {
    // Click on the topmost image brings the last image to the front
    this.collageImageOrder.forEach(img => {
      img.addEventListener('click', () => {
        if (img === this.collageImageOrder[0]) {
          // Remove last image and insert at front
          const last = this.collageImageOrder.pop();
          this.collageImageOrder.unshift(last);
          this.updateCollageZIndexes();
          // Animate the new top image
          last.classList.add('pop-to-front');
          setTimeout(() => last.classList.remove('pop-to-front'), 400);
        }
      });
    });
    // Initial z-index setup
    this.updateCollageZIndexes();
  }

  updateCollageZIndexes() {
    // Highest z-index for the first image, descending for others
    this.collageImageOrder.forEach((img, i) => {
      img.style.zIndex = 10 - i;
    });
  }

  setup3DEffect() {
    // Perspective effect on mouse move
    this.section.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = this.collage.getBoundingClientRect();
      
      // Calculate mouse position relative to collage center (from -1 to 1)
      const x = ((clientX - left) / width - 0.5) * 2;
      const y = ((clientY - top) / height - 0.5) * 2;
      
      // Apply 3D rotation to collage
      this.collage.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      
      // Move each collage item with parallax effect
      this.collageItems.forEach(item => {
        const depth = parseInt(item.style.getPropertyValue('--depth'), 10);
        const baseX = parseInt(item.style.getPropertyValue('--base-x') || 0, 10);
        const baseY = parseInt(item.style.getPropertyValue('--base-y') || 0, 10);
        const moveX = x * (depth * 10);
        const moveY = y * (depth * 10);
        
        item.style.transform = `translateX(${baseX + moveX}px) translateY(${baseY + moveY}px) translateZ(${-depth * 50}px)`;
      });
    });
    
    // Reset on mouse leave
    this.section.addEventListener('mouseleave', () => {
      this.collage.style.transform = 'rotateY(0deg) rotateX(0deg)';
      
      this.collageItems.forEach(item => {
        const depth = parseInt(item.style.getPropertyValue('--depth'), 10);
        const baseX = parseInt(item.style.getPropertyValue('--base-x') || 0, 10);
        const baseY = parseInt(item.style.getPropertyValue('--base-y') || 0, 10);
        item.style.transform = `translateX(${baseX}px) translateY(${baseY}px) translateZ(${-depth * 50}px)`;
      });
    });
  }

  setupLongPressHandling() {
    // Mouse events
    this.section.addEventListener('mousedown', () => {
      this.startPress();
    });
    
    this.section.addEventListener('mouseup', () => {
      this.endPress();
    });
    
    this.section.addEventListener('mouseleave', () => {
      this.endPress();
    });
    
    // Touch events for mobile
    this.section.addEventListener('touchstart', (e) => {
      this.startPress();
      e.preventDefault(); // Prevent scrolling while touching
    });
    
    this.section.addEventListener('touchend', () => {
      this.endPress();
    });
    
    this.section.addEventListener('touchcancel', () => {
      this.endPress();
    });
  }

  startPress() {
    this.isPressed = true;
    
    // Start timer for long press
    this.touchTimer = setTimeout(() => {
      if (this.isPressed) {
        this.showFloatingModel();
      }
    }, this.touchDuration);
  }

  endPress() {
    this.isPressed = false;
    clearTimeout(this.touchTimer);
    this.hideFloatingModel();
  }

  showFloatingModel() {
    this.floatingModel.style.display = 'block';
    // Show and play all collage videos
    this.collageVideos.forEach(video => {
      video.style.display = 'block';
      video.currentTime = 0;
      video.play();
    });
  }


  
  hideFloatingModel() {
    this.floatingModel.style.display = 'none';
    // Hide and pause all collage videos
    this.collageVideos.forEach(video => {
      video.pause();
      video.style.display = 'none';
    });
  }

  setupCollageCycling() {
    // Click on the topmost image brings the last image to the front
    this.collageImageOrder.forEach(img => {
      img.addEventListener('click', () => {
        if (img === this.collageImageOrder[0]) {
          // Remove last image and insert at front
          const last = this.collageImageOrder.pop();
          this.collageImageOrder.unshift(last);
          this.updateCollageZIndexes();
          // Animate the new top image
          last.classList.add('pop-to-front');
          setTimeout(() => last.classList.remove('pop-to-front'), 400);
        }
      });
    });
    // Initial z-index setup
    this.updateCollageZIndexes();
  }


  updateCollageZIndexes() {
    // Highest z-index for the first image, descending for others
    this.collageImageOrder.forEach((img, i) => {
      img.style.zIndex = 10 - i;
    });
  }

}

// Initialize the reality section
window.realitySection = new RealitySection();