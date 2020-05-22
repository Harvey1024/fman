const Pane = require('./pane')
class mianpane {
  constructor(dirini) {
    this.dirnow = dirini
    this.leftpane = ''
    this.rightpane = ''
    this.panes = []   //[leftpane, rightpane]
    this.activepane = ''

  }

  creatpane() {
    this.leftpane = new Pane('left', this.dirnow[0])
    this.rightpane = new Pane('right', this.dirnow[1])
    this.leftpane.ini(this.rightpane, 1)
    this.rightpane.ini(this.leftpane, 0)
    this.addpaneOnclick(this.leftpane)
    this.addpaneOnclick(this.rightpane)
    this.panes = [this.leftpane, this.rightpane]
    this.activepane = this.leftpane
  }

  get inactivepane() {
    if (this.activepane == this.panes[0]) {
      return this._inactivepane = this.panes[1]
    }
    else {
      return this._inactivepane = this.panes[0]
    }
    // return this.inactivpane
  }

  addpaneOnclick(pane) {
    pane.pane.addEventListener('click', () => {
      this.activepane = pane
    })
  }


}

module.exports = mianpane
