const State = require('./state')

module.exports = class QuickCmdState extends State {
  constructor (next) {
    super(next)
    this.quickcmd = document.getElementsByClassName('quickcmd')[0]
  }

  run (content) {
    if (content.getOper() === 'Ctrl+Shift+p') {
      content.setState(this)
      console.log('quick cmd state')
      this.quickcmd.classList.remove('hide')
      document.getElementsByClassName('cmdheader')[0].children[0].focus()
    } else {
      console.log('next')
      this.next.run(content)
    }
  }
}
