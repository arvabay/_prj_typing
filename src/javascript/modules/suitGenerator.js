
// Private
//////////////////////////////////////////
const special = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', 
          '[', ']', '{', '}', ':', ';', '\'', '"', '<', '>', '/', '?'];

const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generate_number_suit = function() {
  return (Math.random() * Math.pow(10, 17)).toString();
}
  
const generate_symbols_suit = function() {
  let suit = "";
  for (let index = 0; index < 18; index++) {
    const number = getRandomInt(0, special.length - 1);
    suit += special[number];
  }
  return suit;
}
//////////////////////////////////////////


// Exported
//////////////////////////////////////////
export const generateNumbers = function() {
  let suit = "";
  for (let index = 0; index < 20; index++) {
    suit += generate_number_suit() + ' ';
  }
  return suit;
}
  
export const generateSymbols = function() {
  let suit = "";
  for (let index = 0; index < 20; index++) {
    suit += generate_symbols_suit() + ' ';
  }
  return suit;
}
//////////////////////////////////////////