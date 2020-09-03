const KeyboardHander = require('./keyboard')
const back = require('./state/back')


function keyHander(mainpane){
    const keyboardHander = new KeyboardHander(mainpane)
    keyboardHander.regist('backspace', back)
    
    return keyboardHander
}
module.exports = keyHander
