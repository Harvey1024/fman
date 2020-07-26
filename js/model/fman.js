const Pane = require('./pane')

class AbastractFman {
  constructor () {
    this.leftpane = new Pane()
    this.rightpane = new Pane()
    this.thisPane = this.leftpane
  }

  init () {}
  setState () { }
  getState () { }
}

class Fman extends AbastractFman {
  set leftdir (dir) {
    this._leftdir = dir
    this.leftpane.dir = dir
  }

  get leftdir () {
    return this._leftdir
  }

  set rightdir (dir) {
    this._rightdir = dir
    this.rightpane.dir = dir
  }

  get rightdir () {
    return this._rightdir
  }

  async refresh () {
    await this.leftpane.refresh()
    await this.rightpane.refresh()
  }
}

module.exports = Fman
