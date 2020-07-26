var State = require('./state')

module.exports = class QuickCmdState extends State {
  run (content) {
    if (content.getOper() === 'Ctrl+Shift+p') {
      content.setState(this)
      console.log('quick cmd state')
    } else {
      console.log('next')
      this.next.run(content)
    }
  }
}
