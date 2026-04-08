// src/phaser/game.js
import Phaser from 'phaser';
import GameScene from './GameScene';

export const createGame = (parent, config) => {
  const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: parent,
    backgroundColor: '#1a1f3a',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [GameScene] // The scene is now part of the initial config
  };

  const game = new Phaser.Game(gameConfig);

  // THE FIX: Store the config in the game's registry.
  // The registry is a global store within the game instance, perfect for this.
  game.registry.set('gameConfig', config);

  return game;
};
