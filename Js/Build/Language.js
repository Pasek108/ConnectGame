"use strict";class Language{constructor(){this.lang=localStorage.getItem("lang")??"en",this.set(this.lang);document.querySelector(".lang").addEventListener("click",this.switchLang.bind(this))}set(t){this.lang=t,localStorage.setItem("lang",t),document.body.lang=this.lang}switchLang(){switch(this.lang){case"pl":this.set("en");break;case"en":this.set("pl")}}}