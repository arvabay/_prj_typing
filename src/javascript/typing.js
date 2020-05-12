// import CSS
import '../css/main.css';
import '../css/typing.css';
// import classes
import Menu from './classes/Menu';
import TypingMain from './classes/TypingMain';
import TypingOverview from './classes/TypingOverview';
import TypingResult from './classes/TypingResult';
// import modules
import { loadColorTheme } from './modules/colorManager';
import { addClass } from './modules/helpers';

/**
 * @typedef {object} KeyEvent
 * 
 */


// VARIABLES
//=========================
// -- VARIABLES (DOM elements)
const elm_skip = document.querySelector('.typing__skip');
const elm_text_to_type = document.querySelector('.typing__text');
const elm_cursor = document.querySelector('.typing__cursor');
const elm_typing_container = document.querySelector('.typing__container');
const elm_textall_prev = document.querySelector('.textall__prev');
const elm_textall_curr = document.querySelector('.textall__current');
const elm_textall_error = document.querySelector('.textall__error');
const elm_menu = document.querySelector('.menu');
const elm_modalbg = document.querySelector('.modalbg');
const elm_modalbox = document.querySelector('.modalbox');
const elm_modalbox_btnback = document.querySelector('.modalbox__btn-back');
const elm_modalbox_btnagain = document.querySelector('.modalbox__btn-again');
// -- VARIABLES (others)
let terminated = false;
let nb_chars_valid = 0;
const TEXT_TO_TYPE_LGTH = 80;
const CURSOR_COLOR = {
  true: 'var(--color-main)',
  false: 'var(--color-error)'
}


// FUNCTIONS USED FOR  THIS PAGE (namespace typing)
//=========================
/**
 * Page "typing.html" entry point
 * @namespace
 */
const typing = {

  // ONLY FOR DEV - Debug key pressed
  debugPress: function (e, char_to_type) {
    console.log('char typed : ' + String.fromCharCode(e.keyCode) + ', code : ' + e.keyCode);
    console.log('char to type : ' + char_to_type + ', code : ' + char_to_type.charCodeAt() );
  },

  /**
   * Terminate the typing session. Count errors number, and launch session report (modal-box)
   * @returns {void}
   */
  terminate: function() {
    terminated = true;
    const errors_number = document.querySelectorAll('.color-error').length;
    typing_result.terminate(errors_number);
    // Modal box end-report apparition
    elm_modalbg.style.zIndex = "51";
    addClass(elm_modalbg, "opacity-100");
    elm_modalbox.style.zIndex = "52";
    addClass(elm_modalbox, "box-appear");
  },

  /**
   * Proceed after success key typed : inform typers, hide skip button, and check if session is over
   * Can be called if : 1- correct Key pressed OR 2- character is skipped by skip button click
   * @returns {void}
   */
  success: function() {
    typing_overview.manageChar(true);
    elm_skip.style.display = "none";
    elm_skip.classList.remove('skip-appear');
    const next_text = text.substring(nb_chars_valid + 1, nb_chars_valid + TEXT_TO_TYPE_LGTH);
    typing_main.typingSuccess(next_text);
    nb_chars_valid++;
    // Is typing over ?
    if (nb_chars_valid >= text.length) {
      this.terminate();
    }
  },

  /**
   * When key pressed on Keyboard, get the current character and check if it
   * corresponds to key pressed. Calls appropriate operations in cases of Success / Error
   * @returns {void}
   * @param {KeyEvent} e 
   */
  keyPressed: function(e) {
    e.preventDefault();
    e = e || window.event;
    let char_to_type = text.substring(nb_chars_valid, nb_chars_valid + 1);
    // Transforming non-breaking space into breaking space
    char_to_type = char_to_type.charCodeAt() === 160 ? " " : char_to_type;
    // this.debugPress(e, char_to_type);
    // KEY PRESSED CORRECT  
    if(char_to_type === String.fromCharCode(e.keyCode)) {
      this.success();
    // KEY PRESSED INCORRECT
    } else {
      typing_overview.manageChar(false);
      typing_main.typingError(char_to_type);
      elm_skip.style.display = "inline-block";
      elm_skip.classList.add('skip-appear');
    }
    // Is typing over ?
    if (nb_chars_valid >= text.length && !terminated) {
      this.terminate();
    }
  }
}




// SCRIPT BEGINNING
//=========================
// Text to type fetch
let text = window.localStorage.getItem('text_to_type');
// basics 'hard to type' chars replacement
const regexp = /(«|»|–|—|œ|’)/g;
text = text.replace(regexp, ()=>{return '-'});
// DOM typing mechanisms initializations
const typing_main = new TypingMain( elm_text_to_type, elm_cursor, elm_typing_container, CURSOR_COLOR );
const typing_overview = new TypingOverview( elm_textall_prev, elm_textall_curr, elm_textall_error );
// DOM Menu generation
const menu = new Menu(elm_menu, true);
// Skip button event - if untypable character encountered
elm_skip.addEventListener('click', function() { typing.success() });
// colorManager Module call
loadColorTheme(menu);
// End report modal box buttons events
elm_modalbox_btnback.addEventListener('click', function() {
  window.location = "./index.html";
});
elm_modalbox_btnagain.addEventListener('click', function() {
  window.location.reload();
});
// Setting text to typing mechanism
typing_overview.setCurrentHTML(text);
// We need a clean text (without html tags)
text = typing_overview.getCurrentText();
// End typing Results statistics in modal-box 
const typing_result = new TypingResult(elm_modalbox, text);
typing_main.typingSuccess(text);
// Keyboard key pressed Listening
document.onkeypress = function(e) { 
  if (elm_textall_curr.innerText.length > 0 || elm_textall_error.innerText.length > 0) {
    typing.keyPressed(e);
  }
}