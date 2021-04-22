const State = require('./state')
const QuickCmd = require('../../model/quickcmd')
module.exports = class QuickCmdState extends State {
  constructor (next) {
    super(next)
    this.quickcmd = new QuickCmd()
  }

  run (content) {
    if (content.getOper() === 'Ctrl+Shift+p') {
      content.setState(this)
      console.log('quick cmd state')
      this.quickcmd.show()
      document.getElementsByClassName('cmdheader')[0].children[0].focus()
    } 
    else if(content.getOper() === 'Esc'){
      this.close()
    }
    else {
      console.log('next')
      this.next.run(content)
    }
  }

  close(){
    this.quickcmd.close()
  }
}
