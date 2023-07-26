const fs = require("fs")
const http = require("http")

http.createServer((req, res) => {
    const rstream = fs.createReadStream("inputs.txt")

    //2nd method
    // rstream.on("data",(chunk)=>{
    //     res.write(chunk)
    // })
    // rstream.on("end",()=>{
    //     res.end()
    // })


    //3rd Method
    rstream.pipe(res)

}).listen(8000,"localhost");
