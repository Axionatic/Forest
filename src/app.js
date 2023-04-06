"use strict";

import p8g, {
  background,
  createCanvas,
  rect,
} from 'p8g.js';

p8g.draw = () => {
  background(220);
  rect(50, 50, 100, 100);
};

const container = document.getElementById('canvas_container');
const canvasDims = container.getBoundingClientRect();
container.appendChild(createCanvas(canvasDims.width, canvasDims.height));
// createCanvas() makes a bonus div, no longer needed
document.querySelector('div[style="display: inline-flex; overflow: hidden;"]').remove();
