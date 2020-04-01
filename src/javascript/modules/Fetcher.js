
import urls from '../../assets/urls.json';
import { SuitGenerator } from './SuitGenerator';

class Fetcher {

  constructor() {
    this.generator = new SuitGenerator();
    this.urls = urls;
    this.method = null;
    this.word = null;
    this.fetch_type = null;
  }

  getWord() {
    return this.word;
  }

  getUrls() {
    return this.urls;
  }

  async fetch(method, type) {
    return new Promise( (resolve, reject) => {
      if (method === 'distant') {

      } else if (method === 'local') {
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