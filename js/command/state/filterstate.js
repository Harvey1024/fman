var State = require('./state')

module.exports = class FilterState extends State {
  constructor (nextstate) {
    super(nextstate)
    this.filterString = ''
    this.basicChar = '1234567890qwertyuiopasdfghjklzxcvbnm`~!@#$%^&*()_+[]{},.<>/?;'
  }

  run (content) {
    content.setState(this)
    console.log('is filter state')
  }
}
