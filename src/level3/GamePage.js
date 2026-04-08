// src/components/GamePage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from './phaser/game';
import { generateMaze } from './utils/mazeGenerator';
import { calculateScore } from './utils/gameLogic';

const GamePage = ({ settings }) => {
  const navigate = useNavigate();
  const gameContainerRef = useRef(null);
  const gameInstanceRef = useRef(null);
  const sceneRef = useRef(null);

  const [gameState, setGameState] = useState({
    playerPosition: { x: 0, y: 0 },
    endPosition: { x: 7, y: 7 },
    grid: [],
    tools: { ...settings.toolUses },
    score: 0,
    startTime: Date.now(),
    infectedTiles: 0,
    scannedTiles: 0,
    mistakes: 0
  });
  const [gameStatus, setGameStatus] = useState('playing');
  const [selectedTool, setSelectedTool] = useState('quickScan');
  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    const maze = generateMaze(settings.gridSize, settings.difficulty);

    const initialGameState = {
      playerPosition: maze.start,
      endPosition: maze.end,
      grid: maze.grid,
      infectedTiles: maze.infectedCount,
      tools: { ...settings.toolUses },
      score: 0,
      startTime: Date.now(),
      scannedTiles: 0,
      mistakes: 0
    };

    setGameState(initialGameState);

    const gameConfig = {
      ...initialGameState,
      settings,
      onTileClick: handleTileClick,
      onPlayerMove: handlePlayerMove,
      onToolUse: handleToolUse
    };

    gameInstanceRef.current = createGame(gameContainerRef.current, gameConfig);

    gameInstanceRef.current.events.on('ready', () => {
      sceneRef.current = gameInstanceRef.current.scene.keys.GameScene;
    });

    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
        sceneRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTileClick = (x, y) => {
    setSelectedTile({ x, y });
  };

  const handlePlayerMove = (newPosition) => {
    setGameState(prevState => {
      if (newPosition.x === prevState.endPosition.x && newPosition.y === prevState.endPosition.y) {
        endGame(true);
      }
      return { ...prevState, playerPosition: newPosition };
    });
  };

  // --- CORRECTED handleToolUse function ---
  const handleToolUse = (tool, tilePosition, success) => {
    setGameState(prev => {
      const newTools = { ...prev.tools, [tool]: Math.max(0, prev.tools[tool] - 1) };

      let newScore = prev.score;
      let newInfectedTiles = prev.infectedTiles;
      let newScannedTiles = prev.scannedTiles;
      let newMistakes = prev.mistakes;

      if (tool === 'quickScan' || tool === 'deepScan') {
        if (success) { // We only need to check if the scan was successful
          newScannedTiles++;
          newScore += 10;
        }
      } else if (tool === 'quarantine' || tool === 'restoreBackup') {
        // THE FIX: Trust the 'success' flag from Phaser. Don't re-check the tile state.
        if (success) {
          newInfectedTiles--;
          newScore += 50;
        } else {
          // This 'else' now correctly handles failed clean attempts (e.g., using a tool on a safe tile)
          newMistakes++;
          newScore -= 20;
        }
      }

      return {
        ...prev,
        tools: newTools,
        score: newScore,
        infectedTiles: newInfectedTiles,
        scannedTiles: newScannedTiles,
        mistakes: newMistakes
      };
    });
  };

  useEffect(() => {
    if (gameState.grid.length > 0 && gameState.infectedTiles === 0 && gameStatus === 'playing') {
      endGame(true);
    }
  }, [gameState.infectedTiles, gameStatus]);

  const endGame = (won) => {
    setGameStatus(won ? 'won' : 'lost');
    const timeTaken = Math.floor((Date.now() - gameState.startTime) / 1000);
    const finalScore = calculateScore(gameState.score, timeTaken, gameState.mistakes);
    localStorage.setItem('gameSummary', JSON.stringify({
      won,
      score: finalScore,
      timeTaken,
      scannedTiles: gameState.scannedTiles,
      infectedTiles: gameState.infectedTiles,
      toolsUsed: Object.fromEntries(Object.entries(settings.toolUses).map(([tool, count]) => [tool, count - gameState.tools[tool]])),
      mistakes: gameState.mistakes
    }));
  };

  const handleUseTool = () => {
    if (!selectedTile || gameState.tools[selectedTool] <= 0 || !sceneRef.current) return;
    sceneRef.current.useTool(selectedTool, selectedTile);
  };

    return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Malware Mayhem</h1>
          <div className="flex gap-4">
            <div className="bg-blue-900 px-4 py-2 rounded">Score: {gameState.score}</div>
            <div className="bg-red-900 px-4 py-2 rounded">Infections: {gameState.infectedTiles}</div>
            <div className="bg-green-900 px-4 py-2 rounded">Scanned: {gameState.scannedTiles}</div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 bg-gray-800 rounded-lg p-4">
            <div className="game-board" ref={gameContainerRef}></div>
          </div>

          <div className="w-64 bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-4">Tools</h3>
            <div className="space-y-2 mb-4">
              {Object.entries(gameState.tools).map(([tool, count]) => (
                <button
                  key={tool}
                  className={`w-full py-2 px-4 rounded ${selectedTool === tool ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} ${count <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setSelectedTool(tool)}
                  disabled={count <= 0}
                >
                  {tool.replace(/([A-Z])/g, ' $1').trim()} ({count})
                </button>
              ))}
            </div>
            <button
              className={`w-full py-2 px-4 rounded ${!selectedTile || gameState.tools[selectedTool] <= 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
              onClick={handleUseTool}
              disabled={!selectedTile || gameState.tools[selectedTool] <= 0}
            >
              Use Tool on ({selectedTile?.x}, {selectedTile?.y})
            </button>
          </div>
        </div>

        {/* --- NEW: Hints Panel --- */}
        <div className="mt-4 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2 text-yellow-400">Intel Briefing</h3>
          <p className="text-sm text-gray-300">
            {selectedTile && gameState.grid[selectedTile.y] && gameState.grid[selectedTile.y][selectedTile.x].state === 'infected' ? (
              <>
                Threat Detected: <span className="font-bold text-red-400">{gameState.grid[selectedTile.y][selectedTile.x].malwareType}</span>
                <br />
                Recommended Tool: <span className="font-bold text-green-400">
                  {gameState.grid[selectedTile.y][selectedTile.x].malwareType === 'virus' && 'Quarantine'}
                  {gameState.grid[selectedTile.y][selectedTile.x].malwareType === 'worm' && 'Quarantine (x2)'}
                  {gameState.grid[selectedTile.y][selectedTile.x].malwareType === 'ransomware' && 'Restore Backup'}
                </span>
              </>
            ) : selectedTile ? (
              <>This tile is safe. No action needed.</>
            ) : (
              <>Select a tile to receive intel.</>
            )}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
            onClick={() => {
              endGame(false);
              navigate('/level3/summary');
            }}
          >
            Give Up
          </button>
        </div>
        {gameStatus !== 'playing' && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">{gameStatus === 'won' ? 'Mission Complete!' : 'Mission Failed!'}</h2>
              <p className="mb-6">{gameStatus === 'won' ? 'You successfully cleared the network!' : 'The network is still compromised.'}</p>
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={() => window.location.reload()}>Retry Level</button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={() => navigate('/level3')}>Return Home</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
