import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import IntroPage from './level3/IntroPage';
import GamePage from './level3/GamePage';
import HowToPlayPage from './level3/HowToPlayPage';
import Settings from './level3/Settings';
import SummaryPage from './level3/SummaryPage';

const Level3App = () => {
  // ✅ STEP 1: Define the settings state here
  const [settings, setSettings] = useState({
    gridSize: 8,
    difficulty: 'medium',
    malwareSpread: true,
    reducedMotion: false,
    scanAccuracy: {
      quickScan: 0.8,
      deepScan: 0.95
    },
    toolUses: {
      quickScan: 10,
      deepScan: 5,
      quarantine: 3,
      restoreBackup: 2,
    },
  });

  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      
      {/* ✅ STEP 2: Pass the settings prop to GamePage */}
      <Route path="/game" element={<GamePage settings={settings} />} />
      
      {/* ✅ STEP 3: Pass settings and setSettings to Settings page */}
      <Route path="/settings" element={<Settings settings={settings} updateSettings={setSettings} />} />
      
      <Route path="/how-to-play" element={<HowToPlayPage />} />
      <Route path="/summary" element={<SummaryPage />} />
    </Routes>
  );
};

export default Level3App;


// // src/level3/Level3App.js

// import { Routes, Route } from 'react-router-dom';
// import IntroPage from './IntroPage';
// import GamePage from './GamePage'; // Make sure this is imported
// import HowToPlayPage from './HowToPlayPage';
// import Settings from './Settings';
// import SummaryPage from './SummaryPage';
// import { useState } from 'react'; // Import useState

// const Level3App = () => {
//   // ✅ STEP 1: Define the settings state here
//   const [settings, setSettings] = useState({
//     gridSize: 8,
//     difficulty: 'medium',
//     toolUses: {
//       quickScan: 10,
//       deepScan: 5,
//       quarantine: 3,
//       restoreBackup: 2,
//     },
//     // Add any other settings you have
//   });

//   return (
//     <Routes>
//       <Route path="/" element={<IntroPage />} />
      
//       {/* ✅ STEP 2: Pass the settings prop to GamePage */}
//       <Route path="/game" element={<GamePage settings={settings} />} />
      
//       {/* You will also want to pass setSettings to your Settings page */}
//       <Route path="/settings" element={<Settings settings={settings} setSettings={setSettings} />} />
      
//       <Route path="/how-to-play" element={<HowToPlayPage />} />
//       <Route path="/summary" element={<SummaryPage />} />
//     </Routes>
//   );
// };

// export default Level3App;