// Import required modules
const express = require('express'); // Import the Express framework
const app = express(); // Initialize the Express app
require('./db/config'); // Import database configuration
const User = require('./db/User'); // Import the User model
const cors = require('cors'); // Import CORS for cross-origin support
const Jwt = require('jsonwebtoken'); // Import the JWT library for token handling
const jwtkey = 'e-comm'; // JWT secret key

// Import the Product model
const Product = require('./db/Product');

app.use(cors()); // Enable CORS for the app

// Middleware to parse incoming JSON data in requests
app.use(express.json());

// API endpoint to register a new user
app.post('/register', async (req, res) => {
    try {
        let user = new User(req.body); // Create a new User object based on request body
        let Createuser = await user.save(); // Save the user object in the database
        Createuser = Createuser.toObject();

        // Remove sensitive data (like password) before sending the response
        delete Createuser.password;

        if (Createuser) {
            // Generate a JWT token containing user data
            Jwt.sign({ Createuser }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ Createuser: "something went wrong" });
                }
                // Respond with user data and token
                res.send({ Createuser, auth: token });
            });
        }
    } catch (err) {
        res.status(400).send(err); // Handle registration error
    }
});

// API endpoint for user login
app.post('/login',async (req, res) => {
    if (req.body.password && req.body.email) {
        // Find user based on provided email and exclude password from result
        let user = await User.findOne(req.body).select('-password');

        if (user) {
            // Generate a JWT token for the authenticated user
            Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ user: "something went wrong" });
                }
                // Respond with user data and token
                res.send({ user, auth: token });
            });
        } else {
            res.send("no result found"); // No user found with the provided credentials
        }
    }
});

// API endpoint to fetch the list of products
app.get('/products', verifyToken,async (req, res) => {
    let products = await Product.find(); // Retrieve all products from the database
    if (products.length > 0) {
        res.send(products); // Respond with the list of products
    } else {
        res.send({ result: "No products Found" }); // No products available
    }
});

// API endpoint to add a new product
app.post('/add-product', verifyToken,async (req, res) => {
    let product = new Product(req.body); // Create a new Product object
    let result = await product.save(); // Save the product object in the database
    res.send(result); // Respond with the saved product data
});

// API endpoint to delete a product by ID
app.delete('/product/:id', verifyToken,async (req, res) => {
    let id = req.params.id; // Extract the product ID from the request parameters
    let result = await Product.deleteOne({ _id: id }); // Delete the product with the given ID
    res.send(result); // Respond with the deletion result
});

// API endpoint to get product details by ID
app.get('/product/:id', verifyToken, async (req, res) => {
    try {
        // Find a product using the provided ID from the URL parameter
        const result = await Product.findOne({ _id: req.params.id });

        if (result) {
            res.send(result); // Respond with the product details
        } else {
            res.status(404).send({ result: "No Product Found" }); // No product found with the provided ID
        }
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" }); // Handle internal server error
    }
});

// API endpoint to update a product by ID
app.put('/product/:id', verifyToken,async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id }, // Find the product by ID
        { $set: req.body } // Update the product with the provided data
    );
    res.send(result); // Respond with the update result
});

// API endpoint to search for products using a keyword
app.get('/search/:key', verifyToken, async (req, res) => {
    // Search for products based on various fields using regular expressions
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    res.send(result); // Respond with the search results
});

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
    let token = req.headers['authorization']; // Get the JWT token from the request header
    if(token){
        token = token.split(' ')[1]
        Jwt.verify(token,jwtkey,(err,valid)=>{
            if(err){
                res.status(401).send({result:"Please provide valid token"})
            }else{
                next(); // Proceed to the next middleware or route handler
            }
        })
    }
    else{
        res.send({result:"Please add token with header"})
    }
    console.log('middleware called', token); // Log token for verification
}

// Start the server on port 8000
app.listen(8000, () => {
    console.log("connected");
});
