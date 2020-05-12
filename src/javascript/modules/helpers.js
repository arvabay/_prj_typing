
/**
 * @module helpers
 * @description Utilitaries functions for various deteached operations
 */


/**
 * Return the content of a file
 * @returns {Promise} - Promise object represents the content of the file
 * @param {string} file_path - the file path the content need to be returned 
 */
const readLocalFile = async function(file_path)
{
  return new Promise( (resolve, reject) => {
    fetch(file_path, {mode: 'no-cors'})
    .then(response => response.text())
    .then(data=> resolve(data))
    .catch(error => console.error(error));
  });
}

/**
 * Return a random number in a given range (can be equal to the min / max given)
 * @returns {number}
 * @param {number} min - Range start
 * @param {number} max - Range end
 */
const getRandomNumber = function(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Add given class name on Element only if it doesn't already has
 * @returns {void}
 * @param {Element} elem - DOM Element to treat
 * @param {string} class_name - Name of the class
 */
const addClass = function(elem, class_name) {
    !elem.classList.contains(class_name) ? elem.classList.add(class_name) : '' ;
  }

/**
 * Remove given class from Element only if it has
 * @returns {void}
 * @param {Element} elem - DOM Element to treat
 * @param {string} class_name - Name of the class
 */
const removeClass = function(elem, class_name) {
    elem.classList.contains(class_name) ? elem.classList.remove(class_name) : ''
  }
  
/**
 * Transform a number of seconds into a string readable by humans
 * @returns {number}
 * @param {number} duration - Number of seconds we need to convert into hours / minutes / seconds
 */
const getTime = function(duration) {
  if (duration >= 3600) {
    return "+ d'1 heure"
  }
  if (duration <= 59) {
    return duration + " sec"
  }
  let sec = Math.floor(duration % 60);
  if (sec.toString().length === 1) { sec = '0'+sec }
  return Math.floor(duration / 60) + " mn " + sec + " sec";
}

/**
 * Returns an average number of words by minuts in function of given seconds
 * @returns {number}
 * @param {number} words_number 
 * @param {number} seconds 
 */
const getWordsByMinute = function (words_number, seconds) {
  return Math.floor((60 * words_number) / seconds);
}

/**
 * Returns a percent of errors in function of an errors number in a total characters number
 * @returns {number}
 * @param {*} errors_number 
 * @param {*} chars_number 
 */
const getErrorsPercent = function (errors_number, chars_number) {
  return Math.round( ((100 * errors_number) / chars_number) * 10 ) / 10;
}



export { readLocalFile, getRandomNumber, addClass, removeClass, getTime, getWordsByMinute, getErrorsPercent };