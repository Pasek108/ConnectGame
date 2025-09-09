"use strict";

class PipesTile {
  constructor(connections, onClick = null) {
    this.connections = connections;
    this.type = connections[4];
    this.onClick = onClick;
    this.rotation = 0;

    this.container = GlobalUtils.createNewDOM("div", "tile");
    this.block = PipesUtils.createBlock(connections);
    this.mark = this.block.querySelector(".mark");
    this.container.appendChild(this.block);

    if (onClick != null) {
      this.click_function = this.click.bind(this);
      setTimeout(() => this.block.addEventListener("click", this.click_function), 500);
    } 
  }

  click() {
    this.rotation++;
    this.mark.style.transform = `rotate(${90 * this.rotation}deg)`;

    this.onClick();
  }

  setConnected(is_connected) {
    if (this.type !== "d") return;

    if (is_connected) this.block.className = "block connected";
    else this.block.className = "block";
  }

  blockActions() {
    this.block.removeEventListener("click", this.click_function);
  }
}
