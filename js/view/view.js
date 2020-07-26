var panView = require('./paneview')
var Fman = require('../model/fman')
const PaneObserver = require('../model/observer')

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
    this.filelists = [this.fman.leftpane, this.fman.rightpane]
    this.addObserver()
  }

  addObserver () {
    const leftObserver = new PaneObserver()
    const rightObserver = new PaneObserver()
    leftObserver.panView = this.paneViewlist[0]
    rightObserver.panView = this.paneViewlist[1]
    this.fman.leftpane.attachObserver(leftObserver)
    this.fman.rightpane.attachObserver(rightObserver)
  }

  activePane (key) {
    if (key === 'left') { this.paneViewlist[0].active() } else { this.paneViewlist[1].active() }
  }

  refresh () {
    for (const key of this.paneViewlist.keys()) {
      this.fman.leftdir = 'C:/data/'
      this.fman.rightdir = 'C:/'
      this.panelist[key].refresh()
      // this.paneViewlist[key].showFiles()
    }
  }
}

module.exports = MainView
