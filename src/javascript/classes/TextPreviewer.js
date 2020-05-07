import { addClass, removeClass } from '../modules/helpers'

/**
 * 
 * @classdesc Build DOM representation of text supposed to be typed.
 * Build following blocks in a given root_element : button start, 
 * scroll minus / plus (reduce or increase text length), and text
 */
export default class TextPreviewer {

  /**
   * 
   * @param {Element} elm_root - The DOM Element in wich text and scroll will be append
   * @param {number} CHANGE_LENGTH - The number of chars added / removed at each change of text length 
   */
  constructor(elm_root, CHANGE_LENGTH) {
    this.elm_root = elm_root;
    this.CHANGE_LENGTH = CHANGE_LENGTH;
    this.current_text = ''; // used for text length changes and text dislay
    this.cut_position = null; // used for text length changes
    
        // this.elm_minus = document.createElement('a');
        // this.elm_minus.addEventListener('click', () => {
        //   this.change_text_length(false, this.CHANGE_LENGTH);
        // });
        // this.elm_plus = document.createElement('a');
        // this.elm_plus.addEventListener('click', () => {
        //   this.change_text_length(true, this.CHANGE_LENGTH);
        // });
        this.scroll_bar = document.createElement('div');
        this.scroll_bar.classList.add('text__scrollbar');
        this.scroll_cursor = document.createElement('div');
        this.scroll_cursor.classList.add('text__scrollcursor');

    this.elm_start = document.createElement('a');
    this.elm_start.addEventListener('click', () => { 
      this.start();
    });
    this.elm_p = document.createElement('p');
  }

  /**
   * 
   * Initialize DOM blocks (representating what is supposed to type) with given text
   * @param {string} text
   * @returns {Void} 
   */
  setPreviewText(text = null) { 
    if (!text) { 
      this.elm_root.innerHTML = '';
      return;
    }
    window.localStorage.setItem('text_to_type', text);
    this.elm_start.classList.add('form__buttonlaunch');
    this.elm_start.innerText = 'Démarrer';
    const container = document.createElement('div');
    container.classList.add('text__container');
    const scroll = document.createElement('div');
    scroll.classList.add('text__buttons');

        // this.elm_minus.innerText = "-";
        // this.elm_minus.classList.add('text__button', 'enabled');
        // this.elm_plus.innerText = "+";
        // this.elm_plus.classList.add('text__button');
        // scroll.appendChild(this.elm_minus);
        // scroll.appendChild(this.elm_plus);
    scroll.appendChild(this.scroll_bar);
    scroll.appendChild(this.scroll_cursor);

    container.appendChild(scroll);
    container.appendChild(this.elm_p);
    //---------------------------
    this.elm_p.classList.add('text__text');
    this.elm_p.innerHTML = text;
    this.current_text = this.elm_p.innerText;
    this.elm_p.innerHTML = this.current_text;
    this.cut_position = this.current_text.length;
    this.elm_root.appendChild(this.elm_start);
    this.elm_root.appendChild(container);
  }

  /**
   * 
   * Result of a click button. Start typing : Delete last char of text if it's a space, set text in local storage for next page transmission, and go to typing URL
   * @private
   * @returns {Void}
   */
  start() {
    if (this.elm_start.classList.contains('disabled')) {
      return;
    }
    // delete last char if it's a space
    let text_transmitted = '';
    if (this.elm_p.innerText.charCodeAt(this.elm_p.innerText.length) === 31 || this.elm_p.innerText.charCodeAt(this.elm_p.innerText.length) === 32) {
      text_transmitted = this.elm_p.innerText.substring(0, this.elm_p.innerText.length - 1);
    } else {
      text_transmitted = this.elm_p.innerText;
    }
    window.localStorage.setItem('text_to_type', text_transmitted);
    window.location.href = 'typing.html';
  }

  /**
   * 
   * Result of a click button. Reduce / increase text length supposed to by typed. Disable minus / plus scroll if text is at its min / max size. Keep cut position to know where to apply next reduce / increase
   * @param {boolean} direction 
   * @returns {Void}
   * @private
   */
  change_text_length(direction) {
    // prevent clicks if scroll aren't enabled
    if (!direction && !this.elm_minus.classList.contains('enabled') ||
          direction && !this.elm_plus.classList.contains('enabled') )
    {return;}
    // Minus click
    if (direction === false) {
      this.cut_position = this.cut_position - this.CHANGE_LENGTH;
      if (this.cut_position <= 0) {
        this.cut_position = 0;
        removeClass(this.elm_minus, 'enabled');
        addClass(this.elm_start, 'disabled');
      }
    }
    // Plus click
    else {
      removeClass(this.elm_start, 'disabled');
      this.cut_position = this.cut_position + this.CHANGE_LENGTH;
      if (this.cut_position >= this.current_text.length) {
        this.cut_position = this.current_text.length;
        this.elm_plus.classList.remove('enabled');
      }
    }
    // Text block update
    this.elm_p.innerHTML = this.current_text.substring(
      0, this.cut_position);
  
    // Enabling / disabling scroll
    if (this.cut_position > 0) {
      addClass(this.elm_minus, 'enabled');
    }
    if (this.cut_position < this.current_text.length) {
      addClass(this.elm_plus, 'enabled');
    }
  }


}
