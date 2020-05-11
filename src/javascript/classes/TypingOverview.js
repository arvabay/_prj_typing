
/**
 * 
 * @classdesc Represents the graphical rendering overview of what user is typing.
 * It contains entire text supposed to be typed. Move letter per letter from
 * current-block to error-block or prev-block, at each key typed (letter is correctly
 * colored in cases of success / error)
 */

class TypingOverview {

/**
 * @constructor
 * @param {Element} elm_prev - Block containing characters already typed
 * @param {Element} elm_curr - Block containing the entire text that's still need to be typed
 * @param {Element} elm_error - Block containing : either empty if last character typed is correct,
 *                                                 or current letter to type if last character typed is incorrect
 */
  constructor(elm_prev, elm_curr, elm_error) {
    this.elm_prev = elm_prev;
    this.elm_curr = elm_curr;
    this.elm_error = elm_error;
  }

  /**
   * Returns innerText of current-block
   * @returns {string}
   */
  getCurrentText() {
    return this.elm_curr.innerText;
  }

  /**
   * Set Text of current-block
   * @returns {void}
   * @param {string} text
   */
  setCurrentText(text) {
    this.elm_curr.innerText = text;
  }

  /**
   * Set HTML of current-block. Delete last character if it's a space
   * @returns {void}
   * @param {string} text 
   */
  setCurrentHTML(text) {
    this.elm_curr.innerHTML = text;
    // Last character space prevention.
    if ( this.getCurrentText().substring(text.length-1, text.length) === " " ) {
      this.setCurrentText(text.substring(0, text.length - 1));
    }
  }

  /**
   * Specifies move of current letter supposed to be typed, in every cases (is the key pressed correct ? And is this the first try or did we already failed > in this last case elm-error isn't empty)
   * @returns {void}
   * @param {boolean} success - true: key pressed correct - false: key pressed incorrect
   */
  manageChar(success) {
    // Is keyPressed correct ?
    if (success) {
      // Is there something in the transitionnal-error text block ?
      this.elm_error.innerText === '' ? this.moveChar(this.elm_curr, this.elm_prev) : 
                                        this.moveChar(this.elm_error, this.elm_prev);
    } else {
      this.elm_error.innerText === '' ? this.moveChar(this.elm_curr, this.elm_error) : 
                                        '';
    }
  }

  /**
   * Controls move of current letter supposed to be typed : from a specified block to another.
   * @private
   * @returns {void}
   * @param {Element} elm_from 
   * @param {Element} elm_to 
   */
  moveChar(elm_from, elm_to) {
    const text = elm_from.innerText;
    let char = text.substring(0, 1);
    // Making errors on 'space character' visibles
    if (char === " " && elm_to === this.elm_error) {
      char = "␣";
    }
    if (elm_to === this.elm_prev) {
      char = this.colorizeChar(char, elm_from);
    }
    elm_to.innerHTML = elm_to.innerHTML + char;
    elm_from.innerHTML = text.substring(1, text.length);
  }

/**
 * In the case of letter insertion in prev-block (test needed), letter is colorized with correct or incorrect color (<span> with class tag added)
 * @private
 * @param {string} char 
 * @param {Element} elm_from 
 * @returns {string}
 */
  colorizeChar(char, elm_from) {
    const class_name = elm_from === this.elm_curr ? "color-success" : "color-error";
    return `<span class='${class_name}'>${char}</span>`;
  }

}

export default TypingOverview;