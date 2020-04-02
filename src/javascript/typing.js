import '../css/main.css';
import '../css/typing.css';




const moulinette = function(text) {
  let index = 0;
  for (index = 0; index < text.length -1; index++) {
    const keyCode = text.charCodeAt(index);
    if (isNaN(keyCode)) {
      console.log('nan !');
    }
  }
  console.log('over : ' + index);
}





let text_all = window.localStorage.getItem('text_to_type');
text_all = text_all.replace('«', '<');
text_all = text_all.replace('»', '>');
text_all = text_all.replace('&nbsp;', ' ');
moulinette(text_all);


// text_all = text_all.substring(6, text_all.length);


let text_to_type = null;

const elm_text_all = document.querySelector('.text-all');
const elm_text_to_type = document.querySelector('.typing__text');
const elm_cursor = document.querySelector('.typing__cursor');
const text_to_type_lgth = 110;
let nb_chars_valid = 0;
let char_to_type = null;






const setTextToType = function(offset) {
  text_to_type = text_all.substring(offset, text_to_type_lgth);
  char_to_type = text_to_type.substring(0, 1);
  if (isNaN(char_to_type.charCodeAt(0))) {
    console.warn('nan encountered');
    char_to_type = ' ';
  }
  if (char_to_type === ' ') {
    elm_cursor.style.color= "rgb(30, 102, 128)";
    elm_cursor.innerText = '_';
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
setTextToType(0);


// And when key pressed
document.onkeypress = function (e) {
  e.preventDefault();
  e = e || window.event;
  // console.log(String.fromCharCode(e.keyCode));
  if(char_to_type === String.fromCharCode(e.keyCode)) {
    console.log('ok');
    nb_chars_valid++;
    console.log('offset : ' + nb_chars_valid);
    setTextToType(nb_chars_valid);
  }
};






// const setTextToType = function(offset) {
//   const new_char_to_type = text_all.substring(offset, 1);
//   console.log('to type : ' + new_char_to_type);
//   char_to_type = new_char_to_type;
//   elm_cursor.innerHTML = new_char_to_type;
//   let text_to_type = null;
//   text_to_type = text_all.substring(offset, text_to_type_lgth);
//   return text_to_type;
// }

// At beginning
//const regex1 = /«/;
// A l'arrache, à remplacer par expressions régulières !!! =====



