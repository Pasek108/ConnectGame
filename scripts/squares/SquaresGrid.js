"use strict"

/**
 for (let i = 0; i < easy_levels.length; i++) {
    easy_levels[i] = SquaresUtils.encodeLevel(easy_levels[i]);
}
 */

class SquaresGrid {
  constructor(tile_size, level, unlockNextLevel) {
    this.unlockNextLevel = unlockNextLevel
    this.height = level.length
    this.width = level[0].length
    this.level = GlobalUtils.copyArray(SquaresUtils.decodeLevel(level))
    for (let i = 0; i < 1000; i++) this.shuffleLevel()

    this.container = document.querySelector(".grid")
    this.container.innerHTML = ""
    this.setGridSize(tile_size)

    this.tiles = []

    for (let i = 0; i < this.height; i++) {
      this.tiles.push([])

      for (let j = 0; j < this.width; j++) {
        this.tiles[i].push(
          new SquaresTile(
            this.level[i][j],
            this.checkCorrectConnections(i, j),
            () => this.tileClicked(i, j),
            (new_x, new_y) => this.tilePositionChanged(i, j, new_x, new_y)
          )
        )

        let corner_tile = -1
        if (i == 0 && j == 0) corner_tile = 0
        if (i == 0 && j == this.width - 1) corner_tile = 1
        if (i == this.height - 1 && j == 0) corner_tile = 2
        if (i == this.height - 1 && j == this.width - 1) corner_tile = 3

        // prettier-ignore
        switch(corner_tile) {
          case 0: this.tiles[i][j].container.style.borderTopLeftRadius = "0.375rem"; break;
          case 1: this.tiles[i][j].container.style.borderTopRightRadius = "0.375rem"; break;
          case 2: this.tiles[i][j].container.style.borderBottomLeftRadius = "0.375rem"; break;
          case 3: this.tiles[i][j].container.style.borderBottomRightRadius = "0.375rem"; break;
        }

        this.container.appendChild(this.tiles[i][j].container)
      }
    }
  }

  setGridSize(size) {
    this.container.className = `grid squares size-${size}`
    this.container.style.width = `${this.width * size + (this.width - 1) * 0.1 + 0.2}rem`
    this.container.style.height = `${this.height * size + (this.height - 1) * 0.1 + 0.2}rem`
    this.container.style.gridTemplateColumns = `repeat(${this.width}, ${size}rem)`
    this.container.style.gridTemplateRows = `repeat(${this.height}, ${size}rem)`
  }

  shuffleLevel() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.level[i][j][4].includes("r")) {
          const random_rotates = GlobalUtils.randomInt(0, 4)
          for (let k = 0; k < random_rotates; k++) this.rotateConnections(i, j)
        }

        let y_position = i
        let x_position = j

        if (this.level[i][j][4].includes("v")) {
          y_position += GlobalUtils.randomInt(-this.height, this.height)

          if (y_position < 0) y_position = 0
          else if (y_position >= this.height) y_position = this.height - 1
        }

        if (this.level[i][j][4].includes("h")) {
          x_position += GlobalUtils.randomInt(-this.width, this.width)

          if (x_position < 0) x_position = 0
          else if (x_position >= this.width) x_position = this.width - 1
        }

        this.moveTile(i, j, y_position, x_position)
      }
    }
  }

  moveTile(y, x, new_y, new_x) {
    for (let k = 0; k < 4; k++) {
      if (this.level[new_y][new_x][k] != 0) return
    }

    const temp = this.level[y][x]
    this.level[y][x] = this.level[new_y][new_x]
    this.level[new_y][new_x] = temp
  }

  checkCorrectConnections(x, y) {
    let correct_connections = []

    const current_block = this.level[x][y]
    const adjacent_blocks = [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ]

    if (x - 1 >= 0) adjacent_blocks[0] = this.level[x - 1][y]
    if (x + 1 < this.width) adjacent_blocks[2] = this.level[x + 1][y]

    if (y - 1 >= 0) adjacent_blocks[3] = this.level[x][y - 1]
    if (y + 1 < this.height) adjacent_blocks[1] = this.level[x][y + 1]

    for (let i = 0; i < 4; i++) {
      correct_connections.push(current_block[i] == adjacent_blocks[i][(i + 2) % 4])
    }

    return correct_connections
  }

  checkAllConnections() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const connections = this.checkCorrectConnections(i, j)

        for (let k = 0; k < 4; k++) {
          if (!connections[k]) return false
        }
      }
    }

    return true
  }

  rotateConnections(y, x) {
    const last = this.level[y][x][3]
    for (let k = 3; k > 0; k--) this.level[y][x][k] = this.level[y][x][k - 1]
    this.level[y][x][0] = last
  }

  updateConnections(y, x) {
    //console.log(this.level)
    const current_tile = this.tiles[y][x]
    //console.log(current_tile, this.level[y][x])
    current_tile.setConnections(this.level[y][x], this.checkCorrectConnections(y, x))
    const step = [-1, 0, 1, 0]

    for (let k = 0; k < 4; k++) {
      const p = y + step[k]
      const q = x + step[(k + 1) % 4]

      if (p >= 0 && p < this.height && q >= 0 && q < this.width) {
        this.tiles[p][q].setConnections(this.level[p][q], this.checkCorrectConnections(p, q))
      }
    }
  }

  tileClicked(y, x) {
    this.rotateConnections(y, x)
    this.updateConnections(y, x)

    if (this.checkAllConnections()) this.win()
  }

  tilePositionChanged(i, j, new_x, new_y) {
    new_x = (new_x + (new_x % 2)) / 2
    new_y = (new_y + (new_y % 2)) / 2

    let x = j + new_x
    if (x >= this.width) x = this.width - 1
    else if (x < 0) x = 0

    let y = i + new_y
    if (y >= this.height) y = this.height - 1
    else if (y < 0) y = 0

    if (i == y && j == x) return false

    let is_occupied = false
    for (let k = 0; k < 4; k++) {
      if (this.level[y][x][k] == 0) continue
      is_occupied = true
      break
    }

    if (is_occupied) return

    const tile_size = this.tiles[i][j].container.offsetWidth
    // const half_size = this.container.offsetWidth / 2
    // let new_x = (this.pos_x - (this.pos_x % half_size)) / half_size
    // let new_y = (this.pos_y - (this.pos_y % half_size)) / half_size
    // if (!(new_x < 1 && new_x > -1 && new_y < 1 && new_y > -1)) {
    //   if (this.onPositionChange(new_x, new_y)) return
    // }
    
    if (y - i >= 1) this.tiles[i][j].block.style.top = `${+this.tiles[i][j].block.style.top.slice(0, -2) - (y - i) * tile_size}px`
    if (y - i <= -1) this.tiles[i][j].block.style.top = `${+this.tiles[i][j].block.style.top.slice(0, -2) - (y - i) * tile_size}px`
    if (x - j >= 1) this.tiles[i][j].block.style.left = `${+this.tiles[i][j].block.style.left.slice(0, -2) - (x - j) * tile_size}px`
    if (x - j <= -1) this.tiles[i][j].block.style.left = `${+this.tiles[i][j].block.style.left.slice(0, -2) - (x - j) * tile_size}px`

    const temp = this.level[i][j]
    this.level[i][j] = this.level[y][x]
    this.level[y][x] = temp

    this.tiles[y][x].setBlock(this.tiles[i][j].block)
    this.tiles[i][j].setBlock(null)
    // const clone = this.tiles[i][j].container.cloneNode()
    // this.container.insertBefore(clone, this.tiles[i][j].container)
    // this.container.insertBefore(this.tiles[i][j].container, this.tiles[y][x].container)
    // this.container.insertBefore(this.tiles[y][x].container, clone)
    // clone.remove()

    // const temp_tile = this.tiles[i][j]
    // this.tiles[i][j] = this.tiles[y][x]
    // this.tiles[y][x] = temp_tile

    this.tiles[i][j].setFunctions(
      () => this.tileClicked(i, j),
      (new_x, new_y) => this.tilePositionChanged(i, j, new_x, new_y)
    )

    this.tiles[y][x].setFunctions(
      () => this.tileClicked(y, x),
      (new_x, new_y) => this.tilePositionChanged(y, x, new_x, new_y)
    )

    this.updateConnections(i, j)
    this.updateConnections(y, x)
    
    if (this.checkAllConnections()) this.win()

    return true
  }

  win() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j].blockActions()
      }
    }

    this.unlockNextLevel()
  }
}
