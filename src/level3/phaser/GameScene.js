// src/phaser/GameScene.js
import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    const config = this.registry.get('gameConfig');
    if (!config || !config.grid) {
      console.error("GameScene: Game config or grid not found in registry! Aborting scene creation.");
      this.grid = [[]];
      return;
    }
    this.config = config;
    this.grid = config.grid;
    this.playerPosition = { ...config.playerPosition };
    this.endPosition = config.endPosition;
    this.settings = config.settings;
    this.onTileClick = config.onTileClick;
    this.onPlayerMove = config.onPlayerMove;
    this.onToolUse = config.onToolUse;
  }

  create() {
    if (!this.grid || !this.grid[0]) {
      console.error("Cannot create game grid, it is empty.");
      return;
    }
    this.tileSize = 60;
    this.tiles = [];

    this.createTextures();
    this.createGrid();
    this.createPlayer();
    this.createEndPoint();
    this.setupInput();

    // --- Create the tooltip text object ---
    this.tooltip = this.add.text(0, 0, '', {
      fontSize: '16px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: { x: 8, y: 6 },
      style: {
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 3,
      }
    }).setOrigin(0.5).setDepth(1000);
    this.tooltip.setVisible(false);
  }

  createTextures() {
    this.add.graphics().fillStyle(0x4a6bff).fillCircle(30, 30, 20).generateTexture('player', 60, 60);
    this.add.graphics().fillStyle(0x4dff4d).fillCircle(30, 30, 20).generateTexture('endPoint', 60, 60);
    this.add.graphics().fillStyle(0x333366).fillRect(0, 0, 60, 60).generateTexture('unknownTile', 60, 60);
    this.add.graphics().fillStyle(0x666699).fillRect(0, 0, 60, 60).generateTexture('safeTile', 60, 60);
    this.add.graphics().fillStyle(0x993333).fillRect(0, 0, 60, 60).generateTexture('infectedTile', 60, 60);
    this.add.graphics().fillStyle(0xff6b6b).fillCircle(30, 30, 15).generateTexture('virus', 60, 60);
    this.add.graphics().fillStyle(0xff9f40).fillCircle(30, 30, 15).generateTexture('worm', 60, 60);
    this.add.graphics().fillStyle(0xff3366).fillCircle(30, 30, 15).generateTexture('ransomware', 60, 60);
  }

  createGrid() {
    if (!this.grid || !this.grid[0]) {
      console.error("Cannot create game grid, it is empty.");
      return;
    }
    const gridWidth = this.grid[0].length;
    const gridHeight = this.grid.length;
    const offsetX = (this.cameras.main.width - gridWidth * this.tileSize) / 2;
    const offsetY = (this.cameras.main.height - gridHeight * this.tileSize) / 2;
    for (let y = 0; y < gridHeight; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < gridWidth; x++) {
        const tileData = this.grid[y][x];
        const tileX = offsetX + x * this.tileSize;
        const tileY = offsetY + y * this.tileSize;
        let textureKey = 'unknownTile';
        if (tileData.state === 'safe' || tileData.state === 'revealed') textureKey = 'safeTile';
        else if (tileData.state === 'infected') textureKey = 'infectedTile';
        const tile = this.add.image(tileX, tileY, textureKey).setInteractive().on('pointerdown', () => this.handleTileClick(x, y));
        tile.worldX = tileX;
        tile.worldY = tileY;
        this.tiles[y][x] = tile;

        // --- Store the malware icon reference ---
        if (tileData.state === 'infected' && tileData.malwareType) {
          const malwareIcon = this.add.image(tileX, tileY, tileData.malwareType);
          tile.malwareIcon = malwareIcon; // Store the reference
        }
      }
    }
  }

  createPlayer() {
    const gridWidth = this.grid[0].length;
    const offsetX = (this.cameras.main.width - gridWidth * this.tileSize) / 2;
    const offsetY = (this.cameras.main.height - this.grid.length * this.tileSize) / 2;
    const playerX = offsetX + this.playerPosition.x * this.tileSize;
    const playerY = offsetY + this.playerPosition.y * this.tileSize;
    const playerContainer = this.add.container(playerX, playerY);
    const glow = this.add.graphics().fillStyle(0x4a6bff, 0.3).fillCircle(0, 0, this.tileSize / 2.5);
    const playerSprite = this.add.image(0, 0, 'player');
    playerContainer.add([glow, playerSprite]);
    this.tweens.add({ targets: glow, scaleX: 1.2, scaleY: 1.2, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.player = playerContainer;
  }

  createEndPoint() {
    const gridWidth = this.grid[0].length;
    const offsetX = (this.cameras.main.width - gridWidth * this.tileSize) / 2;
    const offsetY = (this.cameras.main.height - this.grid.length * this.tileSize) / 2;
    const endX = offsetX + this.endPosition.x * this.tileSize;
    const endY = offsetY + this.endPosition.y * this.tileSize;
    const endContainer = this.add.container(endX, endY);
    const glow = this.add.graphics().fillStyle(0x4dff4d, 0.4).fillCircle(0, 0, this.tileSize / 2.5);
    const endSprite = this.add.image(0, 0, 'endPoint');
    endContainer.add([glow, endSprite]);
    this.tweens.add({ targets: glow, scaleX: 1.4, scaleY: 1.4, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  }

  setupInput() {
    this.input.keyboard.on('keydown-UP', () => this.movePlayer(0, -1));
    this.input.keyboard.on('keydown-DOWN', () => this.movePlayer(0, 1));
    this.input.keyboard.on('keydown-LEFT', () => this.movePlayer(-1, 0));
    this.input.keyboard.on('keydown-RIGHT', () => this.movePlayer(1, 0));
  }

  update() {
    if (!this.tooltip) return;
    const { worldX, worldY } = this.input.activePointer;
    const gridWidth = this.grid[0].length;
    const gridHeight = this.grid.length;
    const offsetX = (this.cameras.main.width - gridWidth * this.tileSize) / 2;
    const offsetY = (this.cameras.main.height - gridHeight * this.tileSize) / 2;
    if (worldX >= offsetX && worldX < offsetX + gridWidth * this.tileSize && worldY >= offsetY && worldY < offsetY + gridHeight * this.tileSize) {
      const tileX = Math.floor((worldX - offsetX) / this.tileSize);
      const tileY = Math.floor((worldY - offsetY) / this.tileSize);
      if (this.grid[tileY] && this.grid[tileY][tileX]) {
        const tile = this.tiles[tileY][tileX];
        const tileData = this.grid[tileY][tileX];
        let text = '';
        if (tileData.state === 'unknown') text = 'Unknown Tile';
        else if (tileData.state === 'safe' || tileData.state === 'revealed') text = 'Safe Tile';
        else if (tileData.state === 'infected') text = `Infected: ${tileData.malwareType.charAt(0).toUpperCase() + tileData.malwareType.slice(1)}`;
        this.tooltip.setText(text);
        this.tooltip.setPosition(worldX, worldY - 40);
        this.tooltip.setVisible(true);
      } else {
        this.tooltip.setVisible(false);
      }
    } else {
      this.tooltip.setVisible(false);
    }
  }

  handleTileClick(x, y) {
    this.onTileClick(x, y);
    this.tweens.add({ targets: this.tiles[y][x], scaleX: 1.1, scaleY: 1.1, duration: 100, yoyo: true, ease: 'Power2' });
  }

  movePlayer(dx, dy) {
    const newX = this.playerPosition.x + dx;
    const newY = this.playerPosition.y + dy;
    if (newX < 0 || newX >= this.grid[0].length || newY < 0 || newY >= this.grid.length || this.grid[newY][newX].state === 'unknown' || this.grid[newY][newX].state === 'infected') return;
    this.playerPosition.x = newX;
    this.playerPosition.y = newY;
    const gridWidth = this.grid[0].length;
    const offsetX = (this.cameras.main.width - gridWidth * this.tileSize) / 2;
    const offsetY = (this.cameras.main.height - this.grid.length * this.tileSize) / 2;
    const targetX = offsetX + newX * this.tileSize;
    const targetY = offsetY + newY * this.tileSize;
    this.tweens.add({ targets: this.player, x: targetX, y: targetY, duration: 200, ease: 'Power2', onComplete: () => this.onPlayerMove({ ...this.playerPosition }) });
  }

  // --- CORRECTED useTool method ---
  useTool(tool, tilePosition) {
    const { x, y } = tilePosition;
    const tile = this.grid[y][x];
    let success = false;

    if (tool === 'quickScan' || tool === 'deepScan') {
      if (tile.state === 'unknown') {
        tile.state = 'revealed';
        this.tiles[y][x].setTexture('safeTile');
        if (tile.malwareType) {
          this.add.image(this.tiles[y][x].x, this.tiles[y][x].y, tile.malwareType);
        }
        success = true;
      }
    } else if (tool === 'quarantine' || tool === 'restoreBackup') {
      if (tile.state === 'infected') {
        this.tiles[y][x].setTint(0xffffff);
        const cleaningEffect = this.add.graphics().fillStyle(0x4dff4d, 0.6).fillCircle(this.tiles[y][x].x, this.tiles[y][x].y, this.tileSize / 2);
        this.tweens.add({ targets: cleaningEffect, scaleX: 0, scaleY: 0, alpha: 0, duration: 500, ease: 'Power2', onComplete: () => cleaningEffect.destroy() });

        this.time.delayedCall(250, () => {
          const actionsNeeded = tile.severity;
          tile.actionsNeeded = (tile.actionsNeeded || 0) + 1;

          if (tile.actionsNeeded >= actionsNeeded) {
            tile.state = 'safe';
            this.tiles[y][x].setTexture('safeTile');
            this.tiles[y][x].clearTint();

            // --- THE FIX IS HERE ---
            const malwareIcon = tile.malwareIcon;
            if (malwareIcon) {
              malwareIcon.destroy();
              tile.malwareIcon = null; // Clear the reference
            }

            console.log(`Tile (${x}, ${y}) fully cleaned. Actions needed: ${actionsNeeded}, Severity: ${tile.severity}`);

            success = true;
          } else {
            this.tiles[y][x].clearTint();
            success = true;
          }
          this.updateTooltip(x, y);
        });
      }
    }

    if (!success) {
      this.tweens.add({
        targets: this.tiles[y][x],
        _tone: 0xff0000,
        duration: 100,
        yoyo: true,
        ease: 'Power2',
        onUpdate: (tween) => {
          const color = Phaser.Display.Color.IntegerToColor(tween.getValue('_tone') || 0x993333);
          this.tiles[y][x].setTint(color.color);
        },
        onComplete: () => {
          this.tiles[y][x].clearTint();
        }
      });
    }

    this.onToolUse(tool, tilePosition, success);
  }

  updateTooltip(x, y) {
    if (!this.tooltip || !this.tiles[y] || !this.tiles[y][x]) return;
    const tileData = this.grid[y][x];
    let text = 'Safe Tile';
    this.tooltip.setText(text);
    this.tooltip.setPosition(this.tiles[y][x].worldX, this.tiles[y][x].worldY - 40);
    this.tooltip.setVisible(true);
  }
}

export default GameScene;
