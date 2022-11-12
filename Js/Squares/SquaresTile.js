"use strict";

class SquaresTile {
  constructor(connections, correct_connections, onClick, onPositionChange) {
    this.connections = [[], [], [], []];
    this.connections_array = connections;
    this.correct_connections = correct_connections;
    this.type = connections[4];
    this.onClick = onClick;
    this.onPositionChange = onPositionChange;
    this.rotation = 0;
    this.grabbed = false;
    this.pos_x = 0;
    this.pos_y = 0;
    this.animation_timeout;

    this.no_connections = true;
    for (let i = 0; i < 4; i++) {
      if (this.connections_array[i] != 0) {
        this.no_connections = false;
        break;
      }
    }

    this.container = document.createElement("div");
    this.container.className = "tile";
    if (!this.no_connections) this.container.appendChild(this.createBlock());
  }

  createBlock() {
    this.block = document.createElement("div");
    this.block.className = `block ${this.type}`;

    this.shadow = document.createElement("div");
    this.shadow.className = "shadow";
    this.block.appendChild(this.shadow);

    this.mark = document.createElement("div");
    this.mark.className = "mark";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");

    for (let i = 0; i < this.type.length; i++) {
      // prettier-ignore
      switch (this.type[i]) {
        case "h": svg.appendChild(document.querySelector(".horizontal-move-mark-template").content.children[0].cloneNode(true)); break;
        case "v": svg.appendChild(document.querySelector(".vertical-move-mark-template").content.children[0].cloneNode(true)); break;
        case "r": svg.appendChild(document.querySelector(".rotate-mark-template").content.children[0].cloneNode(true)); break;
        case "n": svg.appendChild(document.querySelector(".no-move-mark-template").content.children[0].cloneNode(true)); break;
      }
    }

    this.mark.appendChild(svg);
    this.block.appendChild(this.mark);

    this.connections_container = document.createElement("div");
    this.connections_container.className = "connections";

    const top = this.createConnections("top", 0);
    this.connections_container.appendChild(top.container);

    const right = this.createConnections("right", 1);
    this.connections_container.appendChild(right.container);

    const bottom = this.createConnections("bottom", 2);
    this.connections_container.appendChild(bottom.container);

    const left = this.createConnections("left", 3);
    this.connections_container.appendChild(left.container);

    this.block.appendChild(this.connections_container);

    this.connections = [top.connections, right.connections, bottom.connections, left.connections];
    this.animation_timeout = setTimeout(() => {
      this.grab_function = this.grab.bind(this);
      this.move_function = this.move.bind(this);
      this.release_function = this.release.bind(this);
      this.block.addEventListener("mousedown", this.grab_function);
      this.block.addEventListener("touchstart", this.grab_function);
      this.block.style.animation = "none";
      this.shadow.style.animation = "none";
      this.mark.style.animation = "none";
      top.container.style.animation = "none";
      right.container.style.animation = "none";
      bottom.container.style.animation = "none";
      left.container.style.animation = "none";
    }, 2000);

    return this.block;
  }

  createConnections(side, index) {
    const connections_container = document.createElement("div");
    connections_container.className = side;

    const connections_array = [];
    for (let i = 0; i < this.connections_array[index]; i++) {
      const connection = document.createElement("div");
      connection.className = "connection";

      if (this.correct_connections[index]) {
        // prettier-ignore
        switch (index) {
          case 0: connection.style.borderTopWidth = "0px"; break;
          case 1: connection.style.borderRightWidth = "0px"; break;
          case 2: connection.style.borderBottomWidth = "0px"; break;
          case 3: connection.style.borderLeftWidth = "0px"; break;
        }
      }
      connections_array.push(connection);
      connections_container.appendChild(connection);
    }

    return { container: connections_container, connections: connections_array };
  }

  setConnections(connections, correct_connections) {
    this.connections_array = connections;
    this.correct_connections = correct_connections;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < this.connections[i].length; j++) {
        const is_connection_correct = correct_connections[(i + this.rotation) % 4];

        // prettier-ignore
        switch (i) {
          case 0: this.connections[i][j].style.borderTopWidth = is_connection_correct ? "0px" : null; break;
          case 1: this.connections[i][j].style.borderRightWidth = is_connection_correct ? "0px" : null; break;
          case 2: this.connections[i][j].style.borderBottomWidth = is_connection_correct ? "0px" : null; break;
          case 3: this.connections[i][j].style.borderLeftWidth = is_connection_correct ? "0px" : null; break;
        }
      }
    }
  }

  setFunctions(onClick, onPositionChange) {
    this.onClick = onClick;
    this.onPositionChange = onPositionChange;
  }

  click() {
    this.block.style.zIndex = null;

    if (!this.type.includes("r")) return;

    this.rotation++;
    this.block.style.transform = `rotate(${90 * this.rotation}deg)`;
    this.mark.style.transform = `rotate(${-90 * this.rotation}deg)`;

    // prettier-ignore
    switch (this.rotation % 4) {
      case 0: this.shadow.style.transform = `translate(0, 0.2rem)`; break;
      case 1: this.shadow.style.transform = `translate(0.2rem, 0)`; break;
      case 2: this.shadow.style.transform = `translate(0, -0.2rem)`; break;
      case 3: this.shadow.style.transform = `translate(-0.2rem, 0)`; break;
    }

    this.onClick();
  }

  grab(e) {
    const touches = e.changedTouches;
    if (touches == null && e.button !== 0) return;

    let positions = [0, 0];

    if (touches == null) positions = [e.pageY, e.pageX];
    else positions = [touches[0].pageY, touches[0].pageX];

    clearTimeout(this.animation_timeout);
    this.old_x = positions[1];
    this.old_y = positions[0];
    this.grabbed = true;
    this.block.style.zIndex = "10";
    this.block.style.transition = "transform 0.25s linear";

    window.addEventListener("mousemove", this.move_function);
    window.addEventListener('touchmove', this.move_function);
    window.addEventListener("mouseup", this.release_function);
    window.addEventListener("touchend", this.release_function);
  }

  move(e) {
    if (!this.grabbed) return;

    const touches = e.changedTouches;
    let positions = [0, 0];

    if (touches == null) positions = [e.pageY, e.pageX];
    else positions = [touches[0].pageY, touches[0].pageX];

    this.pos_x = positions[1] - this.old_x;
    this.pos_y = positions[0] - this.old_y;
    if (!this.type.includes("h")) this.pos_x = 0;
    if (!this.type.includes("v")) this.pos_y = 0;
    this.block.style.left = `${this.pos_x}px`;
    this.block.style.top = `${this.pos_y}px`;
  }

  release(e) {
    const touches = e.changedTouches;
    if (touches == null && e.button !== 0) return;

    window.removeEventListener("mousemove", this.move_function);
    window.removeEventListener("touchmove", this.move_function);
    window.removeEventListener("mouseup", this.release_function);
    window.removeEventListener("touchend", this.release_function);

    if (this.pos_x === 0 && this.pos_y === 0) this.click();
    else {
      const half_size = this.container.offsetWidth / 2;
      let new_x = (this.pos_x - (this.pos_x % half_size)) / half_size;
      let new_y = (this.pos_y - (this.pos_y % half_size)) / half_size;
      if (!(new_x < 1 && new_x > -1 && new_y < 1 && new_y > -1)) this.onPositionChange(new_x, new_y);

      this.grabbed = false;
      this.pos_x = 0;
      this.pos_y = 0;
      this.block.style.left = `${this.pos_x}px`;
      this.block.style.top = `${this.pos_y}px`;

      this.animation_timeout = setTimeout(() => (this.block.style.zIndex = null), 500);
      this.block.style.transition = null;
    }
  }

  blockActions() {
    window.removeEventListener("mousemove", this.move_function);
    window.removeEventListener("touchmove", this.move_function);
    window.removeEventListener("mouseup", this.release_function);
    window.removeEventListener("touchend", this.release_function);
    if (!this.no_connections) this.block.removeEventListener("mousedown", this.grab_function);
  }
}
