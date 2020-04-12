
/**
 * 
 * Add given class name on Element only if it doesn't already has
 * @param {Element} elem 
 * @param {string} class_name 
 */
export const addClass = function(elem, class_name) {
    !elem.classList.contains(class_name) ? elem.classList.add(class_name) : '' ;
  }

/**
 * 
 * Remove given class from Element only if it has
 * @param {Element} elem 
 * @param {string} class_name 
 */
export const removeClass = function(elem, class_name) {
    elem.classList.contains(class_name) ? elem.classList.remove(class_name) : ''
  }