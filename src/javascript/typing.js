
import '../css/main.css';
import '../css/typing.css';
import { TypingMain } from './classes/Typing';
import { TypingOverview } from './classes/TypingOverview';


// VARIABLES (DOM elements)
const elm_text_to_type = document.querySelector('.typing__text');
const elm_cursor = document.querySelector('.typing__cursor');
const elm_success = document.querySelector('.success');
const elm_typing_container = document.querySelector('.typing__container');
const elm_textall_prev = document.querySelector('.textall__prev');
const elm_textall_curr = document.querySelector('.textall__current');
const elm_textall_error = document.querySelector('.textall__error');

// VARIABLES (others)
let nb_chars_valid = 0;
const TEXT_TO_TYPE_LGTH = 80;
const CURSOR_COLOR = {
  true: getComputedStyle(document.documentElement).getPropertyValue('--color-main'),
  false: getComputedStyle(document.documentElement).getPropertyValue('--color-error')
}

// TEXT FETCH
let text = window.localStorage.getItem('text_to_type');
const regexp = /(«|»|–|—|œ|’)/g;
text = text.replace(regexp, ()=>{return '-'});



// When key pressed
const keyPressed = function(e) {
  e.preventDefault();
  e = e || window.event;
  const char_to_type = text.substring(nb_chars_valid, nb_chars_valid + 1);
  // KEY PRESSED CORRECT  
  if(char_to_type === String.fromCharCode(e.keyCode)) {
    typing_overview.manageChar(true);
    const next_text = text.substring(nb_chars_valid + 1, nb_chars_valid + TEXT_TO_TYPE_LGTH);
    typing_main.typingSuccess(next_text);
    nb_chars_valid++;
  // KEY PRESSED INCORRECT
  } else {
    typing_overview.manageChar(false);
    typing_main.typingError(char_to_type);
  }
  // Is typing over ?
  if (nb_chars_valid >= text.length) {
    elm_success.style.display = 'block';
  }
};


// Script beginning
const typing_main = new TypingMain(elm_text_to_type, elm_cursor, elm_typing_container, CURSOR_COLOR);
const typing_overview = new TypingOverview(elm_textall_prev, elm_textall_curr, elm_textall_error);
// We need a clean text (without html tags)
typing_overview.setCurrentHTML(text);
text = typing_overview.getCurrentText();
typing_main.typingSuccess(text);

document.onkeypress = function(e) { 
  if (elm_textall_curr.innerText.length > 0) {
    keyPressed(e);
  }
}