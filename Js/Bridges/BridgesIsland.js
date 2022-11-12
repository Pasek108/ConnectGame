"use strict";

class BridgesIsland {
  constructor(value, editor_onclick, editor_value_change) {
    this.container = document.createElement("div");
    this.container.className = "island";

    this.island = document.createElement("span");
    this.island.innerText = value;
    this.container.appendChild(this.island);

    this.top_bridge = document.createElement("div");
    this.top_bridge.className = "top-bridge";
    this.container.appendChild(this.top_bridge);

    this.left_bridge = document.createElement("div");
    this.left_bridge.className = "left-bridge";
    this.container.appendChild(this.left_bridge);

    this.adjacent_islands = [null, null, null, null];
    this.connections = [0, 0, 0, 0];
    this.value = value;
    this.correct = false;

    /* --------- for editor --------- */
    this.is_editor = false;
    this.active = true;
    this.just_activated = false;

    if (value === 0) {
      this.editor_onclick = editor_onclick;
      this.editor_value_change = editor_value_change;
      this.deactivate();

      this.island.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        if (this.active) this.deactivate();
        else this.activate();

        this.editor_onclick();
      });
    }
  }

  focus() {
    this.container.classList.add("focus");
  }

  unfocus() {
    this.container.classList.remove("focus");
  }

  getPosition() {
    return this.container.getBoundingClientRect();
  }

  addAdjacentIslands(adjacent_islands, startBridge) {
    this.startBridge = startBridge;
    this.adjacent_islands = adjacent_islands;

    this.blockActions();
    this.bridgeStart = this.onMouseDown.bind(this);
    this.container.addEventListener("mousedown", this.bridgeStart);
    this.container.addEventListener("touchstart", this.bridgeStart);
  }

  onMouseDown() {
    this.focus();
    this.startBridge(this, this.adjacent_islands);
  }

  blockActions() {
    this.container.removeEventListener("mousedown", this.bridgeStart);
    this.container.removeEventListener("touchstart", this.bridgeStart);
  }

  checkConnections() {
    const connections = this.connections.reduce((prev, current) => prev + current);

    if (connections === this.value) {
      this.container.classList.remove("wrong");
      this.container.classList.add("correct");
      this.correct = true;
    } else if (connections > this.value) {
      this.container.classList.remove("correct");
      this.container.classList.add("wrong");
      this.correct = false;
    } else {
      this.container.classList.remove("wrong");
      this.container.classList.remove("correct");
      this.correct = false;
    }
  }

  changeConnection(side) {
    this.connections[side] = (this.connections[side] + 1) % 3;

    if (this.is_editor) this.updateValue();
    else this.checkConnections();
  }

  addBridgeTop() {
    this.changeConnection(0);

    const bridge = document.createElement("div");
    bridge.className = `bridge vertical type${this.connections[0]}`;
    this.top_bridge.innerHTML = "";
    this.top_bridge.appendChild(bridge);

    this.dehilightTop();
  }

  addBridgeLeft() {
    this.changeConnection(3);

    const bridge = document.createElement("div");
    bridge.className = `bridge horizontal type${this.connections[3]}`;
    this.left_bridge.innerHTML = "";
    this.left_bridge.appendChild(bridge);

    this.dehilightLeft();
  }

  setTopBridgeSize(target_position) {
    this.top_bridge.style.height = `${this.getPosition().top - target_position.top}px`;
  }

  setLeftBridgeSize(target_position) {
    this.left_bridge.style.width = `${this.getPosition().left - target_position.left}px`;
  }

  hilightTop() {
    this.left_bridge.classList.remove("focus");
    this.top_bridge.classList.add("focus");
  }

  dehilightTop() {
    this.top_bridge.classList.remove("focus");
  }

  hilightLeft() {
    this.top_bridge.classList.remove("focus");
    this.left_bridge.classList.add("focus");
  }

  dehilightLeft() {
    this.left_bridge.classList.remove("focus");
  }

  /* ----------------------- editor only ----------------------- */

  resetAdjacentConnections() {
    this.just_activated = false;

    for (let i = 0; i < 4; i++) {
      if (this.adjacent_islands[i] == null) continue;

      this.adjacent_islands[i].connections[(i + 2) % 4] = 0;
      this.adjacent_islands[i].updateValue();

      // prettier-ignore
      switch (i) {
        case 0: this.top_bridge.innerHTML = ""; break;
        case 1: this.adjacent_islands[i].left_bridge.innerHTML = ""; break;
        case 2: this.adjacent_islands[i].top_bridge.innerHTML = ""; break;
        case 3: this.left_bridge.innerHTML = ""; break;
      }
    }
  }

  updateValue() {
    this.value = this.connections.reduce((prev, current) => prev + current);
    this.island.innerText = this.value;
    this.editor_value_change(this.value);
  }

  activate() {
    this.active = true;
    this.container.classList.remove("disabled");

    this.just_activated = true;
  }

  deactivate() {
    this.active = false;
    this.container.classList.add("disabled");

    this.correct = false;
    this.is_editor = true;
    this.connections = [0, 0, 0, 0];
    this.value = 0;

    this.container.querySelector("span").innerText = this.value;
    this.resetAdjacentConnections();
    this.adjacent_islands = [null, null, null, null];
    this.startBridge = () => {};
  }
}
