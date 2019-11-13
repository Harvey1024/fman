var fman = require("./fman");

class pane extends fman{
    constructor(paneDir){
        super()
        this.paneDir = paneDir;
    }
    showList(){
        fs.readdir(paneDir,function(err, files){
            if (err) {
                return console.error(err);
            }
        })
    }
}

module.exports = pane;