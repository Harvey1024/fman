const KeyboardHander = require('./js/command/keyboard')
const back = require('./back')

const keyHander = new KeyboardHander()
keyHander.setOper('Ctr+Shift+p')
keyHander.run()
