import React from 'react';
import './Projects.css';

const Projects: React.FC = () => {
  return (
    <section className="projects-section">
      <div className="project-list">
        <div className="project-item">
          <div className="project-content">
            <h2>UX Research Study</h2>
            <div className="project-info">
              <p>User interviews, heatmaps, and A/B testing</p>
              <span>2022</span>
            </div>
          </div>
        </div>

        <div className="project-item">
          <div className="project-content">
            <h2>Neural Networks</h2>
            <div className="project-info">
              <p>Deep learning and pattern recognition</p>
              <span>2023</span>
            </div>
          </div>
        </div>

        <div className="project-item">
          <div className="project-content">
            <h2>Quantum Computing</h2>
            <div className="project-info">
              <p>Quantum algorithms and simulations</p>
              <span>2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
