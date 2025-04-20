// Configuration and Global Variables
const config = {
  // Audio settings
  audio: {
    backgroundVolume: 0.3,
    effectsVolume: 0.5,
    narrationVolume: 0.8
  },
  
  // Animation settings
  animation: {
    defaultDuration: 1000,
    fadeInDuration: 1500,
    rotateDuration: 10000
  },
  
  // Project data
  projects: [
    {
      id: 1,
      title: "Interactive Experience",
      description: "An immersive interactive web experience that combines 3D graphics, audio, and user interaction to create a memorable digital journey.",
      tech: "WebGL, Three.js, GSAP, Web Audio API",
      year: "2024"
    },
    {
      id: 2,
      title: "Mobile App Design",
      description: "A comprehensive mobile application design for a wellness platform, featuring intuitive user flows and a calming aesthetic.",
      tech: "Figma, React Native, Firebase",
      year: "2023"
    },
    {
      id: 3,
      title: "Brand Identity",
      description: "Complete brand identity design for a sustainable fashion company, including logo design, color palette, typography, and brand guidelines.",
      tech: "Adobe Creative Suite, Procreate",
      year: "2023"
    },
    {
      id: 4,
      title: "UX Research Study",
      description: "Comprehensive user experience research study for an e-commerce platform, identifying pain points and opportunities for improvement.",
      tech: "User Interviews, Heatmaps, A/B Testing",
      year: "2022"
    },
    {
      id: 5,
      title: "3D Visualization",
      description: "Architectural visualization project featuring photorealistic renders and interactive 3D models for a modern residential complex.",
      tech: "Blender, Cinema 4D, Unity",
      year: "2022"
    }
  ],
  
  // Kai mode images and captions
  kaiMode: {
    images: [
      "https://images.pexels.com/photos/2563011/pexels-photo-2563011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5769387/pexels-photo-5769387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5769384/pexels-photo-5769384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5769365/pexels-photo-5769365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6126967/pexels-photo-6126967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    captions: [
      "The journey begins in a quiet moment of reflection.",
      "Time passes differently when you're exploring the unknown.",
      "Each step forward reveals new perspectives.",
      "The path winds through unexpected terrain.",
      "And finally, we arrive at a new beginning."
    ],
    interval: 3000 // milliseconds between image changes
  },
  
  // Avatar states based on time of day
  avatarStates: {
    morning: "https://images.pexels.com/photos/1251833/pexels-photo-1251833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    day: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    night: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
};

// Export the config object
window.appConfig = config;