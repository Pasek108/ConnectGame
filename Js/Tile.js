"use strict";

class SquareTile {
  constructor(parent, connections, correct_connections, onClick, onPositionChange) {
    this.parent = parent;
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
    if (!this.no_connections) this.container.appendChild(this.createObject());
    this.parent.appendChild(this.container);
  }

  addNoMoveMark(svg) {
    const circle_top_left = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle_top_left.setAttribute("cx", "11");
    circle_top_left.setAttribute("cy", "11");
    circle_top_left.setAttribute("r", "11");
    svg.appendChild(circle_top_left);

    const circle_top_right = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle_top_right.setAttribute("cx", "89");
    circle_top_right.setAttribute("cy", "11");
    circle_top_right.setAttribute("r", "11");
    svg.appendChild(circle_top_right);

    const circle_bottom_right = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle_bottom_right.setAttribute("cx", "89");
    circle_bottom_right.setAttribute("cy", "89");
    circle_bottom_right.setAttribute("r", "11");
    svg.appendChild(circle_bottom_right);

    const circle_bottom_left = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle_bottom_left.setAttribute("cx", "11");
    circle_bottom_left.setAttribute("cy", "89");
    circle_bottom_left.setAttribute("r", "11");
    svg.appendChild(circle_bottom_left);
  }

  addRotateMark(svg) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "15");
    svg.appendChild(circle);
  }

  addHorizontalMark(svg) {
    const horizonatl_line = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    horizonatl_line.setAttribute("x", "15");
    horizonatl_line.setAttribute("y", "43");
    horizonatl_line.setAttribute("width", "70");
    horizonatl_line.setAttribute("height", "14");
    svg.appendChild(horizonatl_line);

    const triangle_left = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    triangle_left.setAttribute("points", "6 50, 19 61, 19 39");
    svg.appendChild(triangle_left);

    const triangle_right = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    triangle_right.setAttribute("points", "94 50, 81 61, 81 39");
    svg.appendChild(triangle_right);
  }

  addVerticalMark(svg) {
    const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect2.setAttribute("x", "43");
    rect2.setAttribute("y", "15");
    rect2.setAttribute("width", "14");
    rect2.setAttribute("height", "70");
    svg.appendChild(rect2);

    const triangle_top = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    triangle_top.setAttribute("points", "50 6, 61 19, 39 19");
    svg.appendChild(triangle_top);

    const triangle_bottom = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    triangle_bottom.setAttribute("points", "50 94, 61 81, 39 81");
    svg.appendChild(triangle_bottom);
  }

  createObject() {
    this.object = document.createElement("div");
    this.object.className = `object ${this.type}`;

      this.shadow = document.createElement("div");
      this.shadow.className = "shadow";
      this.object.appendChild(this.shadow);

      this.mark = document.createElement("div");
      this.mark.className = "mark";
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");;
        this.svg.setAttribute("viewBox", "0 0 100 100");
        
        for (let i = 0; i < this.type.length; i++) {
          switch (this.type[i]) {
            case "h": this.addHorizontalMark(this.svg); break;
            case "v": this.addVerticalMark(this.svg); break;
            case "r": this.addRotateMark(this.svg); break;
            case "n": this.addNoMoveMark(this.svg); break;
          }
        }
          
        this.mark.appendChild(this.svg);
      this.object.appendChild(this.mark);

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

      this.object.appendChild(this.connections_container);
    
    this.connections = [top.connections, right.connections, bottom.connections, left.connections];
    this.animation_timeout = setTimeout(()=>{
      this.grab_function = this.grab.bind(this);
      this.move_function = this.move.bind(this);
      this.release_function = this.release.bind(this);
      this.object.addEventListener("mousedown", this.grab_function);
      this.object.style.animation = "none";
      this.shadow.style.animation = "none";
      this.mark.style.animation = "none";
      top.container.style.animation = "none";
      right.container.style.animation = "none";
      bottom.container.style.animation = "none";
      left.container.style.animation = "none";
    }, 2000);
    
    return this.object;
  }

  createConnections(side, index) {
    const connections_container = document.createElement("div");
    connections_container.className = side;

    const connections_array = [];
    for (let i = 0; i < this.connections_array[index]; i++) {
      const connection = document.createElement("div");
      connection.className = "connection";

      if (this.correct_connections[index]) {
        switch(index) {
          case 0: connection.style.borderTopWidth = "0px"; break;
          case 1: connection.style.borderRightWidth = "0px"; break;
          case 2: connection.style.borderBottomWidth = "0px"; break;
          case 3: connection.style.borderLeftWidth = "0px"; break;
        }
      }
      connections_array.push(connection);
      connections_container.appendChild(connection);
    }
    
    return {container: connections_container, connections: connections_array};
  }

  setConnections(connections, correct_connections) {
    this.connections_array = connections;
    this.correct_connections = correct_connections;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < this.connections[i].length; j++) {
        const is_connection_correct = correct_connections[(i + this.rotation) % 4];
        switch(i) {
          case 0: this.connections[i][j].style.borderTopWidth = (is_connection_correct) ? "0px" : null; break;
          case 1: this.connections[i][j].style.borderRightWidth = (is_connection_correct) ? "0px" : null; break;
          case 2: this.connections[i][j].style.borderBottomWidth = (is_connection_correct) ? "0px" : null; break;
          case 3: this.connections[i][j].style.borderLeftWidth = (is_connection_correct) ? "0px" : null; break;
        }
      }
    }
  }

  setFunctions(onClick, onPositionChange) {
    this.onClick = onClick;
    this.onPositionChange = onPositionChange;
  }

  click() {
    this.object.style.zIndex = null;

    if (!this.type.includes("r")) return;

    this.rotation++;
    this.object.style.transform = `rotate(${90 * this.rotation}deg)`;
    this.mark.style.transform = `rotate(${-90 * this.rotation}deg)`;

    switch (this.rotation % 4) {
      case 0: this.shadow.style.transform = `translate(0, 0.2rem)`; break;
      case 1: this.shadow.style.transform = `translate(0.2rem, 0)`; break;
      case 2: this.shadow.style.transform = `translate(0, -0.2rem)`; break;
      case 3: this.shadow.style.transform = `translate(-0.2rem, 0)`; break;
    }
    
    this.onClick();
  }

  grab(e) {
    if (e.button !== 0) return;

    clearTimeout(this.animation_timeout);
    this.old_x = e.pageX;
    this.old_y = e.pageY;
    this.grabbed = true;
    this.object.style.zIndex = "10";
    this.object.style.transition = "transform 0.25s linear";

    addEventListener("mousemove", this.move_function);
    addEventListener("mouseup", this.release_function);
  }

  move(e) {
    if (!this.grabbed) return;

    this.pos_x = e.pageX - this.old_x;
    this.pos_y = e.pageY - this.old_y;
    if (!this.type.includes("h")) this.pos_x = 0;
    if (!this.type.includes("v")) this.pos_y = 0;
    this.object.style.left = `${this.pos_x}px`;
    this.object.style.top = `${this.pos_y}px`;
  }

  release(e) {
    if (e.button !== 0) return;

    removeEventListener("mousemove", this.move_function);
    removeEventListener("mouseup", this.release_function);

    if (this.pos_x === 0 && this.pos_y === 0) this.click();
    else {
      let new_x = (this.pos_x - (this.pos_x % 48)) / 48;
      let new_y = (this.pos_y - (this.pos_y % 48)) / 48;
      if (!(new_x < 1 && new_x > -1 && new_y < 1 && new_y > -1)) this.onPositionChange(new_x, new_y);
  
      this.grabbed = false;
      this.pos_x = 0;
      this.pos_y = 0;
      this.object.style.left = `${this.pos_x}px`;
      this.object.style.top = `${this.pos_y}px`;
      
      this.animation_timeout = setTimeout(() => this.object.style.zIndex = null, 500);
      this.object.style.transition = null;
    }
  }

  blockActions() {
    removeEventListener("mousemove", this.move_function);
    removeEventListener("mouseup", this.release_function);
    if (!this.no_connections) this.object.removeEventListener("mousedown", this.grab_function);
  }
}
