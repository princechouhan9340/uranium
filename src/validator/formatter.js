let trimfunction = function(){
    const text = "      Hello World!        ";
    console.log(text.trim());
}

let changetoLowerCase = function(){
    const text2 = "HELLO WORLD , GOOD MORNING!";
    console.log(text2.toLowerCase());
}

let changetoUpperCase = function(){
    const text3 = "hello world ,good night!";
    console.log(text3.toUpperCase());
}
module.exports.trimfunction = trimfunction
module.exports.changetoLowerCase = changetoLowerCase
module.exports.changetoUpperCase = changetoUpperCase