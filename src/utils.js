"use strict";

import { millis } from "p8g.js";

/**
 * Calculate the percentage progress of an animation
 * @param {number} startTime The time in milliseconds when the animation began
 * @param {number} animLength The time in milliseconds that the animation will run for
 * @returns {number}
 */
export function animPercent(startTime, animLength) {
  return (millis() - startTime) / animLength;
}

/**
 * Ease-out for animations
 * @param {number} x Percentage completion of animation (from 0 to 1)
 * @param {number} pow power to use when calculating easing. Higher = more aggressive
 * @returns {number}
 */
export function easeOut(x, pow) {
  return 1 - Math.pow(1 - x, pow);
}

/**
 * Shuffle an array in-place
 * @param {Array} array 
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
