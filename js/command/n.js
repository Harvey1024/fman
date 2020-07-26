class n2 {
  constructor () {
    console.log('n2')
  }
}

module.exports = class n1 extends n2 {
  constructor () {
    super()
    console.log('n1')
  }
}
