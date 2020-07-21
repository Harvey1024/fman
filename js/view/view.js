var panView = require('./paneview')
var Fman = require('../model/fman')
class View {
  activePane () { }
  refresh () { }
}

class MainView extends View {
  constructor () {
    super()
    this.fman = new Fman()

    this.panelist = [this.fman.leftpane, this.fman.rightpane]
    this.paneViewlist = [new panView('left', this.fman.leftpane), new panView('right', this.fman.rightpane)]
    this.paneState = []
  }

  activePane (key) {
    if (key === 'left') { this.paneViewlist[0].active() } else { this.paneViewlist[1].active() }
  }

  refresh () {
    for (const key of this.paneViewlist.keys()) {
      this.fman.leftdir = 'C:/'
      this.fman.rightdir = 'D:/'
      //   await this.panelist[key].refresh()
      this.paneViewlist[key].showFiles()
    }
  }
}

module.exports = MainView
