function Filter(nameList, keyword){
    signList = []
    for (const key of nameList.keys()){
        if(FilterEach(nameList[key],keyword)){
            signList[key] = 1
        }
        else{
            signList[key] = 0
        }
    }
    return signList
}

function FilterEach(name, keyword){
    if(name.toUpperCase().indexOf(keyword.toUpperCase()) == -1){
        return 0
    }
    else{
        return 1
    }
}
 module.exports = Filter