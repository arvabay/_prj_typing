import '../css/main.css';
import '../css/index.css';
import '../css/resets/resetButton.css';
import Fetcher from './classes/Fetcher';
import TextPreviewer from './classes/TextPreviewer';
import Menu from './classes/Menu';
import { removeClass, addClass } from './modules/helpers';
import { loadColorTheme } from './modules/colorManager';
import { TERMS_NB_IN_SUIT } from '../../config/constants.json';
import * as fetchers from './modules/fetchers';


// VARIABLES
//=========================
// VARIABLES (DOM elements)
const elm_buttons = document.querySelector('.buttons');
const form__submitbtn = document.querySelector('.textrequest__container button')
const form__input = document.querySelector('.textrequest__container input')
const form = document.querySelector('.textrequest');
const elm_text = document.querySelector('.text__textandbutton');
const elm_flash = document.querySelector('.flash');
const elm_menu = document.querySelector('.menu');
const loader = document.querySelector('.loader'); 
let close = null;
// VARIABLES (others)
const CHANGE_LENGTH = 70;
const fetcher = new Fetcher();
const previewer = new TextPreviewer(elm_text, CHANGE_LENGTH);
let site = null;


// FUNCTIONS
//=========================
const removeBtnsSelection = function(elm_btn) {
  for (let i = 0; i < btns.length; i++) {
    if (btns[i] !== elm_btn) {
      removeClass(btns[i], 'buttons__button-selected')
    }
  }
}

// Online text fetch
const wordEmitted = function(event) {
  if (!site) {
    flashError("Aucun site n'est actuellement sélectionné pour la recherche");
  }
  flashHide();
  event.preventDefault();
  const word = form__input.value;
  // !!!!
  // !!!! A FAIRE : les vérifications d'usage sur la variable word
  fetcher.fetch(site, word).then( (res) => {
    previewer.setPreviewText();
    previewer.setPreviewText(res);    
  }).catch( (e) => {
    flashError(e);
  });
}

const createCloseElm = function() {
  close = document.createElement("span");
  close.classList.add("flash-close");
  close.innerHTML = "&nbsp;&nbsp;X&nbsp;&nbsp;";
  close.addEventListener('click', function() {
    flashHide();
  })
}

// Flash messages monitoring : Display a message
const flashError = function(message) {
  if ( close === null ) { createCloseElm(); }

  elm_flash.innerHTML = message;
  elm_flash.appendChild(close);
  elm_flash.style.display = "inline";    
}

// Flash messages monitoring : Remove any messages
const flashHide = function() {
  elm_flash.style.display = "none";
}


// SCRIPT BEGINNING
//=========================
// DOM Menu generation
const menu = new Menu(elm_menu, false);
// colorManager Module call
loadColorTheme(menu);

form.addEventListener('submit', wordEmitted);

// Buttons generation (some are by default -directly in html template-,
// others depend on fetchers added in /modules/fetchers/)
Object.entries(fetchers).forEach(([name, exported]) => {
  const button = document.createElement('button');
  button.classList.add('buttons__button');
  button.dataset.type = 'online';
  button.dataset.site = name;
  button.innerText = name;
  elm_buttons.appendChild(button);
});
const btns = document.querySelectorAll('.buttons__button');

// Text generation after Buttons clicks
btns.forEach(btn => btn.addEventListener('click', (e) => {
  e.preventDefault();
  flashHide();
  previewer.setPreviewText();
  const btn = event.target || event.srcElement;
  addClass(btn, 'buttons__button-selected');
  removeBtnsSelection(btn);
  if (btn.dataset.type === 'online') {
    site = btn.dataset.site;
    // Input display for Online text fetch
    form__submitbtn.style.display = 'inline';
    form__input.style.display = 'inline';
    window.localStorage.removeItem('terms_number');
  } else {
    // Locale generation (suit of characters)
    form__submitbtn.style.display = 'none';
    form__input.style.display = 'none';
    window.localStorage.setItem('terms_number', TERMS_NB_IN_SUIT);
    fetcher.fetch(btn.dataset.type).then( (res) => {
      previewer.setPreviewText(res);
    });
  }
}));
