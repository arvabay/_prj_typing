import { getTime, getWordsByMinute, getErrorsPercent } from '../modules/helpers';

export default class TypingResult {

  constructor(elm_root, text) {
    this.text_length = text.length;
    this.elm_root = elm_root;
    this.elm_info_terms_number = elm_root.querySelector(".modalbox__infotermsnumber");
    this.elm_info_duration = elm_root.querySelector(".modalbox__infoduration");
    this.elm_info_speed = elm_root.querySelector(".modalbox__infospeed");
    this.elm_info_errors = elm_root.querySelector(".modalbox__infoerrors");
    this.total_terms = window.localStorage.getItem('terms_number') ?? text.split(' ').length;
    this.elm_info_terms_number.innerHTML = this.total_terms;
    this.duration = 0;
    this.duration_interval = null;
    this.startDuration();
    // this.debugProperties()
  }

  debugProperties() {
    let array = Object.getOwnPropertyNames(this);
    array.forEach( (entry) => {
      console.log( entry + " :",  this[entry]);
    });
  }

  startDuration() {
    this.duration_interval = setInterval( ()=>{ this.duration += 1 }, 1000 );
  }

  terminate(errors_number) {
    if (this.duration_interval) {
      // Info - duration
      clearInterval(this.duration_interval);
      this.elm_info_duration.innerHTML = getTime(this.duration);
      // Info - Words typed / mn
      const words_per_mn = getWordsByMinute(this.total_terms, this.duration);
      const string_end = words_per_mn === 1 ? " mot / mn" : " mots / mn"
      this.elm_info_speed.innerHTML = words_per_mn + string_end;
      // Info - Errors
      this.elm_info_errors.innerHTML = getErrorsPercent(errors_number, this.text_length) + " %";
    }
  }

}