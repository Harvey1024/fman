const FilterState = require('./state/filterstate')
const QuickCmdState = require('./state/quickcmdstate')
const BaseState = require('./state/basestate')
const Back = require('./state/back')
module.exports = class KeyboardHander {
  constructor (mainpane) {
    this.mainpane = mainpane
    this.REGISTRY = []
    this.FUNC = []
    this.eventString = ''
    this.oper = ''
    this.buildchain()
  }

  run (event) {
    // this.eventString.push(this._prase(event))
    this.state.run(this)
  }

  buildchain () {
    // this.state = new QuickCmdState(new FilterState())
    const baseState = new BaseState()
    this.state = new Back(baseState, this.mainpane)
    console.log(this.mainpane)
  }

  setState (state) {
    this.state = state
  }

  getState () {
    return this.state
  }

  setOper (oper) {
    this.oper = oper
  }

  getOper () {
    return this.oper
  }

  hander (event) {
    this.buildchain()

    var operlist = []
    if (event.altKey) {
      operlist.push('Alt')
    }
    if (event.ctrlKey) {
      operlist.push('Ctrl')
    }
    if (event.shiftKey) {
      operlist.push('Shift')
    }
    operlist.push(event.key.toLowerCase())
    this.oper = operlist.join('+')
    console.log(this.oper)
    console.log(operlist)

    this.run()
  }

  _prase () {
    // format keys to lowercase

  }

  regist (key, func) {
    var newkey = this._prase(key)
    this.REGISTRY.push(newkey)
    this.FUNC.push(func)
  }
}
