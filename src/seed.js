import {
  ellipse,
  fill,
  height,
  millis,
  random
} from "p8g.js";
import { SEED } from "./settings";
import { animPercent, easeOut } from "./utils";

const SEED_STATES = {
  'falling': 0,
  'resting': 1,
  'digging': 2,
  'growing': 3,
};

export default class Seed {
  /** @type {number} */
  x;
  /** @type {number} */
  y;
  /** @type {number} */
  groundY;
  /** @type {number} */
  dY;
  /** @type {number} */
  restTime;
  /** @type {number} */
  digTime;
  /** @type {number} */
  digYOff;
  /** @type {Array<number>} */
  colour;
  /** @type {number} */
  restInit;
  /** @type {number} */
  digInit;
  /** @type {number} */
  #state;

  /**
   * @param {number} x Initial X position
   * @param {number} yFrom Initial Y position
   * @param {number} yTo Y position at which seed hits the ground
   */
  constructor(x, yFrom, yTo) {
    // pos
    this.x = x;
    this.y = yFrom;
    this.groundY = yTo;
    this.dY = 0;

    // randomise behaviour
    this.restTime = random(SEED.MIN_REST, SEED.MAX_REST);
    this.digTime = random(SEED.MIN_DIG_TIME, SEED.MAX_DIG_TIME);
    // don't dig to OOB
    this.digYOff = Math.min(
      random(SEED.MIN_DEPTH, SEED.MAX_DEPTH),
      height - this.groundY
    );
    this.colour = [255, 255, 255, 255];

    // animation timers that will be initialised once a certain state is reached
    this.restInit = 0;
    this.digInit = 0;

    // state
    this.#state = SEED_STATES.falling;
  }

  run() {
    this.update();
    this.draw();
  }

  update() {
    switch (this.#state) {
      case SEED_STATES.falling:
        this.#updateFalling();
        break;
      case SEED_STATES.resting:
        this.#updateResting();
        break;
      case SEED_STATES.digging:
        this.#updateDigging();
        break;
      case SEED_STATES.growing:
        this.#updateGrowing();
        break;
    }
  }

  /** Seed falls to the ground */
  #updateFalling() {
    // apply gravity and move
    this.dY += SEED.GRAVITY;
    this.y += this.dY;

    // check if seed has hit the ground
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.restInit = millis();
      this.#state = SEED_STATES.resting;
    }
  }

  /** Seed rests for a while before digging */
  #updateResting() {
    // check if rest is finished
    if (millis() >= this.restInit + this.restTime) {
      this.digInit = millis();
      this.#state = SEED_STATES.digging;
    }
  }

  /** Seed digs into the soil and germinates */
  #updateDigging() {
    const animPerc = animPercent(this.digInit, this.digTime);
    // check if digging is finished
    if (animPerc >= 1) {
      this.#state = SEED_STATES.growing;
      return;
    }

    // set Y pos according to ease-out funciton based on animation percentage
    this.y = this.groundY + this.digYOff * easeOut(animPerc, SEED.DIG_EASE_POW);
  }

  /** Seed fades away */
  #updateGrowing() {
    this.colour[3] = Math.max(this.colour[3] - SEED.DECAY, 0);
  }

  /** Draw the seed. Stroke & fill mode set once before all seeds are run */
  draw() {
    fill(this.colour);
    ellipse(this.x, this.y, SEED.RADIUS, SEED.RADIUS);
  }

  isAlive() {
    return !!this.colour[3];
  }
}