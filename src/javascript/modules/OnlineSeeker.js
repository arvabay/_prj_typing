
import urls from '../../assets/urls.json';


class OnlineSeeker {

  constructor(word, type) {
    this.word = word;
    this.type = type;
    this.urls = urls;
  }

  async seek() {
    return new Promise( (resolve, reject) => {

      const url = this.urls[this.type];
      if (url === undefined) {
        reject("Le nom du site web où chercher l'article est inconnu.");
      }

      if (this.type = 'universalis') {
        fetch(url + this.word + '/').then( response => {
          // console.log(response.headers.get('status'));
          if (response.ok) {
            return response.text();
          } else {
            reject('Erreur lors de la requête pour l\'url ' + this.url);
          }
        }).then( (html) => {
          // console.log(html);
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, "text/html");
          // console.log(doc);
          // const body = doc.getElementsByTagName('body');
          const corps = doc.getElementById('corps-prospect');
          if (corps) {
            const ps = corps.querySelector('p');
            // elm_text.innerHTML = ps.innerHTML;
            resolve(ps.innerHTML);
          } else {
            reject("Aucun article trouvé pour le mot " + this.word +
              ' sur le site ' + this.type);
          }
        }).catch(e => {
          reject('error : ' + e);
        });
      }
    });  
  }

}

export { OnlineSeeker };