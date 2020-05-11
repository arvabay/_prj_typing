// import CSS, assets and configs
import '../css/main.css';
import '../css/index.css';
import '../css/resets/resetButton.css';
import svg_keyboard from '../assets/keyboard.svg';
import { TERMS_NB_IN_SUIT } from '../../config/constants.json';
// import classes
import Fetcher from './classes/Fetcher';
import TextPreviewer from './classes/TextPreviewer';
import Menu from './classes/Menu';
// import modules
import { removeClass, addClass, readLocalFile } from './modules/helpers';
import { loadColorTheme } from './modules/colorManager';
import * as fetchers from './modules/fetchers';
// import external libraries
import '@grafikart/spinning-dots-element';

/**
 * @typedef {object} MouseEvent
 */


// VARIABLES
//=========================
// -- VARIABLES (DOM elements)
const elm_buttons = document.querySelector('.buttons');
const form__submitbtn = document.querySelector('.textrequest__container button')
const form__input = document.querySelector('.textrequest__container input')
const form = document.querySelector('.textrequest');
const elm_text = document.querySelector('.text__textandbutton');
const elm_flash = document.querySelector('.flash');
const elm_menu = document.querySelector('.menu');
const elm_img_home = document.querySelector('.imghome');
const elm_img_home_svg = document.querySelector('.imghome-svg');
// -- VARIABLES (others)
let close = null; // The button to close the actual displayed flash box
const fetcher = new Fetcher(); // his job is to get the text to display for starting a session
const previewer = new TextPreviewer(elm_text); // his job is to display start button, scrollbar and text given by Fetcher
let site = null; // The current site/fetcher we want to use for research (changed after main-buttons clicks)


// FUNCTIONS
//=========================
/**
 * Remove the specified selection-class on all main buttons,
 * excepted the button passed in parameter 
 * @param {Element} elm_btn - The element we want it stay unmodified
 */
const removeBtnsSelection = function(elm_btn) {
  for (let i = 0; i < btns.length; i++) {
    if (btns[i] !== elm_btn) {
      removeClass(btns[i], 'buttons__button-selected')
    }
  }
}

/**
 * Online text fetch - Get the string typed in input form, show and hide spinner loader,
 * get result of search (Fetcher class job) from specified site name and pass it to TextPreviewer
 * @param {MouseEvent} event 
 */
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

/**
 * Create the DOM element in charge to close flash messages box
 */
const createCloseElm = function() {
  close = document.createElement("span");
  close.classList.add("flash-close");
  close.innerHTML = "&nbsp;&nbsp;X&nbsp;&nbsp;";
  close.addEventListener('click', function() {
    flashHide();
  })
}

/**
 * Display a flash box showing the string passed in parameter + a close button
 * @param {string} message 
 */
const flashError = function(message) {
  if ( close === null ) { createCloseElm(); }
  elm_flash.innerHTML = message;
  elm_flash.appendChild(close);
  elm_flash.style.display = "inline";    
}

/**
 * Close the actual displayed flash box
 */
const flashHide = function() {
  elm_flash.style.display = "none";
}


// SCRIPT BEGINNING
//=========================
// DOM Menu generation
const menu = new Menu(elm_menu, false);
// colorManager Module call
loadColorTheme(menu);
// Image home : We want plain file content (not just a link to the file)
// for convenient svg colors manipulations in CSS
readLocalFile(svg_keyboard).then( (content) => {
  elm_img_home_svg.innerHTML = content;
});
// Launch a research
form.addEventListener('submit', wordEmitted);
// Main-buttons generation (some are by default -directly in html template-,
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

// Text generation after Main-buttons clicks
btns.forEach(btn => btn.addEventListener('click', (e) => {
  // Resetting displayed elements
  e.preventDefault();
  flashHide();
  elm_img_home.style.display = 'none';
  previewer.setPreviewText();
  // Stylinzing main-buttons (selection and unselection)
  const btn = event.target || event.srcElement;
  addClass(btn, 'buttons__button-selected');
  removeBtnsSelection(btn);
  // Input display for Online text fetch
  if (btn.dataset.type === 'online') {
    site = btn.dataset.site;
    form__submitbtn.style.display = 'inline';
    form__input.style.display = 'inline';
    form__input.focus();
    form__input.select();
    window.localStorage.removeItem('terms_number');
  // Locale generation (suit of characters)
  } else {
    form__submitbtn.style.display = 'none';
    form__input.style.display = 'none';
    window.localStorage.setItem('terms_number', TERMS_NB_IN_SUIT);
    fetcher.fetch(btn.dataset.type).then( (res) => {
      previewer.setPreviewText(res);
    });
  }
}));
