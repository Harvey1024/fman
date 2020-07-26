
class Observer {
  constructor () {
    this._state = null
    this.panView = null
  }

  getState (state) { }
  setState (state) { }
  update (panefiles) { }
}

class PaneObserver extends Observer {
  setState (state) {
    this._state = state
  }

  getState (state) {
    this._state = state
  }

  update (panefiles) {
    this.panView.showFiles(panefiles)
  }
}

module.exports = PaneObserver
