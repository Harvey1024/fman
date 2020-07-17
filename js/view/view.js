var panView = require("./paneview")
class View {
    constructor() {
        this.panelist = [new panView(), new panView]
        this.paneState = []
    }

    activePane() { }
    refleshPane() { }
}

class MainView extends View {
    activePane(i) {
        this.panelist[i].active()
    }
    refleshPane(i) {
        this.panelistp[i].reflesh()
    }
}