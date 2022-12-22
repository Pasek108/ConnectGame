"use strict";

class Background {
  constructor() {
    this.animation = 0;
    this.fps = 30;
    this.fps_interval = 1000 / this.fps;
    this.now = 0;
    this.then = performance.now();
    this.elapsed = 0;

    this.canvas = document.querySelector(".background");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    addEventListener("resize", this.resize.bind(this));

    this.resize();
    this.startAnimation();
  }

  startAnimation() {
    if (this.animation != 0) return;
    this.animation = requestAnimationFrame(this.animate.bind(this));
  }

  stopAnimation() {
    cancelAnimationFrame(this.animation);
    this.animation = 0;
  }

  /** Resizes canvas and generate new points array for this size */
  resize() {
    this.canvas_w = window.innerWidth;
    this.canvas_h = window.innerHeight;
    this.canvas.width = this.canvas_w;
    this.canvas.height = this.canvas_h;
    this.generatePoints();
  }

  /**
   * Executes drawPoints method when enough time passed (current is 30 fps). Function should be run from requestAnimationFrame
   * @param {number} new_time time from requestAnimationFrame
   */
  animate(new_time) {
    this.animation = requestAnimationFrame(this.animate.bind(this));

    this.now = new_time;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fps_interval) {
      this.then = this.now - (this.elapsed % this.fps_interval);
      this.drawPoints();
    }
  }

  /** Clears canvas and draws lines between every two points when its distance is less than 100 of opacity (1 - distance / 100) */
  drawPoints() {
    this.ctx.clearRect(0, 0, this.canvas_w, this.canvas_h);

    for (let i = 0; i < this.points.length; i++) {
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

  /** Generates points array of size (width * height / 10000). Points are stored as position (x, y) and vector (vx, vy) */
  generatePoints() {
    const points_amount = ((this.canvas_w * this.canvas_h) / 10000) | 0;
    this.points = [];

    for (let i = 0; i < points_amount; i++) {
      this.points.push({
        x: GlobalUtils.randomInt(1, this.canvas_w),
        y: GlobalUtils.randomInt(1, this.canvas_h),
        vx: GlobalUtils.randomInt(-1, 1),
        vy: GlobalUtils.randomInt(-1, 1),
      });
    }
  }

  /**
   * Moves point by its vector and change position when is out of canvas bounds
   * @param {number} i 
   */
  updatePointPosition(i) {
    this.points[i].x += this.points[i].vx / 2;
    if (this.points[i].x > this.canvas_w + 50) this.points[i].x = -50;
    else if (this.points[i].x < -50) this.points[i].x = this.canvas_w + 50;

    this.points[i].y += this.points[i].vy / 2;
    if (this.points[i].y > this.canvas_h + 50) this.points[i].y = -50;
    else if (this.points[i].y < -50) this.points[i].y = this.canvas_h + 50;
  }
}