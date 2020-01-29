import { SVG_NS } from "../settings";

export default class Ball {
  constructor(boardWidth, boardHeight, radius) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.radius = radius;
    this.direction = 1;
    //resets ball in the middle of the board
    this.reset();
  }
  reset() {
    //code to centre ball and for movement
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    //generates random number between -5 and 5
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  paddleCollision(player1, player2) {
    //if vx is greater than zero, detect paddle of player 2
    if (this.vx > 0) {
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
      );
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      )
        this.vx = -this.vx;
    }
    //else detect paddle of player 1
    else {
      let paddle = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height
      );
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x - this.radius >= leftX &&
        this.x - this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      )
        this.vx = -this.vx;
    }
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();

    this.paddleCollision(player1, player2);

    let ball = document.createElementNS(SVG_NS, "circle");
    //your code here
    ball.setAttributeNS(null, "cx", this.x);
    ball.setAttributeNS(null, "cy", this.y);
    ball.setAttributeNS(null, "r", this.radius);
    ball.setAttributeNS(null, "fill", "white");
    svg.appendChild(ball);
  }
}
