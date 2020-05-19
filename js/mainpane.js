const Pane = require('./pane')
class mianpane {
  constructor (dirini) {
    this.dirnow = dirini
    this.leftpane = ''
    this.rightpane = ''
    this.panes = []   //[leftpane, rightpane]
    this.activepane = ''
    this.inactivpane = ''
    
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

  getinactivpane(){
    if(this.activepane == this.panes[0]){
      this.inactivpane = this.panes[1]
    }
    else{
      this.inactivpane = this.panes[0]
    }
    return this.inactivpane
  }

  addpaneOnclick(pane) {
    pane.pane.addEventListener('click', ()=>{
        this.activepane = pane
    })
  }
  

}

module.exports = mianpane
