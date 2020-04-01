// import * as fetcher from './fetch.js';
// fetcher();

import '../css/main.css';

const url_server = "http://localhost:3000";
const suburl_submit_word = "/submit-word";

const url_fetch = 'https://www.universalis.fr/encyclopedie/';


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
    console.log(html);
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
const elm_text = document.querySelector('.text');
const elm_flash = document.querySelector('.flash');
elm_form.addEventListener('submit', wordEmitted);