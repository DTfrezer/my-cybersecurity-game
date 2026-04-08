 // src/components/SummaryPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SummaryPage = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [showShareFeedback, setShowShareFeedback] = useState(false);

  useEffect(() => {
    const savedSummary = localStorage.getItem('gameSummary');
    if (savedSummary) {
      setSummary(JSON.parse(savedSummary));
    } else {
      // Fallback for direct navigation
      setSummary({
        won: false, score: 0, timeTaken: 0, scannedTiles: 0, infectedTiles: 0,
        toolsUsed: { quickScan: 0, deepScan: 0, quarantine: 0, restoreBackup: 0 }, mistakes: 0
      });
    }
  }, []);

  const handlePlayAgain = () => navigate('/game');
  const handleReturnHome = () => navigate('/level3');

  const handleShareSummary = () => {
    if (!summary) return;
    const summaryText = `Malware Mayhem - CyberDefender Academy\n\nMission ${summary.won ? 'Successful' : 'Failed'}!\nScore: ${summary.score}\nTime: ${summary.timeTaken} seconds\nTiles Scanned: ${summary.scannedTiles}\nInfections Cleared: ${summary.infectedTiles}\nMistakes: ${summary.mistakes}\n\nTools Used:\n- Quick Scan: ${summary.toolsUsed.quickScan}\n- Deep Scan: ${summary.toolsUsed.deepScan}\n- Quarantine: ${summary.toolsUsed.quarantine}\n- Restore Backup: ${summary.toolsUsed.restoreBackup}`;
    navigator.clipboard.writeText(summaryText).then(() => {
      setShowShareFeedback(true);
      setTimeout(() => setShowShareFeedback(false), 2000);
    });
  };

  // --- Helper Components for better organization ---

  const StatCard = ({ icon, label, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`bg-gray-800 rounded-lg p-4 border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </motion.div>
  );

  const CircularProgress = ({ value, max, color }) => {
    const percentage = (value / max) * 100;
    return (
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle cx="48" cy="48" r="36" stroke="#374151" strokeWidth="8" fill="none" />
          <circle
            cx="48" cy="48" r="36"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 36}`}
            strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentage / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-bold">{Math.round(percentage)}%</span>
        </div>
      </div>
    );
  };

  const AwarenessCard = ({ title, icon, description, bestPractice, color }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 rounded-lg p-5 border-l-4 mb-4"
      style={{ borderColor: color }}
    >
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-3">{icon}</span>
        <h4 className="text-xl font-bold text-white">{title}</h4>
      </div>
      <p className="text-gray-300 mb-2">{description}</p>
      <p className="text-sm text-gray-400"><strong>Best Practice:</strong> {bestPractice}</p>
    </motion.div>
  );

  // --- Derived State and Calculations ---
  if (!summary) return <div className="loading">Loading...</div>;

  const totalTiles = summary.scannedTiles + summary.infectedTiles;
  const rank = summary.score > 500 ? "Cyber Defender" : summary.score > 200 ? "Security Analyst" : "Cyber Cadet";
  const rankColor = summary.score > 500 ? "text-green-400" : summary.score > 200 ? "text-blue-400" : "text-yellow-400";

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
        className="w-full max-w-4xl bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Mission Debriefing</h1>
          <h2 className={`text-2xl font-semibold ${rankColor}`}>Rank: {rank}</h2>
        </motion.div>

        {/* Mission Status and Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard icon="🏆" label="Final Score" value={summary.score} color="border-yellow-500" />
          <StatCard icon="⏱️" label="Time Taken" value={`${summary.timeTaken}s`} color="border-blue-500" />
          <StatCard icon="🎯" label="Mistakes" value={summary.mistakes} color="border-red-500" />
        </div>

        {/* Progress Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-700 rounded-lg p-6 text-center"
          >
            <h3 className="text-lg font-semibold mb-4">Network Scanned</h3>
            <CircularProgress value={summary.scannedTiles} max={totalTiles || 1} color="#10b981" />
            <p className="text-gray-400 mt-2">{summary.scannedTiles} / {totalTiles} Tiles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-700 rounded-lg p-6 text-center"
          >
            <h3 className="text-lg font-semibold mb-4">Threats Neutralized</h3>
            <CircularProgress value={summary.infectedTiles} max={summary.infectedTiles || 1} color="#ef4444" />
            <p className="text-gray-400 mt-2">{summary.infectedTiles} Infections Cleared</p>
          </motion.div>
        </div>

        {/* Tool Usage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-700 rounded-lg p-6 mb-8"
        >
          <h3 className="text-xl font-bold mb-4">Tools Deployed</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(summary.toolsUsed).map(([tool, count]) => (
              <div key={tool} className="text-center">
                <div className="text-3xl font-bold text-blue-400">{count}</div>
                <div className="text-sm text-gray-400 capitalize">{tool.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cybersecurity Awareness */}
        <div className="mb-8">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold mb-4 text-center"
          >
            Intelligence Report
          </motion.h3>
          <AwarenessCard
            title="Viruses"
            icon="🦠"
            color="#ef4444"
            description="Viruses attach themselves to clean files and infect other clean files. They can spread uncontrollably, damaging a system's core functionality and deleting or corrupting files."
            bestPractice="Keep your antivirus software updated and avoid downloading files from untrusted sources."
          />
          <AwarenessCard
            title="Worms"
            icon="🐛"
            color="#f59e0b"
            description="Worms exploit operating system vulnerabilities to spread over computer networks. They are particularly dangerous because they can replicate themselves without human interaction."
            bestPractice="Regularly update your operating system and use a firewall to protect your network."
          />
          <AwarenessCard
            title="Ransomware"
            icon="🔒"
            color="#ec4899"
            description="Ransomware is designed to block access to a computer system until a sum of money is paid. It can encrypt your files, making them inaccessible."
            bestPractice="Regularly back up your important files. Never pay the ransom as there's no guarantee you'll get your files back."
          />
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 justify-center flex-wrap relative"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105" onClick={handlePlayAgain}>
            Play Again
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105" onClick={handleShareSummary}>
            Share Summary
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105" onClick={handleReturnHome}>
            Home
          </button>
          <AnimatePresence>
            {showShareFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg"
              >
                Copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SummaryPage;
