export class Position {
  constructor(initialX, initialY, initialStep) {
    this.x = initialX;
    this.y = initialY;
    this.step = initialStep;

    // Bind the handleKeyPress method to the instance
    this.handleKeyPress = this.handleKeyPress.bind(this);

    // Add event listener for keydown events
    document.addEventListener("keydown", this.handleKeyPress);
  }

  // Method to handle key presses
  handleKeyPress(event) {
    switch (event.key) {
      case "ArrowUp":
        this.makeMovement(0, 1);
        break;
      case "ArrowDown":
        this.makeMovement(0, -1);
        break;
      case "ArrowLeft":
        this.makeMovement(-1, 0);
        break;
      case "ArrowRight":
        this.makeMovement(1, 0);
        break;
      default:
        break;
    }

    console.log(`x: ${this.x}, y: ${this.y}`);
  }

  // Method to get the x value
  getX() {
    return this.x;
  }

  // Method to get the y value
  getY() {
    return this.y;
  }

  makeMovement(dx, dy) {
    if (this.isAvailable(dx, dy)) {
      this.x += this.step * dx;
      this.y += this.step * dy;
    }
  }

  isAvailable(dx, dy) {
    const checkX =
      dx >= 0
        ? Math.floor(this.x) + dx
        : Math.floor(this.x + dx + 1 - this.step);
    const checkY =
      dy >= 0
        ? Math.floor(this.y) + dy
        : Math.floor(this.y + dy + 1 - this.step);

    console.log("Actual POSITION: ", this.x, this.y);

    let availability = false;

    if (this.available) {
      if (this.available(checkX, checkY)) {
        availability = true;
      }
    }

    return availability;
  }

  setAvailable(myFunc) {
    this.available = myFunc;
  }
}
