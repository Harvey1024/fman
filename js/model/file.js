
class AbstractFile{
    constructor(filedir){
        this.name = ""
        this.size = ""
        this.sizeUnit = ""
        this.dir = ""
        this.type = ""
        this.atime = ""
        this.fulldir = filedir
    }
    rename(){}
    delet(){}
    open(){}
    openwith(){}
}

class File extends AbstractFile {
    constructor(filedir){
        super(filedir)
        this.type = "file"

    }
}

class Folder extends AbstractFile{
    constructor(folderdir){
        super(folderdir)
        this.type = folderdir
    }
}

module.exports  = {
    File,
    Folder
}