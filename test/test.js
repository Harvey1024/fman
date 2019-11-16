var fs = require("fs");

class test{
    constructor(){
        this.name = "hello"
    }
    hello(){
        var [l,j,k] = this.ok();

        console.log(l)
    }
    ok(){
        return ["ok","pp","dd"]
    }
}
var t = new test();
t.hello()
console.log("hello")