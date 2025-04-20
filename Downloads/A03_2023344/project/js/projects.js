// Projects section functionality

class ProjectsSection {
  constructor() {
    this.section = document.getElementById('projects');
    this.projectsCircle = this.section.querySelector('.projects-circle');
    this.projectCards = this.section.querySelectorAll('.project-card');
    this.modal = document.querySelector('.project-modal');
    this.modalTitle = this.modal.querySelector('.modal-title');
    this.modalDescription = this.modal.querySelector('.modal-description');
    this.modalTech = this.modal.querySelector('.modal-tech');
    this.modalYear = this.modal.querySelector('.modal-year');
    this.closeModalBtn = this.modal.querySelector('.close-modal');
    
    // Initialize
    this.initialize();
  }
  
  initialize() {
    // Set up card rotation
    this.setupCardRotation();
    
    // Set up card click events
    this.setupCardClickEvents();
    
    // Set up modal close button
    this.setupModalClose();
    
    // Set initial rotation positions
    this.rotateCards();
  }
  
  setupCardRotation() {
    // Rotate the circle of cards
    let rotationAngle = 0;
    let rotating = false;
    
    // Auto rotation
    setInterval(() => {
      if (!rotating) {
        rotationAngle += 1;
        this.rotateCards(rotationAngle);
      }
    }, 100);
    
    // Manually rotate with mouse wheel
    this.projectsCircle.addEventListener('wheel', (e) => {
      e.preventDefault();
      rotating = true;
      
      // Adjust rotation speed based on wheel delta
      const delta = e.deltaY || e.detail || e.wheelDelta;
      rotationAngle += delta > 0 ? 5 : -5;
      
      this.rotateCards(rotationAngle);
      
      // Stop auto rotation for a moment
      clearTimeout(this.rotationTimeout);
      this.rotationTimeout = setTimeout(() => {
        rotating = false;
      }, 1000);
    });
  }
  
  rotateCards(angle = 0) {
    this.projectCards.forEach((card, index) => {
      const baseAngle = (index * 72); // 360 / 5 cards = 72 degrees per card
      const currentAngle = baseAngle + angle;
      const radians = currentAngle * (Math.PI / 180);
      
      // Calculate position on the circle
      const radius = 150;
      const x = Math.sin(radians) * radius;
      const y = -Math.cos(radians) * radius;
      
      // Position the card
      card.style.transform = `translate(${x}px, ${y}px) rotate(${currentAngle}deg)`;
      
      // Reset the inner card's rotation to keep text upright
      const cardInner = card.querySelector('.card-inner');
      cardInner.style.transform = `rotate(${-currentAngle}deg)`;
    });
  }
  
  setupCardClickEvents() {
    this.projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = parseInt(card.getAttribute('data-id'));
        this.openProjectModal(projectId);
      });
    });
  }
  
  setupModalClose() {
    // Close with the X button
    this.closeModalBtn.addEventListener('click', () => {
      this.closeProjectModal();
    });
    
    // Close with escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeProjectModal();
      }
    });
    
    // Close when clicking outside the modal content
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeProjectModal();
      }
    });
  }
  
  openProjectModal(projectId) {
    // Find the project data
    const project = window.appConfig.projects.find(p => p.id === projectId);
    
    if (project) {
      // Populate modal with project data
      this.modalTitle.textContent = project.title;
      this.modalDescription.textContent = project.description;
      this.modalTech.textContent = project.tech;
      this.modalYear.textContent = project.year;
      
      // Show the modal
      this.modal.style.display = 'block';
      setTimeout(() => {
        this.modal.classList.add('show');
      }, 10);
    }
  }
  
  closeProjectModal() {
    this.modal.classList.remove('show');
    setTimeout(() => {
      this.modal.style.display = 'none';
    }, 300);
  }
}

// Initialize the projects section
window.projectsSection = new ProjectsSection();