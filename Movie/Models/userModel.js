const mongoose = require('mongoose');
//This method returns a promise
const main  = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/movies",{useNewUrlParser:true})
        console.log("Connection Established Success");
    }catch(err){
        console.log(err);
    }
}
main();
const movieSchema = new mongoose.Schema({
    Movie_Id:Number,
    Name:String,
    Release_Date:String,
    PosterImage:String,
    NoOf_MainCharacters:Number
})
const movie = new mongoose.model('movie', movieSchema)

module.exports = movie


