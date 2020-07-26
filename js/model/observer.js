
class Observer {
  constructor () {
    this._state = null
  }

  getState (state) { }
  setState (state) { }
}

class PaneObserver extends Observer {
  setState (state) {
    this._state = state
  }

  getState (state) {
    this._state = state
  }
}

module.exports = PaneObserver
