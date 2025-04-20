import React from 'react';
import Landing from './Landing';
import InfiniteHall from './InfiniteHall';
import About from './About';
import Projects from './components/Projects';

function App() {
  return (
    <>
      <Landing />
      <Projects />
      <InfiniteHall />
      <About />
    </>
  );
}

export default App;
