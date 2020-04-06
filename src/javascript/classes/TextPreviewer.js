

class TextPreviewer {



  constructor(elm_root, CHANGE_LENGTH) {
    this.elm_root = elm_root;
    this.CHANGE_LENGTH = CHANGE_LENGTH;
    this.current_text = '';
    this.cut_position = null;
    this.elm_minus = null;
    this.elm_plus = null;
    this.elm_start = null;
    this.eml_p = null;
  }


  setPreviewText(text = null) { 
    if (!text) { 
      this.elm_root.innerHTML = '';
      return;
    }
    window.localStorage.setItem('text_to_type', text);
    this.elm_start = document.createElement('a');
    this.elm_start.classList.add('form__buttonlaunch');
    this.elm_start.innerText = 'Démarrer';
    this.elm_start.addEventListener('click', () => {
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
    })
    const container = document.createElement('div');
    container.classList.add('text__container');
    const buttons = document.createElement('div');
    buttons.classList.add('text__buttons');
    this.elm_minus = document.createElement('a');
    this.elm_minus.innerText = "-";
    this.elm_minus.classList.add('text__button', 'enabled');
    this.elm_plus = document.createElement('a');
    this.elm_plus.innerText = "+";
    this.elm_plus.classList.add('text__button');
    buttons.appendChild(this.elm_minus);
    buttons.appendChild(this.elm_plus);
    this.elm_p = document.createElement('this.elm_p');
    this.elm_minus.addEventListener('click', () => {
      this.change_text_length(false, this.CHANGE_LENGTH);
    });
    this.elm_plus.addEventListener('click', () => {
      this.change_text_length(true, this.CHANGE_LENGTH);
    });
    container.appendChild(buttons);
    container.appendChild(this.elm_p);
    //---------------------------
    this.elm_p.classList.add('text__text');
    this.elm_p.innerHTML = text;
    this.current_text = this.elm_p.innerText;
    this.cut_position = this.current_text.length;
    this.elm_root.appendChild(this.elm_start);
    this.elm_root.appendChild(container);
  }


  change_text_length(direction) {
    // prevent click if buttons isn't enabled
    if (!direction && !this.elm_minus.classList.contains('enabled') ||
          direction && !this.elm_plus.classList.contains('enabled') 
    ) {
      return;
    }
    // minus click
    if (direction === false) {
      this.cut_position = this.cut_position - this.CHANGE_LENGTH;
      if (this.cut_position <= 0) {
        this.cut_position = 0;
        this.elm_minus.classList.remove('enabled');
        this.elm_start.classList.add('disabled');
      }
    }
    // plus click
    else {
      if (this.elm_start.classList.contains('disabled')) {
        this.elm_start.classList.remove('disabled');
      }
      this.cut_position = this.cut_position + this.CHANGE_LENGTH;
      if (this.cut_position >= this.current_text.length) {
        this.cut_position = this.current_text.length;
        this.elm_plus.classList.remove('enabled');
      }
    }
    this.elm_p.innerHTML = this.current_text.substring(
      0, this.cut_position);
    
    // enabling / disabling buttons
    if (this.cut_position > 0) {
      !this.elm_minus.classList.contains('enabled') ? this.elm_minus.classList.add('enabled') : '';
    }
    if (this.cut_position < this.current_text.length) {
      !this.elm_plus.classList.contains('enabled') ? this.elm_plus.classList.add('enabled') : '';
    }
  }
  


}

export { TextPreviewer };