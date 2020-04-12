import '../css/main.css';
import '../css/index.css';
import '../css/resets/resetButton.css';
import { Fetcher } from './classes/Fetcher';
import { TextPreviewer } from './classes/TextPreviewer';
import { removeClass, addClass } from './modules/helpers';
// import { appendMenu } from './modules/domMenu';
import { Menu } from './classes/Menu';
import { loadColorTheme } from './modules/colorManager';
import * as fetchers from './modules/fetchers';


// Constants (DOM Elements) 
const form__buttons_text = document.querySelector('.form__btns-text');
const form__submitbtn = document.querySelector('.form__container-input button')
const form__input = document.querySelector('.form__input-word')
const form = document.querySelector('.form__textrequest');
const elm_text = document.querySelector('.text__textandbutton');
const elm_flash = document.querySelector('.flash');
const elm_menu = document.querySelector('.menu');
const loader = document.querySelector('.loader'); 

// Variables / Constants
const CHANGE_LENGTH = 70;
const fetcher = new Fetcher();
const previewer = new TextPreviewer(elm_text, CHANGE_LENGTH);
let site = null;

// Menu DOM generation
const menu = new Menu(elm_menu, false);
// colorManager Module call
loadColorTheme(menu);

// Buttons generation (some are by default -directly in html template-, others depends on fetchers added in /modules/fetchers/)
Object.entries(fetchers).forEach(([name, exported]) => {
  const button = document.createElement('button');
  button.classList.add('form__button');
  button.dataset.type = 'online';
  button.dataset.site = name;
  button.innerText = name;
  form__buttons_text.appendChild(button);
  form__buttons_text.innerHTML = form__buttons_text.innerHTML + " ";
});
const form__btns = document.querySelectorAll('.form__button');



// Text generation after Buttons clicks
form__btns.forEach(btn => btn.addEventListener('click', (e) => {
  e.preventDefault();
  flashHide();
  previewer.setPreviewText();
  const btn = event.target || event.srcElement;
  addClass(btn, 'form__button-selected');
  removeBtnsSelection(btn);
  if (btn.dataset.type === 'online') {
    site = btn.dataset.site;
    // Input display for Online text fetch
    form__submitbtn.style.display = 'inline';
    form__input.style.display = 'inline';
  } else {
    // locale generation
    form__submitbtn.style.display = 'none';
    form__input.style.display = 'none';
    fetcher.fetch(btn.dataset.type).then( (res) => {
      previewer.setPreviewText(res);
    });
  }
}));


const removeBtnsSelection = function(elm_btn) {
  for (let i = 0; i < form__btns.length; i++) {
    if (form__btns[i] !== elm_btn) {
      removeClass(form__btns[i], 'form__button-selected')
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
form.addEventListener('submit', wordEmitted);



// Flash messages monitoring : Display a message
const flashError = function(message) {
  elm_flash.innerHTML = message;
  elm_flash.style.display = "block";    
}
// Flash messages monitoring : Remove any messages
const flashHide = function() {
  elm_flash.style.display = "none";
}
