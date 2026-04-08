// src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SplashScreen from "./SplashScreen";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import IntroPage from "./IntroPage";        // ✅ NEW
import MissionsPage from "./MissionsPage";
import Mission1 from "./Mission1";
import Mission2 from "./Mission2";

// ✅ STEP 1: Import your Level 3 App component
import Level3App from "./LEvel3Route"; // Adjust the path if needed

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/intro" element={<IntroPage />} />        {/* ✅ NEW */}
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/mission1" element={<Mission1 />} />
          <Route path="/mission2" element={<Mission2 />} />
          
          {/* ✅ STEP 2: Add the nested route for Level 3 */}
          {/* The "/*" is crucial! It matches /level3 and any path after it, like /level3/game */}
          <Route path="/level3/*" element={<Level3App />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;