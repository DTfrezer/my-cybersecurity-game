 import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MissionsPage() {
  const navigate = useNavigate();

  const missions = [
    {
      id: 1,
      title: "Credential Vault",
      sub: "Password Security",
      description: "Forge a key strong enough to protect the kingdom's gold.",
      icon: "🔑",
      color: "from-yellow-600 to-orange-700",
      border: "border-yellow-500",
      route: "/mission1",
      status: "OPEN",
      difficulty: 1,
      reward: "100 XP",
    },
    {
      id: 2,
      title: "Phish Hunters",
      sub: "Threat Detection",
      description: "Sail through dangerous seas and spot the hidden traps.",
      icon: "🎣",
      color: "from-green-600 to-teal-700",
      border: "border-green-500",
      route: "/mission2",
      status: "READY",
      difficulty: 2,
      reward: "250 XP",
    },
    {
      id: 3,
      title: "Network Fortress",
      sub: "Firewall Defense",
      description: "Upgrade the castle walls to repel the incoming data siege.",
      icon: "🛡️",
      color: "from-blue-600 to-indigo-700",
      border: "border-blue-500",
      route: "/level3",
      status: "READY",
      difficulty: 3,
      reward: "500 XP",
    },
    
  ];

  const [dialogue, setDialogue] = useState(
    "Hero! The realm is under attack. Choose your battle!"
  );

  return (
    <div className="min-h-screen bg-[#1a2c38] text-white font-sans overflow-hidden relative">
      
      {/* --- ATMOSPHERIC BACKGROUND --- */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(20,50,60,0.8)_0%,_transparent_70%)]" />

      {/* --- HEADER (Cleaned Up) --- */}
      <header className="relative z-20 p-6 flex flex-col items-center gap-4">
        <h1 
          className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase tracking-widest"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          Campaign Map
        </h1>

        {/* SENSIBLE UI: Mission Progress Bar */}
        <div className="w-full max-w-md bg-black/30 border border-gray-700 rounded-full p-1 flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full w-[0%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500" />
          </div>
          <span className="text-xs text-gray-400 font-bold whitespace-nowrap pr-2">0 / 3 COMPLETED</span>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 flex flex-col md:flex-row gap-8 p-6 pt-0 h-[calc(100vh-120px)]">
        
        {/* LEFT: Hero & Guide */}
        <div className="md:w-1/3 flex flex-col items-center justify-center relative pl-4">
          
          {/* MASCOT CONTAINER */}
          <div className="relative w-52 h-52 md:w-72 md:h-72 flex items-center justify-center mb-6">
            
            {/* 1. Hexagon Background Frame (Clash Style) */}
            <div 
              className="absolute w-full h-full bg-gradient-to-b from-blue-900/60 to-black border-4 border-blue-700 shadow-[0_0_40px_rgba(0,0,0,0.9)]"
              style={{ 
                // This creates the specific Hexagon shape
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
             }}
            />
            
            {/* 2. Decorative Ring (Optional flair) */}
            <div 
               className="absolute w-[105%] h-[105%] border-2 border-blue-500/20"
               style={{ 
                 clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
               }}
            />

            {/* 3. Animated Mascot Wrapper */}
            <motion.div
              className="relative z-10 w-[85%] h-[85%] flex items-center justify-center"
              animate={{ 
                y: [0, -10, 0], 
                scale: [1, 1.02, 1] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <img 
                src="/assets/Mascot.png" 
                alt="Guide Character"
                // Removed padding, letting the image fill the hexagon naturally
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" 
              />
            </motion.div>

            {/* Level Circle */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black font-black text-sm px-4 py-1 rounded-full border-2 border-yellow-300 z-20 shadow-lg uppercase tracking-wider">
              Guide
            </div>
          </div>

          {/* RPG Speech Bubble */}
          <motion.div
            className="w-full max-w-sm bg-[#2b4354] border-2 border-[#5d8aa8] rounded-xl p-4 relative shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={dialogue}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-l-transparent border-r-transparent border-b-[#5d8aa8]" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-[#2b4354]" />
            
            <p className="text-center text-blue-100 text-sm font-medium leading-relaxed">
              "{dialogue}"
            </p>
          </motion.div>
          
          {/* SENSIBLE UI: Threat Level Indicator */}
          <div className="mt-6 bg-red-900/30 border border-red-700 rounded-lg px-4 py-2 text-center">
             <span className="text-red-400 font-bold text-xs uppercase tracking-widest">Threat Level: High</span>
          </div>
        </div>

        {/* RIGHT: Mission Cards */}
        <div className="md:w-2/3 flex flex-col justify-center gap-6">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, type: "spring" }}
              whileHover={{ scale: 1.02, y: -5 }}
              onMouseEnter={() => setDialogue(mission.description)}
              onMouseLeave={() => setDialogue("Prepare yourself for the next challenge!")}
              className={`relative bg-[#1e2d3d] border-2 ${mission.border} rounded-2xl p-4 overflow-hidden group shadow-lg`}
              style={{ perspective: "1000px" }}
            >
              {/* Card Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%]" />
              
              {/* Inner Content Container */}
              <div className="flex items-center gap-4 relative z-10">
                
                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${mission.color} flex items-center justify-center border-4 border-white/20 shadow-inner flex-shrink-0 transition-transform group-hover:scale-110`}>
                  <span className="text-4xl drop-shadow-md">{mission.icon}</span>
                </div>

                {/* Info */}
                <div className="flex-1 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <h2 
                      className="text-xl font-black text-white uppercase tracking-wide"
                      style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.8)" }}
                    >
                      {mission.title}
                    </h2>
                    {/* Difficulty Stars */}
                    <div className="flex gap-1">
                      {[1, 2, 3].map((star) => (
                        <span key={star} className={`text-sm ${star <= mission.difficulty ? 'text-yellow-400' : 'text-gray-600'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-[#8cb4c4] text-xs uppercase mb-2 tracking-wider">{mission.sub}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><span className="text-yellow-500">💰</span> {mission.reward}</span>
                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${mission.status === 'OPEN' ? 'bg-green-500/20 text-green-400' : mission.status === 'READY' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-500'}`}>
                      {mission.status}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-end gap-2 pl-4 pr-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(mission.route)}
                    disabled={mission.status === "LOCKED"}
                    className={`relative w-16 h-16 rounded-xl bg-gradient-to-b ${mission.color} border-2 border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:filter-grayscale`}
                  >
                    <span className="text-2xl">
                      {mission.status === "LOCKED" ? "🔒" : "⚔️"}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-2 rounded-b-xl bg-black/20" />
                  </motion.button>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Play</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}