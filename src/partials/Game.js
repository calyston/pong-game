import { SVG_NS } from "../settings.js";
import Board from "./Board.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    // Other code goes here...
    this.gameElement = document.getElementById(this.element);

    this.board = new Board(this.width, this.height);

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,

      (this.player2 = new Paddle(
        this.height,
        this.paddleWidth,
        this.paddleHeight,
        this.width - this.boardGap - this.paddleWidth,
        (this.height - this.paddleHeight) / 2
      ))
    );

    this.ballRadius = 8;

    this.ball = new Ball(this.width / 2, this.height / 2, this.ballRadius);
  }

  render() {
    // More code goes here....
    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    this.gameElement.appendChild(svg);

    this.board.render(svg);

    this.player1.render(svg);
    this.player2.render(svg);

    this.ball.render(svg);
  }
}
