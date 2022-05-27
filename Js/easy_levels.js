"use strict";

const easy_levels = [
  [
    [
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
      [0, 4, 1, 0, "v"],
      [0, 4, 1, 4, "h"],
      [0, 0, 1, 4, "vr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 2, 0, 0, "hr"],
      [1, 4, 0, 2, "vhr"],
      [1, 2, 3, 4, "vh"],
      [1, 0, 4, 2, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [3, 3, 0, 0, "r"],
      [4, 0, 0, 3, "vr"],
      [0, 0, 0, 0, "n"],
    ],
    [
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
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 1, 2, 0, "r"],
      [0, 0, 3, 1, "r"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [2, 1, 2, 0, "r"],
      [3, 0, 3, 1, "vr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 3, 0, 0, "hr"],
      [2, 2, 2, 3, "hr"],
      [3, 0, 0, 2, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [2, 0, 0, 0, "n"],
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
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 3, 0, "h"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [3, 1, 2, 0, "vr"],
      [0, 1, 0, 1, "vh"],
      [0, 0, 0, 1, "r"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [2, 0, 4, 0, "vh"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 4, 0, "vhr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [4, 2, 0, 0, "v"],
      [0, 3, 0, 2, "h"],
      [0, 2, 0, 3, "vr"],
      [4, 0, 0, 2, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
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
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 1, 4, 0, "h"],
      [0, 0, 0, 1, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [4, 0, 1, 0, "r"],
      [0, 0, 0, 0, "n"],
      [0, 0, 3, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [1, 3, 0, 0, "h"],
      [0, 1, 0, 3, "r"],
      [3, 3, 0, 1, "vhr"],
      [0, 0, 0, 3, "vr"],
      [0, 0, 0, 0, "n"],
    ],
    [
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
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 2, 3, 0, "vhr"],
      [0, 0, 4, 2, "r"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 4, 1, 0, "vhr"],
      [3, 4, 0, 4, "h"],
      [4, 0, 0, 4, "h"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 2, 3, 0, "h"],
      [1, 0, 1, 2, "vh"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [3, 2, 0, 0, "r"],
      [1, 0, 0, 2, "vhr"],
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
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 4, 2, 0, "vr"],
      [0, 0, 2, 4, "r"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [2, 2, 0, 0, "r"],
      [2, 1, 4, 2, "vh"],
      [0, 3, 1, 1, "vhr"],
      [0, 0, 0, 3, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [4, 4, 1, 0, "v"],
      [1, 0, 0, 4, "h"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [1, 0, 0, 0, "vhr"],
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
    ],
    [
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
      [0, 2, 1, 0, "h"],
      [0, 1, 0, 2, "vhr"],
      [0, 0, 1, 1, "vr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 1, 2, 0, "hr"],
      [1, 0, 0, 1, "n"],
      [0, 0, 0, 0, "n"],
      [1, 0, 1, 0, "vr"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [2, 0, 0, 0, "vh"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [1, 0, 0, 0, "vhr"],
      [0, 0, 0, 0, "n"],
    ],
    [
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
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 2, 2, 0, "v"],
      [0, 4, 0, 2, "v"],
      [0, 0, 0, 4, "vhr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [2, 0, 3, 0, "h"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [3, 4, 3, 0, "vhr"],
      [0, 1, 2, 4, "h"],
      [0, 0, 1, 1, "vr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [3, 2, 0, 0, "n"],
      [2, 1, 0, 2, "r"],
      [1, 0, 0, 1, "n"],
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
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 3, 0, "vr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [3, 2, 3, 0, "r"],
      [0, 3, 1, 2, "r"],
      [0, 0, 2, 3, "vhr"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [3, 4, 0, 0, "v"],
      [1, 3, 0, 4, "hr"],
      [2, 1, 3, 3, "vhr"],
      [0, 0, 2, 1, "n"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [3, 1, 0, 0, "h"],
      [2, 0, 0, 1, "v"],
      [0, 0, 0, 0, "n"],
    ],
    [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ],
  ],
];