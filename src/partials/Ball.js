import { SVG_NS } from "../settings";

export default class Ball {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  render(svg) {
    let ball = document.createElementNS(SVG_NS, "circle");
    //your code here
    ball.setAttributeNS(null, "cx", this.cx);
    ball.setAttributeNS(null, "cy", this.cy);
    ball.setAttributeNS(null, "r", this.r);
    ball.setAttributeNS(null, "fill", "white");
    svg.appendChild(ball);
  }
}
// cx="256"
// cy="128"
// r="8"
// stroke="black"
// stroke-width="2px"
// fill="white"
