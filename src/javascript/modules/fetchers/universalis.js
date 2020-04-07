
const url = "https://www.universalis.fr/encyclopedie/";


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
          reject(not_found);
        }
      }).catch(e => {
        reject('error : ' + e);
      });
  });  
  
}