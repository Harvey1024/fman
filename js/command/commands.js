const KeyboardHander = require('./js/command/keyboard')
const back = require('./back')

const keyHander = new KeyboardHander()
keyHander.regist('backspace', back)

module.exports = keyHander
