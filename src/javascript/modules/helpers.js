
/**
 * 
 * Add given class name on Element only if it doesn't already has
 * @param {Element} elem - DOM Element to treat
 * @param {string} class_name - Name of the class
 */
export const addClass = function(elem, class_name) {
    !elem.classList.contains(class_name) ? elem.classList.add(class_name) : '' ;
  }

/**
 * 
 * Remove given class from Element only if it has
 * @param {Element} elem - DOM Element to treat
 * @param {string} class_name - Name of the class
 */
export const removeClass = function(elem, class_name) {
    elem.classList.contains(class_name) ? elem.classList.remove(class_name) : ''
  }

/**
 * 
 * Transform a number of seconds into a string readable by humans
 * @param {number} duration - Number of seconds we need to convert into hours / minutes / seconds
 */
export const getTime = function(duration) {
  if (duration >= 3600) {
    return "+ d'1 heure"
  }
  if (duration <= 59) {
    return duration + " sec"
  }
  let sec = Math.floor(duration % 60);
  if (sec.toString().length === 1) { sec = '0'+sec }
  const modu = duration % 60;
  return Math.floor(duration / 60) + " mn " + sec + " sec";
}

export const getWordsByMinute = function (words_number, seconds) {
  return Math.floor((60 * words_number) / seconds);
}

export const getErrorsPercent = function (errors_number, chars_number) {
  return Math.round( ((100 * errors_number) / chars_number) * 10 ) / 10;
}