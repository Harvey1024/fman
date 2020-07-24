const Operation = require('./operation')

export default class Copy extends Operation {
  constructor (sourcePath, targetPath) {
    super()
    this._sourcePath = sourcePath
    this._targetPath = targetPath
  }

  run () {
    super.run()
  }
}
