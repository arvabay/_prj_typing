
import '../css/main.css';
import '../css/typing.css';
import { TypingMain } from './modules/Typing';

let text_all = window.localStorage.getItem('text_to_type');
const regexp = /(«|»|–|—|œ|’)/g;
text_all = text_all.replace(regexp, ()=>{return '-'});

// VARIABLES
const elm_text_to_type = document.querySelector('.typing__text');
const elm_cursor = document.querySelector('.typing__cursor');
const elm_success = document.querySelector('.success');
const elm_typing_container = document.querySelector('.typing__container');
const elm_textall_prev = document.querySelector('.textall__prev');
const elm_textall_curr = document.querySelector('.textall__current');
const elm_textall_error = document.querySelector('.textall__error');

const TEXT_TO_TYPE_LGTH = 80;
let nb_chars_valid = 0;
let char_to_type = null;
const CURSOR_COLOR = {
  true: getComputedStyle(document.documentElement).getPropertyValue('--color-main'),
  false: getComputedStyle(document.documentElement).getPropertyValue('--color-error')
}


//////////////////////////////////////////
// SHORT TEXT MECANISM (TOP OF THE PAGE)
//////////////////////////////////////////

//////////////////////////////////////////


//////////////////////////////////////////
// LONG TEXT MECANISM (BOTTOM OF THE PAGE)
//////////////////////////////////////////
const colorizeCharInGlobalText = function(success) {
  // Is keyPressed correct ?
  if (success) {
    // Is there something in the transitionnal-error text block ?
    elm_textall_error.innerText === '' ? moveCharInGlobalText(elm_textall_curr, elm_textall_prev) : 
                                          moveCharInGlobalText(elm_textall_error, elm_textall_prev);
  } else {
    elm_textall_error.innerText === '' ? moveCharInGlobalText(elm_textall_curr, elm_textall_error) : 
                                          '';
  }
}
const moveCharInGlobalText = function(elm_origin, elm_target) {
  const text = elm_origin.innerText;
  let char = text.substring(0, 1);
  if (elm_target === elm_textall_prev) {
    const class_name = elm_origin === elm_textall_curr ? "color-success" : "color-error";
    char = `<span class='${class_name}'>${char}</span>`;
  }
  elm_target.innerHTML = elm_target.innerHTML + char;
  elm_origin.innerHTML = text.substring(1, text.length);
}
//////////////////////////////////////////


// When key pressed
const keyPressed = function(e) {
  e.preventDefault();
  e = e || window.event;
  // console.log(String.fromCharCode(e.keyCode));
  const char_to_type = text_all.substring(nb_chars_valid, nb_chars_valid + 1);
  // console.log(char_to_type);
  // KEY PRESSED CORRECT  
  if(char_to_type === String.fromCharCode(e.keyCode)) {
    colorizeCharInGlobalText(true);
    nb_chars_valid++;
    const next_char = text_all.substring(nb_chars_valid, nb_chars_valid + 1);
    typing_main.setText(nb_chars_valid, next_char);
    // setTextToType(nb_chars_valid);
  // KEY PRESSED INCORRECT
  } else {
    colorizeCharInGlobalText(false);
    typing_main.errorTyping(char_to_type);
  }
  // Text typing is over.
  if (nb_chars_valid >= text_all.length) {
    elm_success.style.display = 'block';
  }
};



// Script beginning
elm_textall_curr.innerHTML = text_all;
// Last character space prevention.
const text = elm_textall_curr.innerText;
if (text.substring(text.length-1, text.length) === " ") {
  elm_textall_curr.innerText = text.substring(0, text.length - 1);
}
text_all = elm_textall_curr.innerText;
const typing_main = new TypingMain( elm_text_to_type,
                                    elm_cursor,
                                    elm_typing_container,
                                    text_all,
                                    CURSOR_COLOR,
                                    TEXT_TO_TYPE_LGTH);
// typing_main.setText(0);
typing_main.setText(0, text_all.substring(0,1));
// setTextToType(0);
document.onkeypress = function(e) { 
  if (elm_textall_curr.innerText.length > 0) {
    keyPressed(e);
  }
}