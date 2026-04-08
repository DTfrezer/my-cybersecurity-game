// src/components/IntroPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IntroPage = ({ settings }) => {
  const navigate = useNavigate();
  const [showStartButton, setShowStartButton] = useState(false);

  const messages = [
    "Welcome to CyberDefender Academy, recruit!",
    "Your mission is to navigate through a network infected with malware.",
    "Use your tools to scan, identify, and neutralize threats.",
    "Remember: Virus (1 action), Worm (2 actions), Ransomware (3 actions).",
    "Reach the end point or clean all infections to complete your mission."
  ];

  // --- Your working typewriter logic ---
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;
    let charIndex = 0;
    setDisplayText('');
    const typeInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayText(prev => prev + currentMessage.charAt(charIndex));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50);
    return () => clearInterval(typeInterval);
  }, [currentMessage, isTyping]);

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex(prev => prev + 1);
        setCurrentMessage(messages[currentMessageIndex + 1]);
        setIsTyping(true);
      } else {
        setShowStartButton(true);
      }
    }, 4000);
    return () => clearTimeout(messageTimer);
  }, [currentMessageIndex, messages]);
  // --- End of your logic ---

  const handleStartGame = () => navigate('/level3/game');
  const handleHowToPlay = () => navigate('/level3/how-to-play'); // Better to navigate to a dedicated page
  const handleSettings = () => navigate('/level3/settings');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full text-center"
      >
        <motion.h1
          className="text-5xl font-bold mb-8 text-blue-400"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          CyberDefender Academy
        </motion.h1>

        <motion.div
          className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-lg p-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xl mb-4">{displayText}</p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showStartButton ? 1 : 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Mission Objectives:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <p>Navigate the grid to reach the end point or eliminate all threats.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔍</span>
              <p>Click on tiles and use "Quick Scan" to reveal if they are safe or infected.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🧹</span>
              <p>Use "Quarantine" to clean infected tiles before you can move onto them.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⌨️</span>
              <p>Use arrow keys to move your character through the safe path you create.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🦠</span>
              <p>Be careful! Infections can spread. Manage your tools wisely.</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
            onClick={handleStartGame}
          >
            Start Level
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            onClick={handleHowToPlay}
          >
            How to Play
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            onClick={handleSettings}
          >
            Settings
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroPage;
