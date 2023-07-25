const http = require('http');

const server = http.createServer((req,res)=>{
    res.write("Server started")
    res.end()
}).listen(3000,"localhost",()=>{
    console.log("Server started")
})