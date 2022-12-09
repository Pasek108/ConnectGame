"use strict";class PipesGrid{constructor(t,e,i){this.unlockNextLevel=i,this.height=e.length,this.width=e[0].length,this.level=GlobalUtils.copyArray(PipesUtils.decodeLevel(e));for(let t=0;t<100;t++)this.shuffleLevel();this.container=document.querySelector(".grid"),this.container.innerHTML="",this.setGridSize(t),this.tiles=[];for(let t=0;t<this.height;t++){this.tiles.push([]);for(let e=0;e<this.width;e++)this.tiles[t].push(new PipesTile(this.level[t][e],(()=>this.tileClicked(t,e)))),this.container.appendChild(this.tiles[t][e].container)}for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++)if("d"===this.level[t][e][4]){const i=[`${t}${e}`];this.tiles[t][e].setConnected(PipesUtils.isConnectedToSource(t,e,this.level,i))}}setGridSize(t){this.container.className=`grid pipes size-${t}`,this.container.style.width=this.width*t+.1*(this.width-1)+"rem",this.container.style.height=this.height*t+.1*(this.height-1)+"rem",this.container.style.gridTemplateColumns=`repeat(${this.width}, ${t}rem)`,this.container.style.gridTemplateRows=`repeat(${this.height}, ${t}rem)`}shuffleLevel(){for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++){const i=GlobalUtils.randomInt(0,4);for(let s=0;s<i;s++)this.rotateConnections(t,e)}}rotateConnections(t,e){const i=this.level[t][e][3];for(let i=3;i>0;i--)this.level[t][e][i]=this.level[t][e][i-1];this.level[t][e][0]=i}tileClicked(t,e){this.rotateConnections(t,e);for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++)if("d"===this.level[t][e][4]){const i=[`${t}${e}`];this.tiles[t][e].setConnected(PipesUtils.isConnectedToSource(t,e,this.level,i))}PipesUtils.checkAllConnections(this.level)&&this.win()}win(){for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++)this.tiles[t][e].blockActions();this.unlockNextLevel()}}