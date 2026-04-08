// src/components/HowToPlayPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HowToPlayPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-10"
            style={{ width: Math.random() * 400 + 100, height: Math.random() * 400 + 100 }}
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-center mb-8 text-blue-400"
        >
          How to Play
        </motion.h1>

        <div className="space-y-6 text-gray-300">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-4"
          >
            <span className="text-3xl">🎯</span>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Your Mission</h3>
              <p>Navigate the grid to reach the glowing green end point or eliminate all malware infections on the board.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-4"
          >
            <span className="text-3xl">🔍</span>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Scan Tiles</h3>
              <p>Click on a dark, unknown tile and use the "Quick Scan" tool to reveal if it's safe or infected.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-start gap-4"
          >
            <span className="text-3xl">🧹</span>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Clean Infections</h3>
              <p>If a tile is infected, use the "Quarantine" tool to clean it. You cannot move onto an infected tile until it is clean.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-start gap-4"
          >
            <span className="text-3xl">⌨️</span>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Move Your Character</h3>
              <p>Use the arrow keys on your keyboard to move your glowing blue character through the safe path you create.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-start gap-4"
          >
            <span className="text-3xl">🦠</span>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Know Your Enemy</h3>
              <p>Viruses (red) are easy to clean. Worms (orange) are tougher. Ransomware (pink) is the most difficult. Manage your tools wisely!</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            onClick={() => navigate('/level3')}
          >
            Back to Briefing
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToPlayPage;
