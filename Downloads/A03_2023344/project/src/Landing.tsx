import React, { useRef } from 'react';
import './Landing.css';

const Landing: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30; // max 15deg rotation
    const y = (e.clientY / innerHeight - 0.5) * 30;
    if (bgRef.current) {
      bgRef.current.style.transform = `translate(-50%, -50%) scale(1.06) rotateX(${-y}deg) rotateY(${x}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (bgRef.current) {
      bgRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  };

  return (
    <section className="landing-section" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="landing-bg" ref={bgRef} />
      <div className="landing-overlay">
        <nav className="landing-nav">
          <span>PROJECT</span>
          <span>THE KEEP</span>
          <span>FACTIONS</span>
          <span>THE WORLD</span>
          <button className="landing-signin">SIGN IN</button>
        </nav>
        <div className="landing-content">
          <div className="landing-desc">
            <span className="landing-kpr">KPR</span> is a brand that focuses on collective narrative and empowering storytellers. Keepers is a living story, an uncharted world waiting to be explored, to be imagined.
          </div>
          <h1 className="landing-title">
            KEEP.<br />PROTECT.<br />REIMAGINE.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Landing;
