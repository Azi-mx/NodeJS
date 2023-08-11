const express = require('express')
const app = express();
require('./db/config');
const User = require('./db/User');
const cors = require('cors');

app.use(cors())

app.use(express.json())
app.post('/register', async (req, res) => {
    try {
        let user = new User(req.body)
        let Createuser = await user.save();
        Createuser = Createuser.toObject();
        delete Createuser.password;
        res.status(200).send(Createuser)
    } catch (err) {
        res.status(400).send(err)
    }
})
app.post('/login', async (req, res) => {
    //Here we are checking that user have entered password and email only than it will check in mongodb
    if (req.body.password && req.body.email) {
        // Here we are getting the data what user have entered except password as we have used select function
        let user = await User.findOne(req.body).select('-password')
        if (user) {
            res.send(user)
        }
        else {
            res.send("no result found")
        }
    }
})
app.get('/', (req, res) => {
    res.send("hello World")
})
app.listen(8000, () => {
    console.log("connected");
})