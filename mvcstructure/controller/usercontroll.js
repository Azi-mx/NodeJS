let userModel = require('../model/userModels')
let nodemailer = require('nodemailer')
let bcrypt = require('bcrypt');
const saltrounds = 10;
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'bagsariyaa@gmail.com',
        pass: 'snhtqcnqvkxjpmyg'
    },
    secure: true
})
const checkin = async (req, res) => {
    if (req.cookies && req.cookies.Username != 'admin') {
        return res.redirect('/')
    }
}
const getDashboard = async (req, res) => {
    await checkin(req, res)
    res.render('index', { username: req.cookies.Username })
}


//This is to render the form 
const getForm = async (req, res) => {
    await checkin(req, res)
    res.render('form', { username: req.cookies.Username,message:'' })
}

//This is to register user 
const getPostdata = async (req, res) => {
    const { username, email, password } = req.body;
    let checkuser = await userModel.findOne({ email })

    if (email && username && password) {
        if (checkuser) {
            req.flash('info', 'Email is already registered')
            res.render('register', { message: req.flash('info') });
        }
        else {
            const mailData = {
                from: 'bagsariyaan@gmail.com',
                to: email,
                subject: 'Testing the nodemailer',
                text: "The email is succesfully recieved",
                html: '<p>This is a p tag</p>'
            }
            const crypted = await bcrypt.hash(password, saltrounds)
            const result = await userModel({
                id: 1,
                name: req.body.username,
                email: req.body.email,
                password: crypted
            })
            await transporter.sendMail(mailData);
            const res1 = await result.save();
            console.log('User saved successfully');
            console.log(res1);
            // res.send(res1)
            res.redirect('/admin/data')
        }
    }
    else{
        req.flash('success', 'Please enter your email address and password')
        res.render('register', { message: req.flash('success') });
    }
}



// const checkUserData = async (req, res) => {

//     let user = await userModel.findOne({ email: req.body.email, password: req.body.password });
//     console.log('User query result:', user);
//     if (user) {
//         // Your password comparison logic here
//         res.cookie('Username', user.name);
//         res.redirect('/admin/data');
//     } else {
//         req.flash('danger', 'Email or password wrong!')
//         res.render('login', { message: req.flash('danger') });
//     }

// };

const checkLoginData = async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })

    if (!req.body.email && req.body.password) {
        req.flash('danger', 'Please Enter Email and Password');
        res.render('login', { message: req.flash('danger') });
    } else {
        if (!user) {
            req.flash('danger', 'Email is not registered! Please Register First!');
            res.render('login', { message: req.flash('danger') });
        } else {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordValid) {
                req.flash('danger', 'Email or password wrong!')
                res.render('login', { message: req.flash('danger') });
            }
            else {
                res.cookie('Username', user.name);
                res.render('/admin/data')
            }
        }
    }
}

//Otp generating function 
function generateOTP() {
    const otpLength = 6;
    let otp = '';

    for (let i = 0; i < otpLength; i++) {
        const digit = Math.floor(Math.random() * 10);
        otp += digit.toString();
    }

    return otp;
}

//Here otp is sent to the user
const Otpgen = async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        res.send("User not found")
    } else {
        otp = generateOTP();
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: 'bagsariyaa@gmail.com',
                pass: 'snhtqcnqvkxjpmyg'
            },
            secure: true
        })
        const mailData = {
            from: 'bagsariyaan@gmail.com',
            to: req.body.email,
            subject: 'Testing the nodemailer',
            text: "OTP for verification",
            html: `<p>Your Otp for ${req.body.email} is ${otp}</p>`
        }
        
        await transporter.sendMail(mailData);
        res.render('otpverify.ejs',{message:req.body.email})
    }
    
}
const otpverify = async(req,res)=>{
    const otp = req.body.otp
    const hid = req.body.hid
    const user = await userModel.findOne({email:hid})
    console.log(user);
    
}

module.exports = { getDashboard, getPostdata, getForm, checkLoginData, Otpgen, otpverify }