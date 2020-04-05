import '../css/main.css';
import '../css/typing.css';




let text_all = window.localStorage.getItem('text_to_type');
const regexp = /(«|»|–)/g;
text_all = text_all.replace(regexp, ()=>{return '-'});

const elm_text_all = document.querySelector('.text-all');
const elm_text_to_type = document.querySelector('.typing__text');
const elm_cursor = document.querySelector('.typing__cursor');
const elm_success = document.querySelector('.success');
const elm_typing_container = document.querySelector('.typing__container');
const text_to_type_lgth = 80;
let nb_chars_valid = 0;
let char_to_type = null;
let hit_state = true;
let cursor_position = 0;
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

// Au début
elm_text_all.innerHTML = text_all;
text_all = elm_text_all.innerText;
setTextToType(0);
console.log(text_all);


// And when key pressed
document.onkeypress = function (e) {
  if (nb_chars_valid >= text_all.length) {
    elm_success.style.display = 'block';
    return;
  }
  e.preventDefault();
  e = e || window.event;
  // console.log(String.fromCharCode(e.keyCode));
  // KEY PRESSED CORRECT  
  if(char_to_type === String.fromCharCode(e.keyCode)) {
    cursor_position++;
    hit_state = true;
    elm_cursor.style.background = CURSOR_COLOR.true;
    elm_typing_container.style.border = "4px solid var(--color-main)";
    elm_text_to_type.style.color = "var(--color-main)";
    nb_chars_valid++;
    console.log('offset : ' + nb_chars_valid);
    setTextToType(nb_chars_valid);
  // KEY PRESSED INCORRECT
  } else {
    console.log('WRONG');
    colorizeText(cursor_position);
    hit_state = false;
    elm_cursor.style.background = CURSOR_COLOR.false;
    elm_typing_container.style.border = "4px solid var(--color-error)";
    elm_text_to_type.style.color = "var(--color-error)";
    if (char_to_type === ' ') {
      elm_cursor.style.color = CURSOR_COLOR.false;
    }
  }
};

const colorizeText = function(position) {
  let text = elm_text_all.innerText;
  let char = text.substring(position, position+1);
  console.log(char);
  char = "<span class='color-error'>" + char + "</span>";
  text = text.substring(0, position) +
          char +
          text.substring(position+1, text.length);
  elm_text_all.innerHTML = text;
  
  
  
}
