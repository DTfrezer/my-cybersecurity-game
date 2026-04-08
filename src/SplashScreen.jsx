import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// FIX 1: Import the logo image properly.
// Ensure the path matches your folder structure. 
// If this file is in 'src/components', use '../assets/logo.png'.
import myLogo from "./assets/logo.png"; 

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  
  const tips = [
    "💡 Tip: Strong passwords are your best shield!",
    "💡 Tip: Firewalls block unexpected visitors.",
    "💡 Tip: Always check the sender's email address.",
    "💡 Tip: Update your software to patch holes!",
  ];
  const [currentTip, setCurrentTip] = useState(tips[0]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 3000);

    const loadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          setTimeout(onFinish, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(loadInterval);
      clearInterval(tipInterval);
    };
  }, [onFinish]);

  return (
    // FIX 2: Changed 'min-h-screen' to 'h-screen' to prevent scrolling.
    // Added 'overflow-hidden' to ensure nothing bleeds out.
    <div className="h-screen bg-[#0f172a] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 1. EPIC BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_70%)]" />
      
      {/* 2. PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-400/20 rounded-full"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 3. MAIN CONTENT */}
      {/* Reduced vertical padding and gaps */}
      <div className="relative z-10 flex flex-col items-center px-4 gap-2">
        
        {/* LOGO CONTAINER */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="relative mb-2" // Reduced margin
        >
          <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-40 rounded-full scale-75" />
          
          {/* FIX 3: Reduced Logo size (w-40 h-40) for mobile, (w-52 h-52) for desktop */}
          <img
            src={myLogo} // Use the imported variable here
            alt="Cyber Battle Arena"
            className="w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-2xl relative z-10"
          />
        </motion.div>

        {/* TITLE */}
        <div className="relative mb-2"> {/* Reduced margin */}
          <h1 
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 uppercase tracking-wide text-center"
            style={{ textShadow: "2px 2px 0px #000, 4px 4px 10px rgba(0,0,0,0.5)" }}
          >
            CYBER BATTLE
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-white text-center tracking-[0.3em] mt-1 drop-shadow-lg">
            ARENA
          </h2>
        </div>

        {/* TIP BOX */}
        <motion.div 
          className="bg-black/30 border border-yellow-600/50 rounded-lg px-4 py-2 mb-4 max-w-sm text-center backdrop-blur-sm"
          key={currentTip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-yellow-100 text-xs md:text-sm">{currentTip}</p>
        </motion.div>

        {/* PROGRESS BAR */}
        <div className="w-full max-w-xs relative">
          <div className="h-5 bg-gray-800 rounded-full border-2 border-gray-700 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.4)_50%,transparent_80%)]" />
            </motion.div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-xs drop-shadow-md" style={{ textShadow: "1px 1px 2px black" }}>
              {progress < 100 ? `LOADING... ${progress}%` : "LET'S GO!"}
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-4 text-gray-600 text-xs font-bold tracking-widest">
        © 2026 CYBER SECURITY GAMES
      </div>
    </div>
  );
}