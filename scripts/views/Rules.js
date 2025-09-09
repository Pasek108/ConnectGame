"use strict";

class Rules extends View {
    constructor(mode_name) {
      super(".rules");

      // init rules button to show rules
      this.rules_button = document.querySelector(".rules-button");
      this.rules_button.addEventListener("click", this.show.bind(this));

      // hide all rules
      this.all_rules = this.container.querySelectorAll(".wrapper > div");
      for (let i = 0; i < this.all_rules.length; i++) this.all_rules[i].classList.add("hidden");

      // make right rules visible 
      this.rules = this.container.querySelector(`.${mode_name}-rules`);
      this.rules.classList.remove("hidden");
  
      // init close button to hide rules
      this.rules_close_button = this.container.querySelector(".close");
      this.rules_close_button.addEventListener("click", this.hide.bind(this));
    }
  }