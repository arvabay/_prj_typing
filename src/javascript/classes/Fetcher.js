
import * as generator from '../modules/suitGenerator';
import * as seekers from '../modules/fetchers';
import { TERMS_NB_IN_SUIT, SUIT_TERM_LENGTH, NB_SPACES_IN_SYMBOLS_SUIT } from '../../../config/constants.json';

/**
 *  @classdesc Manage specific task in order to return expected text :
 * <p> - Fetch online article using appropriate fetcher included in ../modules/fetchers/ </p>
 * <p> - Request suit generation from module suitGenerator  </p>
 */
export default class Fetcher {

  constructor() {
  }

  /**
   * 
   * Returns expected text by analysing type of request
   * @param {*} name - Name of the seeker (web fetch), or name of suit type (algorithm)
   * @param {*} word - only for web fetch - Search an article from the word
   */
  async fetch(name, word = null) {
    return new Promise( (resolve, reject) => {
      // DISTANT CALL
      if (word !== null) {
        if (word === '') {
          reject("Aucun mot passé.");
        }
        this.findSeekerFunction(name)
          .then( (fc) => {
          return fc(word);
        }).then( (text) => {
          resolve(text);
        }).catch( (e) => {
          reject(`Aucun article trouvé pour le mot <span class='strong upper'>${word}</span>
                  sur le site ${name}`);          
        });
      }
      // LOCALE GENERATION
      else {
        this.generate(name).then( generated => {
          resolve(generated);
        });
      }
    });
  }

  /**
   * 
   * Returns appropriate seeker-function from Name among all fetchers specified in ../modules/fetchers/
   * @private
   * @param {string} param_name 
   */
  async findSeekerFunction(param_name) {
    return new Promise( (resolve, reject) => {
      Object.entries(seekers).forEach(([name, exported]) => {
        if (param_name === name) {
          resolve(exported);
        }
      });
      reject(`Aucune fonction trouvée pour le seeker '${param_name}'`);
    });
  }

  /**
   * 
   * Call appropriate function from ../modules/suitGenerator based on suit Name
   * @private
   * @param {string} name - 'number' or 'symbol'
   */
  async generate(name) {
    return new Promise( (resolve, reject) => {
      if (name === 'number') {
        resolve(generator.generateNumbers(SUIT_TERM_LENGTH, TERMS_NB_IN_SUIT));
      } else if (name === 'symbol') {
        resolve(generator.generateSymbols(SUIT_TERM_LENGTH, TERMS_NB_IN_SUIT, NB_SPACES_IN_SYMBOLS_SUIT));
      } else {
        reject('name inconnu');
      }
    });
  }

}