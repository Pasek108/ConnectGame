"use strict";

class Language {
  constructor() {
    this.lang = localStorage.getItem("lang") ?? "en";
    this.set(this.lang);

    const lang_button = document.querySelector(".lang");
    lang_button.addEventListener("click", this.switchLang.bind(this));
  }
  
  set(lang) {
    this.lang = lang;
    localStorage.setItem("lang", lang);
    document.body.lang = this.lang;
  }

  switchLang() {
    // prettier-ignore
    switch (this.lang) {
        case "pl": this.set("en"); break;
        case "en": this.set("pl"); break;
      }
  }
}
