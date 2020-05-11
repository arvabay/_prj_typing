
const url = "https://www.universalis.fr/encyclopedie/";

/**
 * Return an article content after a research on the well known french site Universalis 
 * @returns {Promise} - Promise object represents the article content
 * @param {string} word - Word from which we want to search an article content 
 */
export const universalis = async function(word) {

  return new Promise( (resolve, reject) => {

      fetch(url + word + '/').then( response => {
        // console.log(response.headers.get('status'));
        if (response.ok) {
          return response.text();
        } else {
          reject('Erreur lors de la requête pour l\'url ' + this.url);
        }
      }).then( (html) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        const corps = doc.getElementById('corps-prospect');
        if (corps) {
          const ps = corps.querySelector('p');
          resolve(ps.innerHTML);
        } else {
          // Not a specified article for this word, lets try to get first article of suggestions
          const next = doc.querySelector('.lirelasuite');
          const str = next.href.split("/encyclopedie/").pop();
          // console.log(url + str);
          fetch(url + str).then( response => {
            if (response.ok) {
              return response.text();
            } else {
              reject('Erreur lors de la requête pour l\'url ' + this.url);
            }
          }).then( (html) => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            const corps = doc.getElementById('corps-prospect');
            if (corps) {
              const ps = corps.querySelector('p');
              resolve(ps.innerHTML);
            } else {
              reject();
            }
          });
        }
      }).catch(e => {
        reject('error : ' + e);
      });

  });  
  
}