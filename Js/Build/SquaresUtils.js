"use strict";class SquaresUtils{static horizontal_move_mark_template=document.querySelector(".horizontal-move-mark-template").content.children[0];static vertical_move_mark_template=document.querySelector(".vertical-move-mark-template").content.children[0];static rotate_mark_template=document.querySelector(".rotate-mark-template").content.children[0];static no_move_mark_template=document.querySelector(".no-move-mark-template").content.children[0];constructor(){}static decodeLevel(e){const t=e.length,a=e[0].length,n=GlobalUtils.copyArray(e),o=[125,25,5,1];for(let l=0;l<t;l++)for(let t=0;t<a;t++){let a=[0,0,0,0,e[l][t][1]];for(;n[l][t][0]>0;)for(let e=0;e<4;e++)if(n[l][t][0]-o[e]>=0){n[l][t][0]-=o[e],a[e]++;break}n[l][t]=a}return n}static encodeLevel(e){const t=e.length,a=e[0].length,n=[125,25,5,1],o=GlobalUtils.copyArray(e);for(let l=0;l<t;l++)for(let t=0;t<a;t++){let a=[0,e[l][t][4]];for(let o=0;o<4;o++)a[0]+=e[l][t][o]*n[o];o[l][t]=a}return o}static createEmptyLevelArray(e,t){const a=[];for(let n=0;n<t;n++){a.push([]);for(let t=0;t<e;t++)a[n].push([0,0,0,0,"n"])}return a}static generateNewLevel(e,t){let a=this.createEmptyLevelArray(e,t),n=[GlobalUtils.randomInt(0,t-1),GlobalUtils.randomInt(0,e-1)];for(let o=0;o<e*t*2;o++){const o=GlobalUtils.randomInt(0,3),l=GlobalUtils.randomInt(0,7),r=GlobalUtils.randomInt(1,4),i=[-1,1,1,-1],c=[t,e];switch(n[o%2]+i[o]<0&&(n[o%2]+=1),n[o%2]+i[o]>=c[o%2]&&(n[o%2]-=1),a[n[0]][n[1]][o]=r,n[o%2]+=i[o],a[n[0]][n[1]][(o+2)%4]=r,l){case 0:a[n[0]][n[1]][4]="n";break;case 1:a[n[0]][n[1]][4]="r";break;case 2:a[n[0]][n[1]][4]="h";break;case 3:a[n[0]][n[1]][4]="v";break;case 4:a[n[0]][n[1]][4]="vr";break;case 5:a[n[0]][n[1]][4]="hr";break;case 6:a[n[0]][n[1]][4]="vh";break;case 7:a[n[0]][n[1]][4]="vhr"}}return a}static createBlock(e,t=[0,0,0,0],a=!1){const n=GlobalUtils.createNewDOM("div",`block ${e[4]}`),o=GlobalUtils.createNewDOM("div","shadow");n.appendChild(o);const l=GlobalUtils.createNewDOM("div","mark"),r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 100 100");for(let t=0;t<e[4].length;t++)switch(e[4][t]){case"h":r.appendChild(this.horizontal_move_mark_template.cloneNode(!0));break;case"v":r.appendChild(this.vertical_move_mark_template.cloneNode(!0));break;case"r":r.appendChild(this.rotate_mark_template.cloneNode(!0));break;case"n":r.appendChild(this.no_move_mark_template.cloneNode(!0))}l.appendChild(r),n.appendChild(l);const i=GlobalUtils.createNewDOM("div","connections");return i.appendChild(this.createConnections("top",e[0],t[0],a)),i.appendChild(this.createConnections("right",e[1],t[1],a)),i.appendChild(this.createConnections("bottom",e[2],t[2],a)),i.appendChild(this.createConnections("left",e[3],t[3],a)),n.appendChild(i),a?(n.style.animation="none",o.style.animation="none",l.style.animation="none"):setTimeout((()=>{n.style.animation="none",o.style.animation="none",l.style.animation="none"}),2e3),n}static createConnections(e,t,a,n=!1){const o=GlobalUtils.createNewDOM("div",e);n?o.style.animation="none":setTimeout((()=>o.style.animation="none"),2e3),e=e[0].toUpperCase()+e.slice(1);for(let n=0;n<t;n++){const t=GlobalUtils.createNewDOM("div","connection");o.appendChild(t),a&&(t.style[`border${e}Width`]="0px")}return o}}