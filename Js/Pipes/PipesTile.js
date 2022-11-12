"use strict";

class PipesTile {
  constructor(connections, onClick) {
    this.connections = [[], [], [], []];
    this.connections_array = connections;
    this.type = connections[4];
    this.onClick = onClick;
    this.rotation = 0;
    this.animation_timeout;

    this.container = document.createElement("div");
    this.container.className = "tile";
    this.container.appendChild(this.createBlock());
  }

  createBlock() {
    this.block = document.createElement("div");
    this.block.className = "block";

    this.mark = document.createElement("div");
    this.mark.className = "mark";

    for (let i = 0; i < 4; i++) {
      if (!this.connections_array[i]) continue;

      // prettier-ignore
      switch (i) {
        case 0: this.mark.appendChild(document.querySelector(".top-connection-template").content.children[0].cloneNode(true)); break;
        case 1: this.mark.appendChild(document.querySelector(".right-connection-template").content.children[0].cloneNode(true)); break;
        case 2: this.mark.appendChild(document.querySelector(".bottom-connection-template").content.children[0].cloneNode(true)); break;
        case 3: this.mark.appendChild(document.querySelector(".left-connection-template").content.children[0].cloneNode(true)); break;
      }
    }

    if (this.type === "s") this.mark.appendChild(document.querySelector(".source-template").content.children[0].cloneNode(true));
    else if (this.type === "d") this.mark.appendChild(document.querySelector(".destination-template").content.children[0].cloneNode(true));

    this.block.appendChild(this.mark);

    this.animation_timeout = setTimeout(() => {
      this.click_function = this.click.bind(this);
      this.block.addEventListener("click", this.click_function);
      this.block.style.animation = "none";
      this.mark.style.animation = "none";
    }, 500);

    return this.block;
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
