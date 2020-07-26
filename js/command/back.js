const State = require('./state')
class Back extends State {
  constructor (nextstate, mianpane) {
    super(nextstate)
    this.pane = mianpane.fman
  }

  run (content) {
    if (content.getOper() === 'backspace') {
      content.setState(this)
      console.log('back state')
      this.thisPane = this.pane.thisPane
      this.thisPane.dir = this.thisPane.pre
      this.thisPane.refresh()
    } else {
      console.log('next')
      this.next.run(content)
    }
  }
}
module.exports = Back
