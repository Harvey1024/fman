
module.exports = class State {
  constructor (nextstate) {
    this._shortcutlist = ['Ctr+v', 'Ctr+c', 'Ctr+v', 'Ctr+shift+p', +'Ctr+p']
    this.next = nextstate
  }

  run (content) {}
}
