const State = require('./state')
const Back = require('./back')

class BaseState extends State {
  run (content) {
    if (content.getOper() === 'backspace') {
      content.setState(new Back())
      console.log('back state')
    } else {
      console.log('next')
      this.next.run(content)
    }
  }
}
module.exports = BaseState
