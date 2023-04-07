"use strict";

import p8g, {
  background,
  createCanvas,
  height,
  line,
  mouseX,
  mouseY,
  noStroke,
  stroke,
  strokeWeight,
  width,
} from 'p8g.js';
import { createNoise2D } from 'simplex-noise';

import { GROUND } from './settings';
import Seed from './seed';

/** @type {Array<number>} The Y value of the ground for each X value. Is it just me or is this horrible? */
const groundY = [];
/** @type {Array<Seed>} */
let seeds = [];

// main loop
p8g.draw = () => {
  background(0);

  // ground. Ugh, there must be a better way to do this...
  stroke(GROUND.COLOUR);
  strokeWeight(1);
  groundY.forEach((y, x) => line(x, y, x, height));

  // seeds
  noStroke();
  seeds.forEach(s => s.run());
  seeds = seeds.filter(s => s.isDead()); // lazy. Would splice be better?

  // trees
  // ...

  // leaves
  // ...
};

// listen for clicks
p8g.mouseReleased = () => {
  const x = Math.round(mouseX);
  const y = Math.round(mouseY);
  // sow a seed if the mouse was clicked above ground
  if (y >= groundY[x]) {
    return;
  }
  seeds.push(new Seed(x, y, groundY[x]));
  console.log(x, y, groundY[x]);
}

/** Prepare sketch and create canvas */
function init() {
  // add canvas to page
  const container = document.getElementById('canvas_container');
  if (container) {
    const canvasDims = container.getBoundingClientRect();
    container.appendChild(createCanvas(canvasDims.width, canvasDims.height));
    // createCanvas() makes a bonus div, no longer needed
    document.querySelector('div[style="display: inline-flex; overflow: hidden;"]')?.remove();
  }

  // use noise to generate terrain
  const noise2D = createNoise2D();
  const groundBaseline = height * GROUND.BASELINE;
  const groundMaxOffset = height * GROUND.NOISE_MULT;
  for (let i = 0; i < width; i++) {
    const n = noise2D(i * GROUND.NOISE_SPEED, 0);
    groundY.push(Math.round(groundBaseline - groundMaxOffset * n));
  }
}

// do the thing!
init();