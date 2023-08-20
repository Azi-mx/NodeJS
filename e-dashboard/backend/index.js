const express = require('express')
const app = express();
require('./db/config');
const User = require('./db/User');
const cors = require('cors');
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

// Here we are importing collection of products from products.js we can say we are importing the model
const Product = require('./db/Product');
app.use(cors());

// express.json() method is used to get data in proper json format
app.use(express.json())
// This api/code is to register new USER in database
app.post('/register', async (req, res) => {
    try {
        let user = new User(req.body)
        let Createuser = await user.save();
        Createuser = Createuser.toObject();

        //Here we are removing password from stored variable so that password doesnt comes to us
        delete Createuser.password;
        if (Createuser) {
            Jwt.sign({Createuser},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({Createuser:"something went wrong"})
                }
                res.send({Createuser,auth:token})
            })
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

//API for login USER
app.post('/login', async (req, res) => {
    //Here we are checking that user have entered password and email only than it will check in mongodb
    if (req.body.password && req.body.email) {
        // Here we are getting the data what user have entered except password as we have used select function
        let user = await User.findOne(req.body).select('-password')
        if (user) {
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({user:"something went wrong"})
                }
                res.send({user,auth:token})
            })
        }
        else {
            res.send("no result found")
        }
    }
})
//Show products or product list
app.get('/products', async (req, res) => {
    let products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send({ result: "No products Found" })
    }
})
//Add Product
app.post('/add-product', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})
//delete Product from mongodb using deleteOne function of collection = Product.
app.delete('/product/:id', async (req, res) => {
    let id = req.params.id;
    // console.log(id);
    let result = await Product.deleteOne({ _id: id })
    res.send(result);
})

//To get a product details by using id
app.get('/product/:id', async (req, res) => {
    try {
        // Find a product using the provided ID from the URL parameter
        const result = await Product.findOne({ _id: req.params.id });
        // console.log(result);
        if (result) {
            // If a product with the provided ID is found, send it as a response
            res.send(result);
        } else {
            // If no product is found with the provided ID, send an error response
            res.status(404).send({ result: "No Product Found" });
        }
    } catch (error) {
        // If there's an error during the process, send an error response
        res.status(500).send({ error: "Internal Server Error" });
    }
});

//To update product this route:
app.put('/product/:id', async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
})
app.get('/search/:key',verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    res.send(result)
})

function verifyToken(req,res,next){
    const token = req.headers['authorization'];
    console.log('middleware called',token);
    next()
}
app.listen(8000, () => {
    console.log("connected");
})