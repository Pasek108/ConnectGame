"use strict";

class Background {
  constructor() {
    this.animation = 0;
    this.canvas_w = window.innerWidth;
    this.canvas_h = window.innerHeight;

    this.canvas = document.querySelector(".background");
    this.canvas.width = this.canvas_w;
    this.canvas.height = this.canvas_h;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    //this.ctx.fillStyle = "rgba(255, 255, 255, 0)";

    addEventListener("resize", this.resize.bind(this));

    this.fps = 30;
    this.fps_interval = 1000 / this.fps;
    this.now = 0;
    this.then = window.performance.now();
    this.elapsed = 0;

    this.generatePoints();
    this.startAnimation();
  }

  draw(new_time) {
    this.animation = requestAnimationFrame(this.draw.bind(this));

    this.now = new_time;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fps_interval) {
      this.then = this.now - (this.elapsed % this.fps_interval);

      this.ctx.clearRect(0, 0, this.canvas_w, this.canvas_h);

      for (let i = 0; i < this.points.length; i++) {
        //this.ctx.fillRect(this.points[i].x, this.points[i].y, 1, 1);
        this.updatePointPosition(i);

        for (let j = 0; j < this.points.length; j++) {
          if (j != i) {
            const distance = Math.sqrt(Math.pow(this.points[i].x - this.points[j].x, 2) + Math.pow(this.points[i].y - this.points[j].y, 2));

            if (distance < 100) {
              this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
              this.ctx.beginPath();
              this.ctx.moveTo(this.points[i].x, this.points[i].y);
              this.ctx.lineTo(this.points[j].x, this.points[j].y);
              this.ctx.stroke();
            }
          }
        }
      }
    }
  }

  generatePoints() {
    this.points_amount = ((this.canvas_w * this.canvas_h) / 10000) | 0;
    this.points = [];
    for (let i = 0; i < this.points_amount; i++) {
      this.points.push({
        x: randomInt(1, this.canvas_w),
        y: randomInt(1, this.canvas_h),
        vx: randomInt(-1, 1),
        vy: randomInt(-1, 1),
      });
    }
  }

  updatePointPosition(i) {
    this.points[i].x += this.points[i].vx / 2;
    if (this.points[i].x > this.canvas_w + 50) this.points[i].x = -50;
    else if (this.points[i].x < -50) this.points[i].x = this.canvas_w + 50;

    this.points[i].y += this.points[i].vy / 2;
    if (this.points[i].y > this.canvas_h + 50) this.points[i].y = -50;
    else if (this.points[i].y < -50) this.points[i].y = this.canvas_h + 50;
  }

  startAnimation() {
    if (this.animation != 0) return;
    this.animation = requestAnimationFrame(this.draw.bind(this));
  }

  stopAnimation() {
    cancelAnimationFrame(this.animation);
    this.animation = 0;
  }

  hide() {
    this.canvas.classList.add("hidden");
  }

  show() {
    this.canvas.classList.remove("hidden");
  }

  resize() {
    this.canvas_w = window.innerWidth;
    this.canvas_h = window.innerHeight;
    this.canvas.width = this.canvas_w;
    this.canvas.height = this.canvas_h;
    this.generatePoints();
  }
}

const background = new Background();
