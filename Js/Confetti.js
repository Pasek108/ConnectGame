"use strict";

const count = 200;

const defaults_left = {
  origin: { x: 0.1, y: 1 },
  angle: 60,
};

const defaults_right = {
  origin: { x: 0.9, y: 1 },
  angle: 120,
};

function fireConfetti() {
  fireLeft(0.25, { spread: 26, startVelocity: 55 });
  fireLeft(0.2, { spread: 60 });
  fireLeft(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fireLeft(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fireLeft(0.1, { spread: 120, startVelocity: 45 });

  fireRight(0.25, { spread: 26, startVelocity: 55 });
  fireRight(0.2, { spread: 60 });
  fireRight(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fireRight(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fireRight(0.1, { spread: 120, startVelocity: 45 });
}

function fireLeft(particleRatio, options) {
  confetti(
    Object.assign({}, defaults_left, options, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

function fireRight(particleRatio, options) {
  confetti(
    Object.assign({}, defaults_right, options, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}