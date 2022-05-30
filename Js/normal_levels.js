"use strict";

const normal_levels = [
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 4, 2, 0, "h"],
      [0, 0, 4, 4, "vh"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 2, 3, 0, "r"],
      [2, 1, 4, 2, "h"],
      [4, 0, 3, 1, "v"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [3, 3, 0, 0, "hr"],
      [4, 3, 4, 3, "vhr"],
      [3, 0, 1, 3, "hr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [4, 2, 0, 0, "n"],
      [1, 0, 0, 2, "hr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 3, 1, 0, "h"],
      [0, 0, 2, 3, "hr"],
      [0, 0, 2, 0, "hr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [1, 1, 0, 0, "n"],
      [2, 4, 2, 1, "vhr"],
      [2, 0, 2, 4, "vh"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [2, 4, 0, 0, "v"],
      [2, 0, 3, 4, "vhr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 4, 0, 0, "r"],
      [0, 0, 1, 4, "r"],
      [0, 0, 0, 0, "n"],
      [3, 3, 1, 0, "vh"],
      [0, 0, 2, 3, "h"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [1, 2, 0, 0, "h"],
      [0, 4, 0, 2, "vhr"],
      [1, 2, 0, 4, "v"],
      [2, 0, 0, 2, "vr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 1, 2, 0, "vr"],
      [0, 0, 2, 1, "h"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [2, 4, 1, 0, "v"],
      [2, 0, 4, 4, "vr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 1, 4, 0, "n"],
      [1, 4, 2, 1, "vhr"],
      [4, 2, 0, 4, "vhr"],
      [0, 4, 4, 2, "vhr"],
      [0, 0, 2, 4, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [4, 1, 4, 0, "vr"],
      [2, 0, 3, 1, "h"],
      [0, 0, 0, 0, "n"],
      [4, 1, 0, 0, "n"],
      [2, 0, 0, 1, "r"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [4, 4, 0, 0, "v"],
      [3, 0, 0, 4, "v"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 4, 1, 0, "h"],
      [0, 0, 3, 4, "vhr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [1, 1, 2, 0, "r"],
      [3, 3, 2, 1, "vhr"],
      [0, 4, 0, 3, "hr"],
      [0, 0, 1, 4, "v"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [2, 1, 4, 0, "vhr"],
      [2, 0, 1, 1, "vhr"],
      [0, 0, 0, 0, "n"],
      [1, 1, 0, 0, "h"],
      [0, 0, 4, 1, "hr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [4, 3, 2, 0, "vh"],
      [1, 0, 2, 3, "vh"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [4, 0, 4, 0, "hr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [2, 4, 0, 0, "vh"],
      [2, 0, 0, 4, "n"],
      [0, 0, 0, 0, "n"],
      [0, 3, 0, 0, "h"],
      [4, 0, 0, 3, "vhr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 1, 4, 0, "vhr"],
      [0, 0, 2, 1, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [4, 3, 3, 0, "hr"],
      [2, 0, 2, 3, "vh"],
      [0, 0, 0, 0, "n"],
      [0, 3, 1, 0, "v"],
      [0, 0, 3, 3, "vh"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [3, 4, 0, 0, "v"],
      [2, 1, 1, 4, "n"],
      [0, 3, 0, 1, "vr"],
      [1, 2, 0, 3, "h"],
      [3, 0, 0, 2, "vh"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [1, 0, 0, 0, "hr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 4, 2, 0, "n"],
      [0, 1, 1, 4, "vh"],
      [0, 2, 0, 1, "h"],
      [0, 0, 2, 2, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [2, 2, 0, 0, "v"],
      [1, 0, 0, 2, "n"],
      [0, 0, 0, 0, "n"],
      [2, 0, 4, 0, "vhr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [4, 2, 2, 0, "vhr"],
      [0, 0, 1, 2, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [2, 1, 3, 0, "r"],
      [1, 0, 3, 1, "r"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [3, 3, 0, 0, "h"],
      [3, 0, 0, 3, "hr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 4, 2, 0, "v"],
      [0, 2, 2, 4, "vr"],
      [0, 1, 0, 2, "v"],
      [0, 0, 4, 1, "v"],
      [0, 0, 1, 0, "r"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [2, 4, 4, 0, "hr"],
      [2, 0, 0, 4, "v"],
      [0, 0, 0, 0, "n"],
      [4, 2, 0, 0, "vhr"],
      [1, 0, 1, 2, "vhr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [4, 0, 4, 0, "h"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [1, 0, 1, 0, "r"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [4, 3, 0, 0, "n"],
      [0, 3, 0, 3, "h"],
      [0, 2, 0, 3, "vr"],
      [0, 2, 0, 2, "v"],
      [1, 0, 0, 2, "r"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 2, 4, 0, "hr"],
      [0, 0, 2, 2, "h"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 4, 1, 0, "vhr"],
      [0, 4, 3, 4, "r"],
      [0, 3, 0, 4, "r"],
      [4, 1, 4, 3, "n"],
      [2, 0, 1, 1, "vhr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [1, 3, 0, 0, "vh"],
      [3, 0, 0, 3, "vh"],
      [0, 0, 0, 0, "n"],
      [4, 3, 0, 0, "hr"],
      [1, 0, 0, 3, "vh"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 2, 0, "vr"],
      [0, 0, 3, 0, "r"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 4, 3, 0, "vh"],
      [2, 1, 3, 4, "hr"],
      [3, 3, 1, 1, "v"],
      [0, 0, 0, 3, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 3, 2, 0, "h"],
      [3, 2, 0, 3, "r"],
      [3, 1, 3, 2, "h"],
      [1, 0, 0, 1, "r"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [2, 0, 0, 0, "vhr"],
      [0, 0, 0, 0, "n"],
      [3, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
  [
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 4, 0, 0, "hr"],
      [0, 0, 4, 4, "r"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 2, 0, 0, "n"],
      [4, 1, 3, 2, "vhr"],
      [0, 0, 3, 1, "vhr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [3, 1, 3, 0, "v"],
      [3, 0, 3, 1, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 1, 0, 0, "h"],
      [3, 2, 0, 1, "vhr"],
      [3, 0, 0, 2, "vh"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
];
