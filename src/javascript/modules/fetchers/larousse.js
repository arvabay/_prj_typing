
const url = "https://www.larousse.fr/dictionnaires/francais/";

export const larousse = function(word) {

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
      const corps = doc.querySelector('.DivisionDefinition');
      // console.log(corps);
      if (corps) {
        // console.log(corps.innerHTML);
        resolve(corps.innerHTML);
      } else {
        reject();
      }
    }).catch(e => {
      reject('error : ' + e);
    });
});  


}

