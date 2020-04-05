
import '../css/main.css';
import '../css/typing.css';

let text_all = window.localStorage.getItem('text_to_type');
const regexp = /(«|»|–)/g;
text_all = text_all.replace(regexp, ()=>{return '-'});

const elm_text_to_type = document.querySelector('.typing__text');
const elm_cursor = document.querySelector('.typing__cursor');
const elm_success = document.querySelector('.success');
const elm_typing_container = document.querySelector('.typing__container');
const elm_textall_prev = document.querySelector('.textall__prev');
const elm_textall_curr = document.querySelector('.textall__current');
const elm_textall_error = document.querySelector('.textall__error');

const text_to_type_lgth = 80;
let nb_chars_valid = 0;
let char_to_type = null;
let cursor_position = 0;
// Last char pressed is wrong = false;
let current_state = true;
const CURSOR_COLOR = {
  true: getComputedStyle(document.documentElement).getPropertyValue('--color-main'),
  false: getComputedStyle(document.documentElement).getPropertyValue('--color-error')
}




const setTextToType = function(offset) {
  char_to_type = text_all.substring(offset, offset + 1);
  // Security, we don't want to block the
  // mechanism in case of unexpected char
  if (isNaN(char_to_type.charCodeAt(0)) || char_to_type.charCodeAt(0) === 160 ) {
    console.warn('nan encountered');
    char_to_type = ' ';
  }
  // Need to keep the right dimension of div cursor.
  // Let's fill it with an invisible char
  if (char_to_type === ' ') {
    elm_cursor.style.color = CURSOR_COLOR.true
    elm_cursor.innerText = '~';
  }
  else {
    elm_cursor.style.color= "white";
    elm_cursor.innerText = char_to_type;
  }

  console.log('code to type : ' + char_to_type.charCodeAt(0));
  console.log('char to type : ' + char_to_type);
  //elm_text_to_type.innerHTML = text_to_type.substring(1, text_to_type.length);
  elm_text_to_type.innerHTML = text_all.substring(offset + 1, offset + text_to_type_lgth);
}

// When key pressed
const keyPressed = function(e) {
  if (nb_chars_valid >= text_all.length) {
    elm_success.style.display = 'block';
    return;
  }
  e.preventDefault();
  e = e || window.event;
  // KEY PRESSED CORRECT  
  if(char_to_type === String.fromCharCode(e.keyCode)) {
    colorizeCharInGlobalText(true);
    cursor_position++;
    elm_cursor.style.background = CURSOR_COLOR.true;
    elm_typing_container.style.border = "4px solid var(--color-main)";
    elm_text_to_type.style.color = "var(--color-main)";
    nb_chars_valid++;
    console.log('offset : ' + nb_chars_valid);
    setTextToType(nb_chars_valid);
  // KEY PRESSED INCORRECT
  } else {
    console.log('WRONG');
    colorizeCharInGlobalText(false);
    elm_cursor.style.background = CURSOR_COLOR.false;
    elm_typing_container.style.border = "4px solid var(--color-error)";
    elm_text_to_type.style.color = "var(--color-error)";
    if (char_to_type === ' ') {
      elm_cursor.style.color = CURSOR_COLOR.false;
    }
  }
};

const colorizeCharInGlobalText = function(success) {
  if (success) {
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

// At beginning
elm_textall_curr.innerHTML = text_all;
text_all = elm_textall_curr.innerText;
setTextToType(0);
document.onkeypress = function(e) { keyPressed(e); }
console.log(text_all);