// Penstand World section functionality

class PenstandSection {
  constructor() {
    this.section = document.getElementById('penstand');
    this.penstandObject = this.section.querySelector('.penstand-object');
    this.timeIndicator = this.section.querySelector('.time-indicator');
    this.currentTheme = '';
    this.rotationDegree = 0;
    
    // Initialize
    this.initialize();
  }
  
  initialize() {
    // Update theme based on time
    this.updateTimeBasedTheme();
    
    // Set up rotation on horizontal scroll
    this.setupRotation();
    
    // Update time indicator
    this.updateTimeIndicator();
    
    // Update theme every minute
    setInterval(() => {
      this.updateTimeBasedTheme();
      this.updateTimeIndicator();
    }, 60000); // Every minute
  }
  
  updateTimeBasedTheme() {
    const timeOfDay = window.utils.getTimeOfDay();
    const isDaytime = timeOfDay === 'morning' || timeOfDay === 'day';
    
    // Set the theme based on time
    if (isDaytime) {
      this.setLightTheme();
      this.currentTheme = 'light';
    } else {
      this.setDarkTheme();
      this.currentTheme = 'dark';
    }
  }
  
  setLightTheme() {
    this.section.style.backgroundColor = '#f5f5f7';
    this.penstandObject.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8787)';
  }
  
  setDarkTheme() {
    this.section.style.backgroundColor = '#121212';
    this.penstandObject.style.background = 'linear-gradient(45deg, #364fc7, #4c6ef5)';
  }
  
  updateTimeIndicator() {
    const timeString = window.utils.formatTime();
    const timeOfDay = window.utils.getTimeOfDay();
    
    this.timeIndicator.textContent = `${timeString} (${timeOfDay})`;
  }
  
  setupRotation() {
    // Horizontal scroll for rotation
    this.section.addEventListener('wheel', (e) => {
      if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        
        const delta = e.shiftKey ? e.deltaY : e.deltaX;
        this.rotationDegree += delta * 0.5;
        
        // Apply smooth rotation transform
        this.penstandObject.style.transform = `
          rotateY(${this.rotationDegree}deg)
          perspective(1000px)
        `;
      }
    });
    
    // Touch rotation for mobile
    let touchStartX = 0;
    
    this.section.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    this.section.addEventListener('touchmove', (e) => {
      e.preventDefault();
      
      const touchX = e.touches[0].clientX;
      const deltaX = touchX - touchStartX;
      
      this.rotationDegree += deltaX * 0.5;
      this.penstandObject.style.transform = `
        rotateY(${this.rotationDegree}deg)
        perspective(1000px)
      `;
      
      touchStartX = touchX;
    });
  }
}

// Initialize the penstand section
window.penstandSection = new PenstandSection();