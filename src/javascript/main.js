
import '../css/main.css';
import { Fetcher } from './modules/Fetcher';

const fetcher = new Fetcher();
let site = null;

// Elements 
const form__submitbtn = document.querySelector('.form__container-input button')
const form__input = document.querySelector('.form__input-word')
const form = document.querySelector('.form__textrequest');
const form__btns = document.querySelectorAll('.form__button'); 
const elm_text = document.querySelector('.text__textandbutton');
const elm_flash = document.querySelector('.flash');
const loader = document.querySelector('.loader'); 

  
form__btns.forEach(btn => btn.addEventListener('click', (e) => {
  flashHide();
  e.preventDefault();
  const btn = event.target || event.srcElement;
  const type = btn.dataset.type;
  if (type === 'online') {
    site = btn.dataset.site;
    // Input display for Online text fetch
    form__submitbtn.style.display = 'inline';
    form__input.style.display = 'inline';
    setPreviewText();
  } else {
    // locale generation
    form__submitbtn.style.display = 'none';
    form__input.style.display = 'none';
    fetcher.fetch('local', type).then( (res) => {
      console.log(res);
      setPreviewText();
      setPreviewText(res);
    });
  }
}));

const setPreviewText = function(text = null) { 
  if (!text) { elm_text.innerHTML = '' }
  else {
    window.localStorage.setItem('text_to_type', text);
    const xxx = "<a href='typing.html' class='form__buttonlaunch'>Démarrer</a>";
    // const button_launch = "<a class='form__buttonlaunch'>Démarrer</a>";
    elm_text.innerHTML = xxx + "<p class='text__text'>" + text + "</p>";
  }
}

// A SUPPRIMER
//--------------
// const setPreviewText = function(text = null) { 
//   if (!text) { elm_text.innerHTML = '' }
//   else {
//     const xxx = "<form method='POST' action='typing.html'>"+
//       "<input style='visibility: hidden' type='text' name='text' id='text' value='"+text+"'>"+
//       "<button type='submit' class='form__buttonlaunch'>Démarrer</button></form>";
//     elm_text.innerHTML = xxx + "<p class='text__text'>" + text + "</p>";
//   }
// }

const flashError = function(message) {
  elm_flash.innerHTML = message;
  elm_flash.style.display = "block";    
}

const flashHide = function() {
  elm_flash.style.display = "none";
}

// Online text fetch
const wordEmitted = function(event) {
  if (!site) {
    flashError("Aucun site n'est actuellement sélectionné pour la recherche");
  }
  flashHide();
  event.preventDefault();
  const word = form__input.value;
  // Faire les vérifications d'usage sur la variable word
  // sendWord(word);
  fetcher.fetch('distant', site, word).then( (res) => {
    setPreviewText();
    setPreviewText(res);    
  }).catch( (e) => {
    flashError(e);
  });
}

form.addEventListener('submit', wordEmitted);