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
    this.scroll_bar = document.createElement('div');
    this.scroll_bar.classList.add('text__scrollbar');
    this.scroll_cursor = document.createElement('div');
    this.scroll_cursor.classList.add('text__scrollcursor');
    this.scrolling = false; // true when user is scrolling our custom scroll bar
    this.scroll_cursor_Y_max = null; // cursor Y position shall never exceed this value 
    this.scroll_bar_Y = null; // Y Position of our custom scroll bar
    this.eventsInitialization();
  }
  
  eventsInitialization() {
    this.scroll_cursor.addEventListener('mousedown', e=> {
      e.preventDefault();
      this.cursorMouseDown(e);
    });
    document.body.addEventListener('mouseup', e=> {
      this.scrolling = false;
    });
    this.elm_start = document.createElement('a');
    this.elm_start.addEventListener('click', () => { 
      this.start();
    });
    this.elm_p = document.createElement('p');
    document.body.addEventListener('mousemove', e=> {
      if(this.scrolling) { this.scrollEvent(e) };
    });
  }

  scrollEvent(e) {
    const y_pos = e.clientY - this.scroll_bar_Y;
    self = this;
    // Animation callback
    function anim() {
      self.scroll_cursor.style.top = y_pos + "px";
      const top = parseInt(self.scroll_cursor.style.top.substring(0, self.scroll_cursor.style.top.length -2));
      if (top < 0) {
        self.scroll_cursor.style.top = 0 + "px";
      }
      else if (top > self.scroll_cursor_Y_max) {
        self.scroll_cursor.style.top = self.scroll_cursor_Y_max + "px";
      }
      const top_after = parseInt(self.scroll_cursor.style.top.substring(0, self.scroll_cursor.style.top.length -2));
      const percent = Math.ceil(top_after * 100 / self.scroll_cursor_Y_max);
      self.changeTextLength(percent);
    }
    // Proper animation call
    window.requestAnimationFrame(anim);
  }
  
  /**
   * 
   * Reduce / increase displayed text length supposed to by typed, from a given percent
   * @param {*} percent - Percent of text we want to show
   */
  changeTextLength(percent) {
    percent = percent < 1 ? 1 : percent;
    const cut_position = Math.ceil(percent * this.current_text.length / 100);
    this.elm_p.innerHTML = this.current_text.substring(0, cut_position);
  }

  cursorMouseDown(e) {
    this.scrolling = true;
    this.scroll_cursor.classList.add("text__scrollcursor-scrolling");
    document.body.style.cursor = "grab";
    const scroll_interval = setInterval( ()=>{
      // Not scrolling anymore ? (mouseup event detection on document.body)
      if (!this.scrolling) {
        this.scroll_cursor.classList.remove("text__scrollcursor-scrolling");
        document.body.style.cursor = "initial";
        clearInterval(scroll_interval);
      }
    }, 100);
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
    scroll.classList.add('text__scroll');
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
    this.elm_p.style.width = this.elm_p.offsetWidth + "px";
    container.style.height = container.offsetHeight + "px";
    // Scrollbar variables and Cursor initial position
    const scroll_bar_rect = this.scroll_bar.getBoundingClientRect();
    const posY = Math.floor(scroll_bar_rect.top);
    this.scroll_cursor_Y_max = this.scroll_bar.offsetHeight - this.scroll_cursor.offsetHeight;
    this.scroll_bar_Y = posY + this.scroll_cursor.offsetHeight / 2;
    this.scroll_cursor.style.top = this.scroll_bar.offsetHeight - this.scroll_cursor.offsetHeight + "px";
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


}
