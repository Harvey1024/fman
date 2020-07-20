
class PaneView {
    constructor() { }
    showFiles() { }
    addOnclick() { }
    addOndblclick() { }
}

class panView extends PaneView {
    constructor(panename, pane) {
        super()
        this.dir = ''
        this.pane = pane
        this.fileList = ''
        this.panename = panename
        this.paneId = document.getElementById(panename + 'InfList')
    }
    async showFiles() {
        await this.pane.refresh()
        // add file list in html
        var paneInnerText = ''
        var nameClassStr = ''
        var sizeStr = ''
        var dateStr = ''
        for (let i = 0; i < this.fileList.length; i++) {
            const filename = this.fileList[i].name
            const filesize = this.fileList[i].size
            const filedate = this.fileList[i].atime
            nameClassStr = "<td class='name" + this.panename + "'>" + filename + '</td>'
            sizeStr = "<td class='size'>" + filesize + '</td>'
            dateStr = "<td class='date'>" + filedate + '</td>'

            if (this.fileList[i].hide) {
                console.log(this.fileList[i].hide)
                paneInnerText = paneInnerText + "<tr class = 'filelist hide'>" + nameClassStr + sizeStr + dateStr + '</tr>'
            } else { paneInnerText = paneInnerText + "<tr class = 'filelist'>" + nameClassStr + sizeStr + dateStr + '</tr>' }
        }
        this.paneId.innerHTML = paneInnerText
        // add onclick and ondbclick
        this.addOnclick()
        this.addOndblclick()
    }
    addOnclick() { }
    addOndblclick() { }
}

module.exports = panView