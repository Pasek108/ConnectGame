"use strict";class PipesEditor extends Editor{constructor(){super("pipes"),this.type_input=this.container.querySelector(".type select"),this.type_input.addEventListener("input",this.changePreviewType.bind(this));for(let e=0;e<this.previews.length;e++)this.previews[e].addEventListener("click",(()=>this.rotatePreviewBlock(this.previews[e])))}load(){super.load(),this.resetPreview()}generateLevel(){this.level=PipesUtils.generateNewLevel(this.grid_size,this.grid_size);for(let e=0;e<this.grid_size;e++)for(let t=0;t<this.grid_size;t++){const i=PipesUtils.createBlock(this.level[e][t],!0);this.tiles[e][t].dataset.data=this.level[e][t].join(";"),this.tiles[e][t].innerHTML="",this.tiles[e][t].appendChild(i)}}changePreviewType(){const e=this.type_input.value;for(let t=0;t<this.previews.length;t++){"c"===e?this.previews[t].style.display="flex":"d"===e?(this.previews[t].style.display="none",1===t&&(this.previews[t].style.display="flex")):"s"===e&&(this.previews[t].style.display="flex",0===t&&(this.previews[t].style.display="none"));const i=this.previews[t].dataset.data.split(";");i[4]=e,this.previews[t].dataset.data=i.join(";"),this.previews[t].innerHTML="";const s=PipesUtils.createBlock([+i[0],+i[1],+i[2],+i[3],i[4]],!0);this.previews[t].appendChild(s)}}rotatePreviewBlock(e){const t=e.dataset.data.split(";"),i=t[0];t[0]=t[3],t[3]=t[2],t[2]=t[1],t[1]=i,e.dataset.data=t.join(";"),e.innerHTML="";const s=PipesUtils.createBlock([+t[0],+t[1],+t[2],+t[3],t[4]],!0);e.appendChild(s)}resetPreview(){this.type_input.value="c",this.changePreviewType()}}