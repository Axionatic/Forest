"use strict";

// play with these to make the sketch do different things. Enjoy!

/** Settings for the ground */
export const GROUND = {
  /** Ground stroke weight */
  'STROKE_WEIGHT': 3,
  'COLOUR': [48, 48, 48, 255],
  /** The Y position that will be used as a baseline for the ground, as a percentage of canvas height */
  'BASELINE': 0.75,
  /** The Y value that noise results will be multiplied by, as a percentage of canvas height */
  'NOISE_MULT': 0.125,
  /** The speed at which we move through noise */
  'NOISE_SPEED': 0.003,
}

/** Settings for seeds */
export const SEED = {
  /** Seed size */
  'RADIUS': 6,
  /** Min seed resting time */
  'MIN_REST': 1000,
  /** Max seed resting time */
  'MAX_REST': 2250,
  /** Min seed digging time */
  'MIN_DIG_TIME': 3000,
  /** Max seed digging time */
  'MAX_DIG_TIME': 5000,
  /** Min depth that seed digs to */
  'MIN_DEPTH': 40,
  /** Max depth that seed digs to */
  'MAX_DEPTH': 80,
  /** Rate at which seed falls */
  'GRAVITY': 0.025,
  /** Power to use for ease-out function controlling seed dig animation */
  'DIG_EASE_POW': 3,
  /** Rate at which seed decays once it has germinated */
  'DECAY': 1,
};

/** Settings for trees/branches */
export const BRANCH = {
  /** Tree stroke weight */
  'STROKE_WEIGHT': 3,
  /** Min branch length */
  'MIN_LEN': 30,
  /** Max branch length */
  'MAX_LEN': 60,
  /** Length multiplier for child branches */
  'CHILD_LEN_MULT': 0.75,
  /** Min branch growing time */
  'MIN_GROW_TIME': 3500,
  /** Max branch growing time */
  'MAX_GROW_TIME': 7000,
  /** Power to use for ease-out function controlling branch grow animation */
  'GROW_EASE_POW': 2,
  /** Min number of times a tree can fork */
  'MIN_DEPTH': 2,
  /** Max number of times a tree can fork */
  'MAX_DEPTH': 4,
  /** Percent chance for a branch to grow new branches */
  'FORK_CHANCE': 0.8,
  /** How widely child branches spread, in radians */
  'FORK_ANGLE': 2 * Math.PI / 3, // 120 degrees
  /** Min number of branches a tree limb forks into */
  'MIN_CHILDREN': 2,
  /** Max number of branches a tree limb forks into */
  'MAX_CHILDREN': 5,
  /** Min percent of growth animation at which branch may fork */
  'MIN_FORK_POINT': 0.45,
  /** Max percent of growth animation at which branch may fork */
  'MAX_FORK_POINT': 0.8,
  /** Min time for (fully grown) branch to fade between colours */
  'MIN_FADE_TIME': 750,
  /** Min time for (fully grown) branch to fade between colours */
  'MAX_FADE_TIME': 1500,
}

/** Palettes of colours for trees. 10 palettes of 5 colours each. */
export const TREE_COLS = [
  [[198,216,255,255],[113,169,247,255],[107,92,165,255],[114,25,90,255],[76,16,54,255]],
  [[165,255,229,255],[140,199,161,255],[129,110,148,255],[116,34,108,255],[75,33,66,255]],
  [[176,46,12,255],[235,69,17,255],[193,191,181,255],[142,177,199,255],[254,253,255,255]],
  [[28,49,68,255],[89,111,98,255],[126,161,107,255],[195,216,152,255],[112,22,30,255]],
  [[18,53,91,255],[66,0,57,255],[215,38,56,255],[255,165,165,255],[255,87,10,255]],
  [[28,28,127,255],[207,92,54,255],[239,200,139,255],[244,227,178,255],[211,213,215,255]],
  [[155,229,100,255],[215,247,91,255],[209,156,29,255],[125,69,27,255],[71,44,27,255]],
  [[76,2,44,255],[222,60,75,255],[135,245,251,255],[76,30,48,255],[206,195,193,255]],
  [[0,39,76,255],[112,141,129,255],[244,213,141,255],[191,6,3,255],[141,8,1,255]],
  [[229,215,226,255],[255,136,17,255],[20,54,66,255],[17,158,160,255],[178,25,17,255]],
];

/** Palettes of colours for leaves. 10 palettes of 5 colours each. */
export const LEAF_COLS = [
  [[0,127,178,255],[45,149,153,255],[112,162,136,255],[218,183,133,255],[213,137,111,255]],
  [[208,239,177,255],[179,216,156,255],[125,193,171,255],[119,166,182,255],[77,114,152,255]],
  [[87,117,144,255],[243,202,64,255],[242,165,65,255],[240,138,75,255],[215,138,118,255]],
  [[232,197,71,255],[109,128,242,255],[77,80,97,255],[114,135,255,255],[205,209,196,255]],
  [[91,12,33,255],[204,42,61,255],[229,50,95,255],[252,159,148,255],[255,183,197,255]],
  [[97,226,148,255],[123,205,186,255],[110,113,175,255],[189,147,216,255],[180,122,234,255]],
  [[250,188,60,255],[255,178,56,255],[241,145,67,255],[255,119,61,255],[245,85,54,255]],
  [[91,186,111,255],[63,163,77,255],[42,145,52,255],[19,117,71,255],[5,74,41,255]],
  [[87,74,226,255],[34,42,104,255],[101,69,151,255],[171,129,205,255],[226,173,242,255]],
  [[38,84,124,255],[239,71,111,255],[255,209,102,255],[6,214,160,255],[255,252,249,255]],
];
