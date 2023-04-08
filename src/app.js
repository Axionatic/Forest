"use strict";

import p8g, {
  background,
  createCanvas,
  height,
  line,
  mouseX,
  mouseY,
  noStroke,
  random,
  stroke,
  strokeWeight,
  width,
} from 'p8g.js';
import { createNoise2D } from 'simplex-noise';

import { BRANCH, GROUND, LEAF_COLS, TREE_COLS } from './settings';
import Seed from './seed';
import Branch from './branch';

/** @type {Array<number>} The Y value of the ground for each X value */
const groundY = [];
/** @type {Array<Seed>} */
let seeds = [];
/** @type {Array<Branch>} */
const trees = [];

// main loop
p8g.draw = () => {
  background(0);

  // ground. Ugh, there must be a better way to do this...
  stroke(GROUND.COLOUR);
  strokeWeight(GROUND.STROKE_WEIGHT);
  groundY.forEach((y, x) => line(x, y, x, height));

  // seeds
  noStroke();
  seeds.forEach(s => s.run());
  seeds = seeds.filter(s => s.isAlive()); // lazy. Splice instead?

  // trees
  strokeWeight(BRANCH.STROKE_WEIGHT);
  if (!trees.length) {
    for (let i = 0; i < 100; i++) {
      trees.push(new Branch(
        random(width),
        random(height),
        0,
        0,
        TREE_COLS[Math.floor(random(TREE_COLS.length))],
        LEAF_COLS[Math.floor(random(LEAF_COLS.length))],
      ));
    }
  }
  trees.forEach(t => t.run());

  // leaves
  // ...
};

// listen for clicks
p8g.mouseReleased = () => {
  // sow a seed if the mouse was clicked above ground
  const x = Math.round(mouseX);
  const y = Math.round(mouseY);
  if (y < groundY[x]) {
    seeds.push(new Seed(x, y, groundY[x]));
  }
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