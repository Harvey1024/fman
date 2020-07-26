const State = require('./state')
class Back extends State {
  run (content) {
    if (content.getOper() === 'backspace') {
      content.setState(this)
      console.log('back state')
    } else {
      console.log('next')
      this.next.run(content)
    }
  }
}
module.exports = Back
