// src/utils/mazeGenerator.js

// A simple directional helper for the maze algorithm
const getNeighbors = (grid, cell) => {
  const neighbors = [];
  const { x, y } = cell;
  const directions = [
    { x: x, y: y - 2 }, // North
    { x: x + 2, y: y }, // East
    { x: x, y: y + 2 }, // South
    { x: x - 2, y: y }  // West
  ];

  directions.forEach(dir => {
    if (dir.x > 0 && dir.x < grid[0].length - 1 && dir.y > 0 && dir.y < grid.length - 1) {
      if (grid[dir.y][dir.x].state === 'infected') {
        neighbors.push(dir);
      }
    }
  });

  return neighbors;
};

// The Recursive Backtracker maze generation algorithm
const generateMazePath = (grid, start, end) => {
  const stack = [];
  const current = { ...start };
  grid[current.y][current.x].state = 'safe';
  stack.push(current);

  while (stack.length > 0) {
    const neighbors = getNeighbors(grid, current);

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];

      // Carve the path between current and next
      const wallX = current.x + (next.x - current.x) / 2;
      const wallY = current.y + (next.y - current.y) / 2;
      grid[wallY][wallX].state = 'safe';
      grid[next.y][next.x].state = 'safe';

      stack.push({ ...current });
      current.x = next.x;
      current.y = next.y;
    } else {
      const backtrackedCell = stack.pop();
      current.x = backtrackedCell.x;
      current.y = backtrackedCell.y;
    }
  }
};

export const generateMaze = (size, difficulty) => {
  // Ensure the size is odd for the maze algorithm to work correctly
  const actualSize = size % 2 === 0 ? size + 1 : size;

  // Create a grid of tiles, all initially infected (walls)
  const grid = [];
  for (let y = 0; y < actualSize; y++) {
    grid[y] = [];
    for (let x = 0; x < actualSize; x++) {
      grid[y][x] = {
        state: 'infected',
        malwareType: null,
        severity: 0
      };
    }
  }

  // Set start and end positions
  const start = { x: 1, y: 1 };
  const end = { x: actualSize - 2, y: actualSize - 2 };

  // Generate the maze path
  generateMazePath(grid, start, end);

  // Place malware on the remaining infected tiles
  const malwareTypes = ['virus', 'worm', 'ransomware'];
  let infectedCount = 0;
  for (let y = 0; y < actualSize; y++) {
    for (let x = 0; x < actualSize; x++) {
      if (grid[y][x].state === 'infected') {
        grid[y][x].malwareType = malwareTypes[Math.floor(Math.random() * malwareTypes.length)];
        switch (grid[y][x].malwareType) {
          case 'virus': grid[y][x].severity = 1; break;
          case 'worm': grid[y][x].severity = 2; break;
          case 'ransomware': grid[y][x].severity = 3; break;
          default: grid[y][x].severity = 1;
        }
        infectedCount++;
      }
    }
  }

  // Hide the path from the player by marking all safe tiles as 'unknown'
  // The game logic will reveal them when scanned
  for (let y = 0; y < actualSize; y++) {
    for (let x = 0; x < actualSize; x++) {
      if (grid[y][x].state === 'safe') {
        grid[y][x].state = 'unknown';
      }
    }
  }

  // Reveal the start and end points so the player knows where they are
  grid[start.y][start.x].state = 'safe';
  grid[end.y][end.x].state = 'safe';

  return {
    grid,
    start,
    end,
    infectedCount
  };
};
