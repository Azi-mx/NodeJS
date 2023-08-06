const mongoose = require('mongoose');
const validator = require("validator");


//Here we have defined the Structure of Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Not proper"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Inavlid Email");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
})

//Here we have defined mode basically we will create a new collection
//Here there are some important things to keep in mind that collection name should start with a 
//capital letter and should be in a plural form
                                //Collection Name,Schema Name
const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;



