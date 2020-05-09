import { getRandomNumber } from '../modules/helpers'

/**
 * 
 * @classdesc Represents the main graphical rendering of what users are typing.
 * Take DOMElements parameters in order to update them at each key pressed 
 */
export default class TypingMain {

/**
 * 
 * @constructor
 * @param {Element} elm_text_to_type - block containing a piece of the text supposed to be typed soon
 * @param {Element} elm_cursor - block containing the current key to be typed
 * @param {Element} elm_typing_container - block containing both cursor and text-to-type
 * @param {Object} CURSOR_COLOR - object containing the two colors to be applied (true: correct / false: error)
 */
  constructor(elm_text_to_type, elm_cursor, elm_typing_container, CURSOR_COLOR) {
    this.elm_text_to_type = elm_text_to_type;
    this.elm_cursor = elm_cursor;
    this.elm_typing_container = elm_typing_container;
    this.CURSOR_COLOR = CURSOR_COLOR;
    this.first_success = true;
    // Source position of animations
    this.animation_position = { x: this.elm_cursor.getBoundingClientRect().left,
                                y: this.elm_cursor.getBoundingClientRect().top + this.elm_cursor.offsetHeight / 2};
    console.log(this.animation_position);
  }


  createSprite() {
    this.elm_test = document.createElement('div');
    const nb = Math.round(getRandomNumber(1,3));
    if (nb === 1) {
      this.elm_test.classList.add('success-fade-out');
    } else if (nb === 2) {
      this.elm_test.classList.add('success-fade-out-slow');
    } else {
      this.elm_test.classList.add('success-fade-out-quick');
    }
    this.elm_test.style.width = getRandomNumber(4, 16) + 'px';
    this.elm_test.style.height = getRandomNumber(4, 16) + 'px';
    this.elm_test.style.borderRadius = getRandomNumber(4, 12) + 'px';
    this.elm_test.style.background = 'var(--color-main)';
    this.elm_test.style.position = 'absolute';
    this.elm_test.style.zIndex = '51';
    const spread = getRandomNumber(4, 17) + 'px';
    this.elm_test.style.boxShadow = `0px 0px 30px ${spread} var(--color-main)`;
    this.elm_test.style.top = this.animation_position.y + '10px';
    this.elm_test.style.left = this.animation_position.x + '10px';
    document.body.appendChild(this.elm_test);
    this.animate_sprite(this.elm_test, 150, getRandomNumber(0, 1.4), getRandomNumber(0.1, 0.35));
  }

  getRandomNumber(min, max) {
    console.log(Math.random() * (max - min) + min);
    return Math.random() * (max - min) + min;
  }

  animate_sprite(elm, max_cycles, x_increase, y_increase) {
    let cycles = 0;
    let x = 0;
    let y = 0;
    const y_direction = Math.random() >= 0.5 ? '-' : '';
    const interval = setInterval( ()=>{
      elm.style.transform = `translate(-${x}px, ${y_direction}${y}px)`;
      x += x_increase;
      y += y_increase;
      cycles++;
      if (cycles >= max_cycles) {
        clearInterval(interval);
        elm.parentNode.removeChild(elm);
      }
    }, 2);
  }


/**
 * 
 * Set Graphical rendering for next character to type after a correct key pressed.
 * @param {string} text - First character of text is put in cursor element, rest of the text put in text-to-type element
 * @return {Void}
 */
  typingSuccess(text) {
    if (this.first_success) {
      this.first_success = false;
    } else {
      for (let index = 0; index < getRandomNumber(1, 3); index++) {
        this.createSprite();
      }
    }
    let char_to_type = text.substring(0,1); 
    this.elm_cursor.style.background = this.CURSOR_COLOR.true;
    this.elm_typing_container.style.border = "4px solid var(--color-main)";
    this.elm_text_to_type.style.color = "var(--color-main)";
    // Security, we don't want to block mechanism in case of unexpected character
    if (isNaN(char_to_type.charCodeAt(0)) || char_to_type.charCodeAt(0) === 160 ) {
      // console.warn('nan encountered');
      char_to_type = ' ';
    }
    // Need to keep the right dimension of div cursor. Let's fill it with an invisible char
    if (char_to_type === ' ') {
      this.elm_cursor.style.color = this.CURSOR_COLOR.true
      this.elm_cursor.innerText = '~';
    }
    else {
      this.elm_cursor.style.color= "white";
      this.elm_cursor.innerText = char_to_type;
    }
    this.elm_text_to_type.innerHTML = text.substring(1, text.length);
  }

/**
 * 
 * Set Graphical rendering after an correct key pressed.
 * @param {string} char_to_type - Need to know if it's a space, to correctly color the character in cursor
 * @return {Void}
 */
  typingError(char_to_type) {
    this.elm_cursor.style.background = this.CURSOR_COLOR.false;
    this.elm_typing_container.style.border = "4px solid var(--color-error)";
    this.elm_text_to_type.style.color = "var(--color-error)";
    // Need to render our fake character (~) invisible again (because background color changed)
    if (char_to_type === ' ') {
      this.elm_cursor.style.color = this.CURSOR_COLOR.false;
    }
  }


}