
import { SuitGenerator } from './SuitGenerator';
import { OnlineSeeker } from './OnlineSeeker';

class Fetcher {

  constructor() {
    this.generator = new SuitGenerator();
  }

  async fetch(method, type, word = null) {
    return new Promise( (resolve, reject) => {
      // DISTANT CALL
      if (method === 'distant') {
        if (!word) {
          reject("Aucun mot passé.");
        }
        const seeker = new OnlineSeeker(word, type);
        seeker.seek().then( (res) => {
          resolve(res);
        }).catch( (e) => {
          reject(e);
        })
      }
      // LOCALE GENERATION
      else if (method === 'local') {
        this.generate(type).then( generated => {
          resolve(generated);
        });
      }
    });
  }

  async generate(type) {
    return new Promise( (resolve, reject) => {
      if (type === 'number') {
        resolve(this.generator.generateNumbers());
      } else if (type === 'symbol') {
        resolve(this.generator.generateSymbols());
      } else {
        reject('type inconnu');
      }
    });
  }

}

export { Fetcher };