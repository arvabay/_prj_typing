
class TypingMain {

  constructor(elm_text_to_type, elm_cursor, elm_typing_container, text, CURSOR_COLOR, TEXT_TO_TYPE_LGTH) {
    this.elm_text_to_type = elm_text_to_type;
    this.elm_cursor = elm_cursor;
    this.elm_typing_container = elm_typing_container;
    this.text = text;
    this.CURSOR_COLOR = CURSOR_COLOR;
    this.TEXT_TO_TYPE_LGTH = TEXT_TO_TYPE_LGTH;
  }

  setText(offset, char_to_type) {
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
    // console.log('char to type : ' + char_to_type + ' (code : ' + char_to_type.charCodeAt(0) + ')');
    this.elm_text_to_type.innerHTML = this.text.substring(offset + 1, offset + this.TEXT_TO_TYPE_LGTH);
  }

  errorTyping(char_to_type) {
    this.elm_cursor.style.background = this.CURSOR_COLOR.false;
    this.elm_typing_container.style.border = "4px solid var(--color-error)";
    this.elm_text_to_type.style.color = "var(--color-error)";
    // Need to render fake character invisible
    if (char_to_type === ' ') {
      this.elm_cursor.style.color = this.CURSOR_COLOR.false;
    }
  }

}


export { TypingMain };