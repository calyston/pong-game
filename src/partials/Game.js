import { SVG_NS, KEYS } from "../settings.js";
import Board from "./Board.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Score from "./Score.js";
import Music from "../../public/sounds/passing-breeze.mp3";

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.pause = true;
    this.music = new Audio(Music);

    // Other code goes here...
    this.gameElement = document.getElementById(this.element);

    this.board = new Board(this.width, this.height);

    this.ballRadius = 8;

    this.ball = new Ball(this.width, this.height, this.ballRadius);

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.w,
      KEYS.s
    );
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down
    );

    this.score1 = new Score(this.width / 2 - 50, 30, 30);

    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          this.player1.speed = 10;
          this.player2.speed = 10;
          this.music.play();
          break;
      }
    });
  }

  render() {
    if (this.pause) {
      this.player1.speed = 0;
      this.player2.speed = 0;
      this.music.pause();
      return;
    }

    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    this.gameElement.appendChild(svg);

    this.board.render(svg);

    this.player1.render(svg);
    this.player2.render(svg);

    this.ball.render(svg, this.player1, this.player2);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  }
}
