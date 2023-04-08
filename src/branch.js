"use strict";

import { line, millis, random, stroke } from "p8g.js";
import { BRANCH } from "./settings";
import { animPercent, shuffleArray } from "./utils";

const BRANCH_STATES = {
  'growing': 0,
  'mature': 1,
}

export default class Branch {
  /** @type {number} */
  xFrom;
  /** @type {number} */
  xTo;
  /** @type {number} */
  yFrom;
  /** @type {number} */
  yTo;
  /** @type {boolean} */
  fromPosChanged;
  /** @type {number} */
  xMag;
  /** @type {number} */
  yMag;
  /** @type {number} */
  angle;
  /** @type {number} */
  depth;
  /** @type {number} */
  maxLen;
  /** @type {number} */
  growInit;
  /** @type {number} */
  growTime;
  /** @type {Array<Array<number>>} */
  palette;
  /** @type {Array<Array<number>>} */
  leafPalette;
  /** @type {Array<number>} */
  colour;
  /** @type {number} */
  fadeInit;
  /** @type {number} */
  fadeTime;
  /** @type {Array<Branch>} */
  children;
  /** @type {null|number} */
  forkPoint;
  /** @type {number} */
  #state;

  /**
   * @param {number} x Initial X position
   * @param {number} y Initial Y position
   * @param {number} angle Angle in radians that this branch grows towards (0 = straight up)
   * @param {number} depth This branch's distance from the trunk (0 = this is the trunk)
   * @param {Array<Array<number>>} palette This tree's palette for branches
   * @param {Array<Array<number>>} leafPalette This tree's palette for leaves
   * @param {number} [trunkMaxLen] The trunk's maximum length, if this isn't the trunk itself
   */
  constructor(x, y, angle, depth, palette, leafPalette, trunkMaxLen) {
    // pos and geometry.
    this.xFrom = this.xTo = x;
    this.yFrom = this.yTo = y;
    this.fromPosChanged = false;
    this.xMag = Math.sin(angle);
    this.yMag = Math.cos(angle);
    this.angle = angle;
    this.depth = depth;
    this.maxLen = random(BRANCH.MIN_LEN, BRANCH.MAX_LEN) * Math.pow(BRANCH.CHILD_LEN_MULT, depth);

    // randomise behaviour: animation times
    this.growInit = millis();
    this.growTime = random(BRANCH.MIN_GROW_TIME, BRANCH.MAX_GROW_TIME);
    this.fadeTime = random(BRANCH.MIN_FADE_TIME, BRANCH.MAX_FADE_TIME);

    // randomise behaviour: colours (make a copy because shuffle is in-place)
    this.palette = [...palette]
    this.leafPalette = [...leafPalette];
    shuffleArray(this.palette);
    this.colour = this.palette[Math.floor(random(this.palette.length))];
    this.fadeInit = 0;
    

    // randomise behaviour: child branches
    this.children = []; // instantiated if/when fork point (of grow animation) is hit
    if (depth < 2) {
      this.children = [
        new Branch(x, y, angle - Math.PI / 4, depth + 1, this.palette, this.leafPalette),
        new Branch(x, y, angle - Math.PI / 8, depth + 1, this.palette, this.leafPalette),
        new Branch(x, y, angle, depth + 1, this.palette, this.leafPalette),
        new Branch(x, y, angle + Math.PI / 8, depth + 1, this.palette, this.leafPalette),
        new Branch(x, y, angle + Math.PI / 4, depth + 1, this.palette, this.leafPalette),
      ];
    }
    if (
      depth < BRANCH.MIN_DEPTH ||
      (depth < BRANCH.MAX_DEPTH && Math.random() < BRANCH.FORK_CHANCE)
    ) {
      this.forkPoint = random(BRANCH.MIN_FORK_POINT, BRANCH.MAX_FORK_POINT);
    } else {
      this.forkPoint = null;
    }

    // state
    this.#state = BRANCH_STATES.growing;
  }

  run() {
    this.update();
    this.display();
    this.children.forEach(c => c.run());
  }

  update() {
    switch (this.#state) {
      case BRANCH_STATES.growing:
        this.#updateGrowing();
        break;
      case BRANCH_STATES.mature:
        this.#updateMature();
        break;
    }
  }

  #updateGrowing() {
    // check if growing has finished
    if (millis() >= this.growInit + this.growTime) {
      this.fadeInit = millis();
      this.#state = BRANCH_STATES.mature;
      this.#updateMature();
      return;
    }

    // calculate length and coords
    const animPerc = animPercent(this.growInit, this.growTime);
    this.#calcToCoords(this.maxLen * animPerc);
    this.#updateChildrenCoords();
  }

  #updateMature() {
    // re-calculate coordinates if any ancestor branch is still animating
    if (this.fromPosChanged) {
      this.#calcToCoords(this.maxLen);
      this.fromPosChanged = false;
      // children must now also recalculate
      this.#updateChildrenCoords();
    }

    // check if current colour cycle animation is finished
    const animPerc = animPercent(this.fadeInit, this.fadeTime);
  }

  display() {
    stroke(this.colour);
    line(this.xFrom, this.yFrom, this.xTo, this.yTo);
  }

  /** @param {number} len */
  #calcToCoords(len) {
    this.xTo = this.xFrom + len * this.xMag;
    this.yTo = this.yFrom - len * this.yMag;
  }

  #updateChildrenCoords() {
    this.children.forEach(c => {
      c.xFrom = this.xTo;
      c.yFrom = this.yTo;
      c.fromPosChanged = true;
    });
  }
}