const express = require('express')
const app = express();
require('./db/config');
const User = require('./db/User');
const cors = require('cors');

// Here we are importing collection of products from products.js we can say we are importing the model
const Product = require('./db/Product');
app.use(cors());

// express.json() method is used to get data in proper json format
app.use(express.json())
// This code is to register new user in database
app.post('/register', async (req, res) => {
    try {
        let user = new User(req.body)
        let Createuser = await user.save();
        Createuser = Createuser.toObject();

        //Here we are removing password from stored variable so that password doesnt comes to us
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
app.get('/products',async (req,res)=>{
    let products = await Product.find()
    if(products.length>0){
        res.send(products)
    }
    else{
        res.send({result:"No products Found"})
    }
})
app.post('/add-product',async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})
app.get('/', (req, res) => {
    res.send("hello World")
})
app.listen(8000, () => {
    console.log("connected");
})