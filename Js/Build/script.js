"use strict";const url=location.href;function historyBack(e){const s=Object.keys(View.views);for(let e=0;e<s.length;e++)null!=View.views[s[e]]&&View.views[s[e]].hide();null==View.views[e.state.view_name]?View.views.menu.show():View.views[e.state.view_name].show()}if(addEventListener("popstate",historyBack),null==localStorage.getItem("completed_levels")){const e={bridges:0,pipes:0,sliders:0,easy:0,normal:0,hard:0};localStorage.setItem("completed_levels",JSON.stringify(e))}const language=new Language,background=new Background,menu=new Menu;