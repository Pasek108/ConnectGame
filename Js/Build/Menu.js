"use strict";class Menu extends View{constructor(){super(".menu"),View.addView(this,"menu",url),this.initOptions()}initOptions(){this.options=this.container.querySelectorAll(".menu-option");for(let e=0;e<this.options.length;e++)this.options[e].classList.contains("disabled")||this.options[e].addEventListener("click",(()=>this.openOption(e)))}openOption(e){this.hide(),e<6?(null!=this.levels&&this.levels.removeGameListeners(),this.levels=new Levels(this.options[e].dataset.mode),this.levels.show()):6===e&&(null!=this.editor_menu&&this.editor_menu.removeListeners(),this.editor_menu=new EditorMenu,this.editor_menu.show())}}