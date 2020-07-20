var FileList = require('./filelist')

class AbastractPane{
    constructor(){
        this.filelist = new FileList() 
        this.dir = ''
        this.namelist = []
    }
    refresh(){}
    getState(){}
    setState(){}
}

class Pane extends AbastractPane{
    async refresh(){
        await this.filelist.getFileList(this.dir)
    }
    getState(){

    }
    setState(){

    }
}

module.exports = Pane