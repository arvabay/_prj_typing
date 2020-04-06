
class TypingOverview {


  constructor(elm_prev, elm_curr, elm_error) {
    this.elm_prev = elm_prev;
    this.elm_curr = elm_curr;
    this.elm_error = elm_error;
  }

  getCurrentText() {
    return this.elm_curr.innerText;
  }

  setCurrentHTML(text) {
    this.elm_curr.innerHTML = text;
    // Last character space prevention.
    if ( this.getCurrentText().substring(text.length-1, text.length) === " " ) {
      this.setCurrentText(text.substring(0, text.length - 1));
    }
  }

  setCurrentText(text) {
    this.elm_curr.innerText = text;
  }

  colorize(success) {
    // Is keyPressed correct ?
    if (success) {
      // Is there something in the transitionnal-error text block ?
      this.elm_error.innerText === '' ? this.moveChar(this.elm_curr, this.elm_prev) : 
                                        this.moveChar(this.elm_error, this.elm_prev);
    } else {
      this.elm_error.innerText === '' ? this.moveChar(this.elm_curr, this.elm_error) : 
                                        '';
    }
  }

  moveChar(elm_origin, elm_target) {
    const text = elm_origin.innerText;
    let char = text.substring(0, 1);
    if (elm_target === this.elm_prev) {
      const class_name = elm_origin === this.elm_curr ? "color-success" : "color-error";
      char = `<span class='${class_name}'>${char}</span>`;
    }
    elm_target.innerHTML = elm_target.innerHTML + char;
    elm_origin.innerHTML = text.substring(1, text.length);
  }

  
}

export { TypingOverview };
