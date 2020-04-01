// import * as fetcher from './fetch.js';
// fetcher();

import '../css/main.css';
import { Fetcher } from './modules/Fetcher';
const fetcher = new Fetcher();



// TESTS
fetcher.fetch('local', 'number').then( (res) => {
  console.log(res);
});
fetcher.fetch('local', 'symbol').then( (res) => {
  console.log(res);
});


// Elements 
const form__submitbtn = document.querySelector('.form__container-input button')
const form__input = document.querySelector('.form__container-input input')
const form = document.querySelector('.form__textrequest');
const form__btns = document.querySelectorAll('.form__button'); 
const loader = document.querySelector('.loader'); 

console.warn(form__submitbtn);
console.warn(form__input);
console.warn(form);

// form__btns.addEventListener('click', () => {
  // });
  
form__btns.forEach(btn => btn.addEventListener('click', (e) => {
  e.preventDefault();
  const btn = event.target || event.srcElement;
  const type = btn.dataset.type;
  if (type === 'universalis') {
    form__submitbtn.style.display = 'inline';
    form__input.style.display = 'inline';
  } else {
    form__submitbtn.style.display = 'none';
    form__input.style.display = 'none';
  }
}));










const sendWord = function (word) {
  // Pas forcément besoin de crawler, finalement..
  // fetch(url_server + suburl_submit_word);

  fetch(url_fetch + word + '/').then( response => {
    // console.log(response.headers.get('status'));
    if (response.ok) {
      return response.text();
    } else {
      console.log('Erreur lors de la requête');
    }
  }).then( (html) => {
    // console.log(html);
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    // console.log(doc);
    const body = doc.getElementsByTagName('body');
    const corps = doc.getElementById('corps-prospect');
    if (corps) {
      const ps = corps.querySelector('p');
      elm_text.innerHTML = ps.innerHTML;
    } else {
      elm_flash.innerHTML = "Aucun article trouvé";
      elm_flash.style.display = "block";
    }
  }).catch(e => {
    console.log('error : ' + e);
  });
}

const wordEmitted = function(event) {
  elm_text.innerHTML = '';
  elm_flash.style.display = "none";
  event.preventDefault();
  const word = elm_input.value;
  // Faire les vérifications d'usage sur la variable word
  sendWord(word);
}

const elm_form = document.querySelector('.form__post_request');
const elm_input = document.querySelector('.form__input-word');
const elm_text = document.querySelector('.text__text');
const elm_flash = document.querySelector('.flash');
elm_form.addEventListener('submit', wordEmitted);