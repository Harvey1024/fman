const Pane = require('./pane')
class mianpane {
  constructor (dirini) {
    this.dirnow = dirini
    this.leftpane = ''
    this.rightpane = ''
    this.panes = []
    this.activepane = ''
    
  }

  creatpane () {
    this.leftpane = new Pane('left', this.dirnow[0])
    this.rightpane = new Pane('right', this.dirnow[1])
    this.leftpane.ini(this.rightpane)
    this.rightpane.ini(this.leftpane)
    this.addpaneOnclick(this.leftpane)
    this.addpaneOnclick(this.rightpane)
    this.panes = [this.leftpane, this.rightpane]
  }


  getPane () {
    var panenow = this.leftpane
    var panelast = this.rightpane
    if (this.leftpane.whichPane) {
      panenow = this.leftpane
      panelast = this.rightpane
    } else {
      panenow = this.rightpane
      panelast = this.leftpane
    }
    return [panelast, panenow]
  }

  addpaneOnclick(pane) {
    pane.pane.addEventListener('click', ()=>{
      this.activepane = pane        
    })
  }
}

module.exports = mianpane
