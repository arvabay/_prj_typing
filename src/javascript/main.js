import '../css/main.css';
import '../css/index.css';
import '../css/resets/resetButton.css';
import svg_keyboard from '../assets/keyboard.svg';
import Fetcher from './classes/Fetcher';
import TextPreviewer from './classes/TextPreviewer';
import Menu from './classes/Menu';
import { removeClass, addClass, readLocalFile } from './modules/helpers';
import { loadColorTheme } from './modules/colorManager';
import { TERMS_NB_IN_SUIT } from '../../config/constants.json';
import * as fetchers from './modules/fetchers';
import '@grafikart/spinning-dots-element';

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
const elm_img_home = document.querySelector('.imghome');
const elm_img_home_svg = document.querySelector('.imghome-svg');
// VARIABLES (others)
let close = null;
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
  previewer.setPreviewText();
  // Loader displaying ( Grafikart Library : <spinning-dots></spinning-dots> )
  const elm_loader = document.createElement('spinning-dots');
  elm_loader.classList.add('spinningdots');
  elm_text.appendChild(elm_loader);
  fetcher.fetch(site, word).then( (res) => {
    setTimeout( ()=> { 
      previewer.setPreviewText();
      // Text showing animation Start
      elm_text.style.opacity = '0';
      elm_text.classList.add('text-fadein');
      previewer.setPreviewText(res);
      // Text showing animation End
      setTimeout( () => {
        elm_text.style.opacity = '1';
        elm_text.classList.remove('text-fadein');
      }, 300)
    }, 400);
  }).catch( (e) => {
    flashError(e);
  }).finally( () => {
    // Loader hiding
    elm_loader.classList.add('spinningdots-fadeout');
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
// We want plain file content (not just a link to the file)
// for convenient svg colors manipulations in CSS
readLocalFile(svg_keyboard).then( (content) => {
  elm_img_home_svg.innerHTML = content;
});

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
  elm_img_home.style.display = 'none';
  previewer.setPreviewText();
  const btn = event.target || event.srcElement;
  addClass(btn, 'buttons__button-selected');
  removeBtnsSelection(btn);
  if (btn.dataset.type === 'online') {
    site = btn.dataset.site;
    // Input display for Online text fetch
    form__submitbtn.style.display = 'inline';
    form__input.style.display = 'inline';
    form__input.focus();
    form__input.select();
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
