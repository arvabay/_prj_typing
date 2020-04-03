import '../css/main.css';
import '../css/typing.css';




let text_all = window.localStorage.getItem('text_to_type');
const regexp = /(«|»|–)/g;
text_all = text_all.replace(regexp, ()=>{return '-'});

const elm_text_all = document.querySelector('.text-all');
const elm_text_to_type = document.querySelector('.typing__text');
const elm_cursor = document.querySelector('.typing__cursor');
const elm_success = document.querySelector('.success');
const text_to_type_lgth = 80;
let nb_chars_valid = 0;
let char_to_type = null;
let hit_state = true;
const CURSOR_COLOR = {
  true: "rgb(30, 102, 128)",
  false: "rgb(163, 26, 33)"
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
  if(char_to_type === String.fromCharCode(e.keyCode)) {
    hit_state = true;
    elm_cursor.style.background = CURSOR_COLOR.true;
    nb_chars_valid++;
    console.log('offset : ' + nb_chars_valid);
    setTextToType(nb_chars_valid);
  } else {
    console.log('WRONG');
    hit_state = false;
    elm_cursor.style.background = CURSOR_COLOR.false;
    if (char_to_type === ' ') {
      elm_cursor.style.color = CURSOR_COLOR.false;
    }
  }
};

