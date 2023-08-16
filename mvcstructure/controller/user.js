const getuser = async(req,res)=>{
    res.send("getuser called");
}

const getuserData = async()=>{
    console.log("getuserData called");
}
module.exports = {getuser, getuserData}