
/**
 * @module suitGenerator
 * @description Provides random generations of various string suits types (symbols, numbers)
 */

const special = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', 
'[', ']', '{', '}', ':', ';', '\'', '"', '<', '>', '/', '?'];

// Private
//////////////////////////////////////////
/**
 * Returns a random number in a given range
 * @private
 * @returns {number}
 * @param {number} min - Range start
 * @param {number} max - Range end
 */
const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a block of numbers
 * @private
 * @returns {string}
 * @param {*} term_length - number of characters in the block
 */
const generate_number_suit = function(term_length) {
  let term = "";
  for (let index = 0; index < term_length; index++) {
    term += Math.floor(Math.random() * (9 - 1 + 1)) + 1; 
  }
  return term;
}

/**
 * Returns a block of symbols
 * @private
 * @returns {string}
 * @param {*} term_length  - number of characters in the block
 */
const generate_symbols_suit = function(term_length) {
  let suit = "";
  for (let index = 0; index < term_length; index++) {
    const number = getRandomInt(0, special.length - 1);
    suit += special[number];
  }
  return suit;
}
//////////////////////////////////////////


// Exported
//////////////////////////////////////////
/**
 * Generate a suit of many blocks of numbers.
 * @returns {string}
 * @param {number} term_length - The number of characters in a block
 * @param {number} terms_nb  - The number of blocks in the suit
 */
const generateNumbers = function(term_length, terms_nb) {
  let suit = "";
  for (let index = 0; index < terms_nb; index++) {
    const space = index === terms_nb - 1 ? '' : ' &nbsp;';
    suit += generate_number_suit(term_length) + space;
  }
  return suit;
}

/**
 * Generate a suit of many blocks of symbols.
 * @returns {string}
 * @param {number} term_length - The number of characters in a block
 * @param {number} terms_nb - The number of blocks in the suit
 */
const generateSymbols = function(term_length, terms_nb) {
  let suit = "";
  for (let index = 0; index < terms_nb; index++) {
    const space = index === terms_nb - 1 ? '' : " &nbsp;";
    suit += generate_symbols_suit(term_length) + space;
  }
  return suit;
}
//////////////////////////////////////////

export { generateNumbers, generateSymbols };