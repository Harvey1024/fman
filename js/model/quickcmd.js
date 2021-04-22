class AbastractQuickcmd {
    constructor() {
        this.element = document.getElementsByClassName('quickcmd')[0]
        this.textBox = document.getElementsByClassName('cmdheader')[0].children[0]
        this.text = ''
        this.cmdlist = []
    }

    run() { }
    show() { }
    hide() { }
}

class QuickCmd extends AbastractQuickcmd {
    show() {
        this.element.classList.remove('hide')
        this.textBox.focus()
    }
    hide() {
        this.element.classList.add('hide')
    }
    clear() {

    }
    close() {
        this.hide()
        this.clear()
    }
}

module.exports = QuickCmd