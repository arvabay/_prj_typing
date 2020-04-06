

class TypingMain {


  constructor(elm_text_to_type, elm_cursor, elm_typing_container, CURSOR_COLOR) {
    this.elm_text_to_type = elm_text_to_type;
    this.elm_cursor = elm_cursor;
    this.elm_typing_container = elm_typing_container;
    this.CURSOR_COLOR = CURSOR_COLOR;
  }


  typingSuccess(text) {
    let char_to_type = text.substring(0,1); 
    this.elm_cursor.style.background = this.CURSOR_COLOR.true;
    this.elm_typing_container.style.border = "4px solid var(--color-main)";
    this.elm_text_to_type.style.color = "var(--color-main)";
    // Security, we don't want to block mechanism in case of unexpected character
    if (isNaN(char_to_type.charCodeAt(0)) || char_to_type.charCodeAt(0) === 160 ) {
      // console.warn('nan encountered');
      char_to_type = ' ';
    }
    // Need to keep the right dimension of div cursor.
    // Let's fill it with an invisible char
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


  typingError(char_to_type) {
    this.elm_cursor.style.background = this.CURSOR_COLOR.false;
    this.elm_typing_container.style.border = "4px solid var(--color-error)";
    this.elm_text_to_type.style.color = "var(--color-error)";
    // Need to render fake character invisible again (because background color changed)
    if (char_to_type === ' ') {
      this.elm_cursor.style.color = this.CURSOR_COLOR.false;
    }
  }


}

export { TypingMain };