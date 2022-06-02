"use strict";

class LinesTile {
  constructor(parent, connections, onClick) {
    this.parent = parent;
    this.connections = [[], [], [], []];
    this.connections_array = connections;
    this.type = connections[4];
    this.onClick = onClick;
    this.rotation = 0;
    this.animation_timeout;

    this.container = document.createElement("div");
    this.container.className = "tile";
    if (!this.no_connections) this.container.appendChild(this.createObject());
    this.parent.appendChild(this.container);
  }

  addTopConnection(svg) {
    const horizonatl_line = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    horizonatl_line.setAttribute("x", "45");
    horizonatl_line.setAttribute("y", "0");
    horizonatl_line.setAttribute("width", "10");
    horizonatl_line.setAttribute("height", "55");
    svg.appendChild(horizonatl_line);
  }

  addBottomConnection(svg) {
    const horizonatl_line = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    horizonatl_line.setAttribute("x", "45");
    horizonatl_line.setAttribute("y", "45");
    horizonatl_line.setAttribute("width", "10");
    horizonatl_line.setAttribute("height", "55");
    svg.appendChild(horizonatl_line);
  }

  addLeftConnection(svg) {
    const horizonatl_line = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    horizonatl_line.setAttribute("x", "0");
    horizonatl_line.setAttribute("y", "45");
    horizonatl_line.setAttribute("width", "55");
    horizonatl_line.setAttribute("height", "10");
    svg.appendChild(horizonatl_line);
  }

  addRightConnection(svg) {
    const horizonatl_line = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    horizonatl_line.setAttribute("x", "45");
    horizonatl_line.setAttribute("y", "45");
    horizonatl_line.setAttribute("width", "55");
    horizonatl_line.setAttribute("height", "10");
    svg.appendChild(horizonatl_line);
  }

  addSourceMark(svg) {
    const big_square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    big_square.setAttribute("x", "50");
    big_square.setAttribute("y", "-20");
    big_square.setAttribute("width", "40");
    big_square.setAttribute("height", "40");
    big_square.setAttribute("transform", "rotate(45)");
    big_square.setAttribute("stroke", "rgb(44, 46, 52)");
    svg.appendChild(big_square);

    const small_square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    small_square.setAttribute("x", "60");
    small_square.setAttribute("y", "-10");
    small_square.setAttribute("width", "20");
    small_square.setAttribute("height", "20");
    small_square.setAttribute("transform", "rotate(45)");
    small_square.style.fill =  "rgb(255, 132, 0)";
    svg.appendChild(small_square);
  }

  addDestinationMark(svg) {
    const big_square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    big_square.setAttribute("x", "30");
    big_square.setAttribute("y", "30");
    big_square.setAttribute("width", "40");
    big_square.setAttribute("height", "40");
    big_square.setAttribute("stroke", "rgb(44, 46, 52)");
    svg.appendChild(big_square);

    const small_square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    small_square.setAttribute("x", "40");
    small_square.setAttribute("y", "40");
    small_square.setAttribute("width", "20");
    small_square.setAttribute("height", "20");
    small_square.style.fill =  "rgb(44, 46, 52)";
    svg.appendChild(small_square);
  }

  createObject() {
    this.object = document.createElement("div");
    this.object.className = "object";

      this.mark = document.createElement("div");
      this.mark.className = "mark";
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");;
        this.svg.setAttribute("viewBox", "0 0 100 100");
        
        for (let i = 0; i < 4; i++) {
          if (!this.connections_array[i]) continue;

          switch (i) {
            case 0: this.addTopConnection(this.svg); break;
            case 1: this.addRightConnection(this.svg); break;
            case 2: this.addBottomConnection(this.svg); break;
            case 3: this.addLeftConnection(this.svg); break;
          }
        }

        if (this.type === "s") this.addSourceMark(this.svg);
        else if (this.type === "d") this.addDestinationMark(this.svg);
          
        this.mark.appendChild(this.svg);
      this.object.appendChild(this.mark);

    this.animation_timeout = setTimeout(()=>{
      this.click_function = this.click.bind(this);
      this.object.addEventListener("click", this.click_function);
      this.object.style.animation = "none";
      this.mark.style.animation = "none";
    }, 500);
    
    return this.object;
  }

  click() {
    this.rotation++;
    this.mark.style.transform = `rotate(${90 * this.rotation}deg)`;
    
    this.onClick();
  }

  setConnected(is_connected) {
    if (this.type !== "d") return;

    if (is_connected) this.object.className = "object connected";
    else this.object.className = "object";
  }

  blockActions() {
    this.object.removeEventListener("click", this.click_function);
  }
}
