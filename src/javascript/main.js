
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
const CHANGE_LENGTH = 60;
let current_text = '';
let cut_position = null;

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

const change_text_length = function(elm_minus, elm_plus, target, direction, length) {
  // prevent click if buttons isn't enabled
  if (!direction && !elm_minus.classList.contains('enabled') ||
        direction && !elm_plus.classList.contains('enabled') 
  ) {
    return;
  }
  // minus click
  if (direction === false) {
    cut_position = cut_position - length;
    if (cut_position <= 0) {
      cut_position = 0;
      elm_minus.classList.remove('enabled');
    }
  }
  // plus click
  else {
    cut_position = cut_position + length;
    if (cut_position >= current_text.length) {
      cut_position = current_text.length;
      elm_plus.classList.remove('enabled');
    }
  }
  target.innerHTML = current_text.substring(
    0, cut_position);
  
  // enabling / disabling buttons
  if (cut_position > 0) {
    !elm_minus.classList.contains('enabled') ? elm_minus.classList.add('enabled') : '';
  }
  if (cut_position < current_text.length) {
    !elm_plus.classList.contains('enabled') ? elm_plus.classList.add('enabled') : '';
  }
}

const setPreviewText = function(text = null) { 
  if (!text) { elm_text.innerHTML = '' }
  else {
    window.localStorage.setItem('text_to_type', text);
    //const button = "<a href='typing.html' class='form__buttonlaunch'>Démarrer</a>";
    const button = document.createElement('a');
    button.classList.add('form__buttonlaunch');
    button.innerText = 'Démarrer';
    button.addEventListener('click', () => {
      // delete last char if it's a space
      let text_transmitted = '';
      if (p.innerText.charCodeAt(p.innerText.length) === 31 || p.innerText.charCodeAt(p.innerText.length) === 32) {
        text_transmitted = p.innerText.substring(0, p.innerText.length - 1);
      } else {
        text_transmitted = p.innerText;
      }
      window.localStorage.setItem('text_to_type', text_transmitted);
      window.location.href = 'typing.html';
    })
    // button.href = 'typing.html';
    const container = document.createElement('div');
    container.classList.add('text__container');
    const buttons = document.createElement('div');
    buttons.classList.add('text__buttons');
    const button_less = document.createElement('a');
    button_less.innerText = "-";
    button_less.classList.add('text__button', 'enabled');
    const button_plus = document.createElement('a');
    button_plus.innerText = "+";
    button_plus.classList.add('text__button');
    buttons.appendChild(button_less);
    buttons.appendChild(button_plus);
    const p = document.createElement('p');
    button_less.addEventListener('click', () => {
      change_text_length(button_less, button_plus, p, false, CHANGE_LENGTH);
    });
    button_plus.addEventListener('click', () => {
      change_text_length(button_less, button_plus, p, true, CHANGE_LENGTH);
    });
    container.appendChild(buttons);
    container.appendChild(p);
    //---------------------------
    p.classList.add('text__text');
    p.innerHTML = text;
    current_text = p.innerText;
    cut_position = current_text.length;
    elm_text.appendChild(button);
    elm_text.appendChild(container);
  }
}

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