/**
 * Function that return a random number in range
 * @param {number} min - the minimum inclusive number
 * @param {number} max - the maximum inclusive number
 * @returns {number}
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = getRandomIntInclusive;
