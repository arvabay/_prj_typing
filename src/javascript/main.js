
import '../css/main.css';
import '../css/index.css';
import { Fetcher } from './modules/Fetcher';
import { TextPreviewer } from './modules/TextPreviewer';


// Constants (DOM Elements) 
const form__submitbtn = document.querySelector('.form__container-input button')
const form__input = document.querySelector('.form__input-word')
const form = document.querySelector('.form__textrequest');
const form__btns = document.querySelectorAll('.form__button'); 
const elm_text = document.querySelector('.text__textandbutton');
const elm_flash = document.querySelector('.flash');
const loader = document.querySelector('.loader'); 

// Variables / Constants
const CHANGE_LENGTH = 70;
const fetcher = new Fetcher();
const previewer = new TextPreviewer(elm_text, CHANGE_LENGTH);
let site = null;



// Buttons for text generation clicks
form__btns.forEach(btn => btn.addEventListener('click', (e) => {
  flashHide();
  e.preventDefault();
  const btn = event.target || event.srcElement;
  const type = btn.dataset.type;
  previewer.setPreviewText();
  if (type === 'online') {
    site = btn.dataset.site;
    // Input display for Online text fetch
    form__submitbtn.style.display = 'inline';
    form__input.style.display = 'inline';
  } else {
    // locale generation
    form__submitbtn.style.display = 'none';
    form__input.style.display = 'none';
    fetcher.fetch('local', type).then( (res) => {
      previewer.setPreviewText(res);
    });
  }
}));

// Online text fetch
const wordEmitted = function(event) {
  if (!site) {
    flashError("Aucun site n'est actuellement sélectionné pour la recherche");
  }
  flashHide();
  event.preventDefault();
  const word = form__input.value;
  // Faire les vérifications d'usage sur la variable word
  fetcher.fetch('distant', site, word).then( (res) => {
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
