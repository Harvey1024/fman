const TIMEOUT = 500

class Operation {
  constructor () {
    this._timeout = null
    this._aborted = false
    this._progress = null
    this._issue = {} // list potential issue
  }

  async run () {
    this._timeout = setTimeout(() => this._showProgress(), TIMEOUT)
  }

  abort () {
    this._aborted = true
  }

  _end () {
    // clearTimeout(this._timeout)
    this._progress && this._progress.close()
  }

  _showProgress () {
    this._progress && this._progress.open()
  }
}

module.exports = Operation
