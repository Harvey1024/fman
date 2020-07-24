const Operation = require('./operation')

export default class Checkout extends Operation {
  constructor (targetPath) {
    super()
    this._targetPath = targetPath
  }

  run () {
    super.run()
  }
}
