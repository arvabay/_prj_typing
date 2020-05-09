
// Private
//////////////////////////////////////////
const special = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', 
          '[', ']', '{', '}', ':', ';', '\'', '"', '<', '>', '/', '?'];

const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generate_number_suit = function(term_length) {
  // return (Math.random() * Math.pow(10, 17)).toString();
  let term = "";
  for (let index = 0; index < term_length; index++) {
    term += Math.floor(Math.random() * (9 - 1 + 1)) + 1; 
  }
  return term;
}
  
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
export const generateNumbers = function(term_length, terms_nb) {
  let suit = "";
  for (let index = 0; index < terms_nb; index++) {
    const space = index === terms_nb - 1 ? '' : ' &nbsp;';
    suit += generate_number_suit(term_length) + space;
  }
  return suit;
}
  
export const generateSymbols = function(term_length, terms_nb) {
  let suit = "";
  for (let index = 0; index < terms_nb; index++) {
    const space = index === terms_nb - 1 ? '' : " &nbsp;";
    suit += generate_symbols_suit(term_length) + space;
  }
  return suit;
}
//////////////////////////////////////////