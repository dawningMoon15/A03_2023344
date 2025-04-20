// Utility functions for the portfolio

// Smooth scroll to element
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Check time of day and return appropriate state
function getTimeOfDay() {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 19) {
    return 'day';
  } else {
    return 'night';
  }
}

// Format time for display
function formatTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Apply parallax effect based on mouse position
function applyParallax(e, elements, intensity = 0.05) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;
  
  elements.forEach((element, index) => {
    const depth = index + 1;
    const moveX = (mouseX * intensity) / depth;
    const moveY = (mouseY * intensity) / depth;
    
    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// Preload audio files
function preloadAudio(sources) {
  sources.forEach(src => {
    const audio = new Audio();
    audio.src = src;
  });
}

// Throttle function to limit the rate of function calls
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Create jumbled text effect
function createJumbledText(element) {
  const text = element.textContent;
  element.textContent = '';
  
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.style.animationDelay = `${i * 0.1}s`;
    element.appendChild(span);
  }
}

// Random number between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Detect mobile devices
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Export utility functions
window.utils = {
  scrollToElement,
  getTimeOfDay,
  formatTime,
  applyParallax,
  preloadAudio,
  throttle,
  isInViewport,
  createJumbledText,
  random,
  isMobile
};