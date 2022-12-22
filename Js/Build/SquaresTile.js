"use strict";class SquaresTile{constructor(t,e,s,o){this.connections=[[],[],[],[]],this.connections_array=t,this.correct_connections=e,this.type=t[4],this.onClick=s,this.onPositionChange=o,this.rotation=0,this.grabbed=!1,this.pos_x=0,this.pos_y=0,this.animation_timeout,this.no_connections=!0;for(let t=0;t<4;t++)if(0!=this.connections_array[t]){this.no_connections=!1;break}this.container=GlobalUtils.createNewDOM("div","tile"),this.no_connections||this.container.appendChild(this.createBlock()),this.grab_function=this.grab.bind(this),this.move_function=this.move.bind(this),this.release_function=this.release.bind(this)}createBlock(){this.block=SquaresUtils.createBlock(this.connections_array,this.correct_connections),this.shadow=this.block.querySelector(".shadow"),this.mark=this.block.querySelector(".mark");const t=this.block.querySelectorAll(".top .connection"),e=this.block.querySelectorAll(".right .connection"),s=this.block.querySelectorAll(".bottom .connection"),o=this.block.querySelectorAll(".left .connection");return this.connections=[t,e,s,o],setTimeout((()=>{this.block.addEventListener("mousedown",this.grab_function),this.block.addEventListener("touchstart",this.grab_function)}),2e3),this.block}setConnections(t,e){this.connections_array=t,this.correct_connections=e;for(let t=0;t<4;t++)for(let s=0;s<this.connections[t].length;s++){const o=e[(t+this.rotation)%4];switch(t){case 0:this.connections[t][s].style.borderTopWidth=o?"0px":null;break;case 1:this.connections[t][s].style.borderRightWidth=o?"0px":null;break;case 2:this.connections[t][s].style.borderBottomWidth=o?"0px":null;break;case 3:this.connections[t][s].style.borderLeftWidth=o?"0px":null}}}setFunctions(t,e){this.onClick=t,this.onPositionChange=e}click(){if(this.block.style.zIndex=null,this.type.includes("r")){switch(this.rotation++,this.block.style.transform=`rotate(${90*this.rotation}deg)`,this.mark.style.transform=`rotate(${-90*this.rotation}deg)`,this.rotation%4){case 0:this.shadow.style.transform="translate(0, 0.2rem)";break;case 1:this.shadow.style.transform="translate(0.2rem, 0)";break;case 2:this.shadow.style.transform="translate(0, -0.2rem)";break;case 3:this.shadow.style.transform="translate(-0.2rem, 0)"}this.onClick()}}grab(t){const e=t.changedTouches;if(null==e&&0!==t.button)return;let s=[0,0];s=null==e?[t.pageY,t.pageX]:[e[0].pageY,e[0].pageX],clearTimeout(this.animation_timeout),this.old_x=s[1],this.old_y=s[0],this.grabbed=!0,this.block.style.zIndex="10",this.block.style.transition="transform 0.25s linear",window.addEventListener("mousemove",this.move_function),window.addEventListener("touchmove",this.move_function),window.addEventListener("mouseup",this.release_function),window.addEventListener("touchend",this.release_function)}move(t){if(!this.grabbed)return;const e=t.changedTouches;let s=[0,0];s=null==e?[t.pageY,t.pageX]:[e[0].pageY,e[0].pageX],this.pos_x=s[1]-this.old_x,this.pos_y=s[0]-this.old_y,this.type.includes("h")||(this.pos_x=0),this.type.includes("v")||(this.pos_y=0),this.block.style.left=`${this.pos_x}px`,this.block.style.top=`${this.pos_y}px`}release(t){const e=t.changedTouches;if(null!=e||0===t.button)if(window.removeEventListener("mousemove",this.move_function),window.removeEventListener("touchmove",this.move_function),window.removeEventListener("mouseup",this.release_function),window.removeEventListener("touchend",this.release_function),this.pos_x>0||this.pos_y>0||null!=e){const t=this.container.offsetWidth/2;let e=(this.pos_x-this.pos_x%t)/t,s=(this.pos_y-this.pos_y%t)/t;e<1&&e>-1&&s<1&&s>-1||this.onPositionChange(e,s),this.grabbed=!1,this.pos_x=0,this.pos_y=0,this.block.style.left=`${this.pos_x}px`,this.block.style.top=`${this.pos_y}px`,this.animation_timeout=setTimeout((()=>this.block.style.zIndex=null),500),this.block.style.transition=null}else this.click()}blockActions(){window.removeEventListener("mousemove",this.move_function),window.removeEventListener("touchmove",this.move_function),window.removeEventListener("mouseup",this.release_function),window.removeEventListener("touchend",this.release_function),this.no_connections||this.block.removeEventListener("mousedown",this.grab_function)}}