const mongoose = require('mongoose')
//Creating connection and create new db
mongoose.connect("mongodb://localhost:27017/azimdatabase",{useNewUrlParser:true}).then(()=>{
    console.log("Connection succesfully established")
}).catch((err)=>console.log(err))
const playlistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true//Validation
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<18){
                throw new Error("Not valid")
            }
        }
    },
    job:String,
    date:{
        type:Date,
        default:Date.now
    }
})
//Collection creation
const Playlist = new mongoose.model("Playlist",playlistSchema)

//Creation of a document or insert a document using async await
//also creation of multiple documents
const createDocument = async ()=>{
    try{
        const firstPlaylist = new Playlist({
            name:"Rinkal",
            age:34,
            job:"Teacher"
        })
        const secondPlaylist = new Playlist({
            name:"Sachi",
            age:9,
            job:"Consultant"
        })
        const thirdPlaylist = new Playlist({
            name:"Megha",
            age:26,
            job:"Accountant"
        })
        const fourthPlaylist = new Playlist({
            name:"Sanket",
            age:24,
            job:"Teacher"
        })
        const result = await Playlist.insertMany([secondPlaylist,thirdPlaylist,fourthPlaylist]);
        console.log(result)
    }catch(err){
        console.log(err)
    }
    
}
// createDocument();

//reading document & 
const getDocument = async ()=>{
    try{
    const result = await Playlist
    //Comparison operator:
    // .find({age:24})
    // .find({age:{$gte:24}})
    // .find({job:{$in:["Teacher","Consultant"]}})
    // .find({job:{$nin:["Teacher","Consultant"]}})
    //logical Operator:
    // .find({$or:[{job:"Teacher"},{name:"Sachi"}]})
    // .find({$and:[{job:"Teacher"},{name:"Sanket"}]})
    // .find({$nor:[{job:"Teacher"},{name:"Sachi"}]})
    // .find({$not:[{job:"Teacher"},{name:"Rinkal"}]})
    .find()
    //To select how many records of the query u wanted to show
    .select({name:1})
    //To count documents in a collection
    // .countDocuments();

    //To get documents in order
    .sort({name:1});
    // .limit(1)
    console.log(result)
    }catch(err){
        console.log(err)
    }
}
// getDocument();
//Update using mongoose
const updateDocument = async (_id)=>{
    try{
        // const result =  await Playlist.updateOne({_id},{
        const result =  await Playlist.findByIdAndUpdate({_id},{

            $set:{
            name:"Lakshmi new"
           }
        },{useFindAndModify:false})
        console.log(result);
    }catch(err){
            console.log(err);
    }
   
}
// updateDocument("64c8002fbd11e344f566d5b9");

//Delte Document using mongoose
const DeleteDoc = async(_id)=>{
    try{
        let result = await Playlist.deleteOne({_id})
    }catch(err){
        console.log(err);
    }
}
// DeleteDoc("64c8002fbd11e344f566d5b9")