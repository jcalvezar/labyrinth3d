export const generateMaze = (width, height) => {
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      visited: false,
      walls: [true, true, true, true], // Top, right, bottom, left
    }))
  );

  const directions = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
  ];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function isInBounds(x, y) {
    return x >= 0 && x < width && y >= 0 && y < height;
  }

  function dfs(x, y) {
    grid[y][x].visited = true;
    const shuffledDirections = shuffle(directions.slice());

    for (const [dy, dx] of shuffledDirections) {
      const nx = x + dx;
      const ny = y + dy;

      if (isInBounds(nx, ny) && !grid[ny][nx].visited) {
        if (dx === 1) {
          grid[y][x].walls[1] = false;
          grid[ny][nx].walls[3] = false;
        } else if (dx === -1) {
          grid[y][x].walls[3] = false;
          grid[ny][nx].walls[1] = false;
        } else if (dy === 1) {
          grid[y][x].walls[2] = false;
          grid[ny][nx].walls[0] = false;
        } else if (dy === -1) {
          grid[y][x].walls[0] = false;
          grid[ny][nx].walls[2] = false;
        }
        dfs(nx, ny);
      }
    }
  }

  dfs(0, 0);
  return grid;
};

export const generateMazeJCA = (width, height) => {
  const grid = Array.from({ length: height * 2 + 1 }, () =>
    Array.from({ length: width * 2 + 1 }, () => ({
      item: "way",
    }))
  );

  const maze = generateMaze(width, height);

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      grid[y * 2][x * 2].item = "wall";

      if (maze[y][x].walls[0]) {
        grid[y * 2][x * 2 + 1].item = "wall";
      }

      if (maze[y][x].walls[3]) {
        grid[y * 2 + 1][x * 2].item = "wall";
      }

      // Extra wall
      grid[maze.length * 2][x * 2].item = "wall";
      grid[maze.length * 2][x * 2 + 1].item = "wall";
      grid[maze.length * 2][x * 2 + 2].item = "wall";
    }

    // Extra wall
    grid[y * 2][maze[y].length * 2].item = "wall";
    grid[y * 2 + 1][maze[y].length * 2].item = "wall";
  }

  return grid;
};

// function displayMaze(maze) {
//   let mazeString = "";

//   for (let y = 0; y < maze.length; y++) {
//     let topRow = "";
//     let midRow = "";

//     for (let x = 0; x < maze[y].length; x++) {
//       topRow += maze[y][x].walls[0] ? "+---" : "+   ";
//       midRow += maze[y][x].walls[3] ? "|   " : "    ";
//     }

//     topRow += "+\n";
//     midRow += "|\n";

//     mazeString += topRow + midRow;
//   }

//   mazeString += Array(maze[0].length).fill("+---").join("") + "+\n";
//   console.log(mazeString);
// }

// function displayMazeJCA(maze) {
//   let mazeString = "";

//   for (let y = 0; y < maze.length; y++) {
//     let topRow = "";
//     let midRow = "";

//     for (let x = 0; x < maze[y].length; x++) {
//       topRow += maze[y][x].walls[0] ? "▓▓" : "▓ ";
//       midRow += maze[y][x].walls[3] ? "▓ " : "  ";
//     }

//     topRow += "▓\n";
//     midRow += "▓\n";

//     mazeString += topRow + midRow;
//   }

//   mazeString += Array(maze[0].length).fill("▓▓").join("") + "▓\n";
//   console.log(mazeString);
// }

// displayMazeJCA(maze);
