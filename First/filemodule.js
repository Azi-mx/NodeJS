const fs  = require('fs');

fs.writeFile("./text.txt","hello world",()=>{
    return console.log("hello world")
});

