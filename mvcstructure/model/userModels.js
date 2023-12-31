const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

//This method returns a promise
const main = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/employees", { useNewUrlParser: true })
    console.log("Connection Established Success");
  } catch (err) {
    console.log(err);
  }
}
main();
const empSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: {
    type: String,
    // unique: true,
    index: true, // Add an index to enforce uniqueness
  },
  password: String,
  otp: Number,
  token: String,
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'roleModel' },
  googleId: String
});

empSchema.plugin(findOrCreate)

const employee = new mongoose.model('employee', empSchema)

module.exports = employee
