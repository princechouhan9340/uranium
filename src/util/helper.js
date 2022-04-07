let newDate = function(){
    const date = new Date();
    console.log(date);
}

let newMonth = () =>{
    let d = new Date();
    console.log(d.getMonth()+1)
}

let getBatchinfo = function(){
    let info = "Uranium,week 3,Day16th,the topic for today is Nodejs module system"
    console.log(info);
}

module.exports.newDate = newDate
module.exports.newMonth = newMonth
module.exports.getBatchinfo = getBatchinfo