const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url=='./'){
    res.end("Hello world from this side of the world");
    }else if(req.url == '/about'){
        res.end("Hello US from this side of the world");
    }
    else{
        res.writeHead(404)
        res.end("Sorry ");
    }
});
server.listen(8000,"localhost",()=>{
    console.log("Server running on port 8000");
})