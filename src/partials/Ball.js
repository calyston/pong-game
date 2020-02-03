import { SVG_NS } from "../settings";
import pingSound from "../../public/sounds/pong-02.wav";

export default class Ball {
  constructor(boardWidth, boardHeight, radius) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.radius = radius;
    this.direction = 1;
    this.ping = new Audio(pingSound);
    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  paddleCollision(player1, player2) {
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
      ) {
        this.ping.play();
        this.vx = -this.vx * 1.05;
      }
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
      ) {
        this.ping.play();
        this.vx = -this.vx * 1.05;
      }
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

  goal(playerWhoScored, otherPlayer) {
    playerWhoScored.score++;
    console.log(playerWhoScored.score);

    if (playerWhoScored.score === 5) {
      playerWhoScored.height = playerWhoScored.height + 20;
    }
    if (playerWhoScored.score === 10) {
      playerWhoScored.height = playerWhoScored.height + 20;
    }
    if (otherPlayer.score >= 10 && playerWhoScored.score === 10) {
      otherPlayer.height = otherPlayer.height - 40;
      playerWhoScored.height = playerWhoScored.height - 40;
    }
    if (playerWhoScored.score === 15 && playerWhoScored.x === 10) {
      alert("Game Over! Player 1 wins! Press 'OK' to return to title.");
      location.reload();
    } else if (playerWhoScored.score === 15 && playerWhoScored.x !== 10) {
      alert("Game Over! Player 2 wins! Press 'OK' to return to title.");
      location.reload();
    }

    this.reset();
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();

    this.paddleCollision(player1, player2);

    let ball = document.createElementNS(SVG_NS, "circle");

    ball.setAttributeNS(null, "cx", this.x);
    ball.setAttributeNS(null, "cy", this.y);
    ball.setAttributeNS(null, "r", this.radius);
    ball.setAttributeNS(null, "fill", "white");
    svg.appendChild(ball);

    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1, player2);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2, player1);
      this.direction = -1;
    }
  }
}
