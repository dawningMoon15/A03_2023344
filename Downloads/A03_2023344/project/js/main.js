// Main application script
document.addEventListener('DOMContentLoaded', () => {
  // Create folders for assets
  createAssetFolders();
  
  // Add placeholder audio files (these would normally be real audio files)
  createPlaceholderAudio();
  
  // Initialize all sections
  initializeSections();
  
  // Set up navigation
  setupNavigation();
  
  // Handle initial section visibility
  checkInitialSectionVisibility();
});

function createAssetFolders() {
  // This would normally create folders on the server
  // For this example, we're using console log instead
  console.log('Asset folders structure created:');
  console.log('- assets/');
  console.log('  - audio/');
  console.log('  - images/');
  console.log('  - avatar/');
}

function createPlaceholderAudio() {
  // In a real project, these would be actual audio files
  // For this example, we're just setting the src attributes
  
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    // Keep the original src as a data attribute
    const originalSrc = audio.getAttribute('src');
    audio.setAttribute('data-original-src', originalSrc);
    
    // No longer removing the src attribute to ensure audio elements have valid sources
    // audio.removeAttribute('src'); - This line caused the error
  });
  
  console.log('Audio placeholders created (would be real files in production)');
}

function initializeSections() {
  // Each section has its own initialization in its respective file
  // This function is just here for clarity that all sections are initialized
  console.log('All sections initialized');
}

function setupNavigation() {
  // Set up smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.navigation a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      window.utils.scrollToElement(targetId);
    });
  });
  
  // Highlight active section in navigation
  window.addEventListener('scroll', highlightActiveSection);
}

function highlightActiveSection() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.navigation a');
  
  // Find the current section
  let currentSectionId = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSectionId = section.getAttribute('id');
    }
  });
  
  // Update navigation highlight
  navLinks.forEach(link => {
    const href = link.getAttribute('href').substring(1);
    
    if (href === currentSectionId) {
      link.style.color = 'var(--accent)';
    } else {
      link.style.color = 'var(--text-light)';
    }
  });
}

function checkInitialSectionVisibility() {
  // Check which section is initially visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If landing section is visible, play intro
        if (entry.target.id === 'landing') {
          window.landingSection.onSectionVisible();
        }
      }
    });
  }, { threshold: 0.5 });
  
  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
}

// Create placeholder directory structure (for demo purposes)
function createDirectoryStructure() {
  const directoryStructure = `
Portfolio Project Structure:
|-- index.html
|-- styles/
|   |-- main.css
|   |-- sections.css
|   |-- animations.css
|   |-- responsive.css
|-- js/
|   |-- config.js
|   |-- utils.js
|   |-- audio.js
|   |-- landing.js
|   |-- projects.js
|   |-- reality.js
|   |-- corridor.js
|   |-- penstand.js
|   |-- photos.js
|   |-- about.js
|   |-- main.js
|-- assets/
    |-- audio/
    |   |-- background.mp3
    |   |-- intro.mp3
    |   |-- hover.mp3
    |   |-- kai-narration.mp3
    |   |-- hello.mp3
    |-- images/
    |-- avatar/
  `;
  
  console.log(directoryStructure);
}

// Log the directory structure
createDirectoryStructure();