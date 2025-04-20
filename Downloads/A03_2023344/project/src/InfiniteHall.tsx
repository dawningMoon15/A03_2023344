import React from 'react';
import './InfiniteHall.css';
import WeatherTime from './components/WeatherTime';

import inf1 from '../Assets/inf-1.jpg';
import inf2 from '../Assets/inf-2.jpg';
import inf3 from '../Assets/inf-3.jpg';
import inf4 from '../Assets/inf-4.jpg';
import inf5 from '../Assets/inf-5.jpg';
import inf6 from '../Assets/inf-6.jpg';
import inf7 from '../Assets/inf-7.jpg';
import inf8 from '../Assets/inf-8.jpg';
import inf9 from '../Assets/inf-9.jpg';
import inf10 from '../Assets/inf-10.jpg';

const images = [
  inf1, inf2, inf3, inf4, inf5, inf6, inf7, inf8, inf9, inf10
];

const InfiniteHall: React.FC = () => (
  <div className="banner">
    <WeatherTime />
    <div className="slider" style={{ ['--quantity' as any]: images.length }}>
      {images.map((img, idx) => (
        <div className="item" key={idx} style={{ ['--position' as any]: idx + 1 }}>
          <img src={img} alt={`Infinite Hall ${idx + 1}`} />
        </div>
      ))}
    </div>
    <div className="content">
      <h1 data-content="INFINITE HALL">INFINITE HALL</h1>
      <div className="author">
        <h2>KPR PROJECTS</h2>
        <p><b>Infinite Hall Project</b></p>
        <p>
          Experience a CSS-only 3D infinite gallery interaction inspired by modern web design.
        </p>
      </div>
      <div className="model"></div>
    </div>
  </div>
);

export default InfiniteHall;
