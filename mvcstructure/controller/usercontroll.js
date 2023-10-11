let userModel = require('../model/userModels')
let catModel = require('../model/catModel')

let nodemailer = require('nodemailer')
const secretKey = 'Afraz143';
var jwt = require('jsonwebtoken');

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
    if (req.cookies && req.cookies.Username != 'AZIM') {
        return res.redirect('/')
    }
}
const getDashboard = async (req, res) => {
    // await checkin(req, res)
    res.render('index', { username: "AZIM" })
}


//This is to render the form 
const getForm = async (req, res) => {
    // await checkin(req, res)
    const getAll = await catModel.find({})
    res.render('form', { username: 'AZIM',message:'',getAll:getAll,data:'' });
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
                from: 'bagsariyaa@gmail.com',
                to: email,
                subject: 'Testing the nodemailer',
                text: "The email is succesfully recieved",
                html: '<p>This is a p tag</p>'
            }
            const crypted = await bcrypt.hash(password, saltrounds)
            let user = await userModel.find()
            let len = user.length;
            let result = await userModel({
                id: len+1,
                name: req.body.username,
                email: req.body.email,
                password: crypted,
                token:''
            })
            await transporter.sendMail(mailData);
            const res1 = await result.save();
            console.log('User saved successfully');
            console.log(res1);
            // res.send(res1)
            req.flash('info', 'You Have been registered Succesfully')
            var token = jwt.sign({result:result},secretKey);
            let _id = result._id;
            result = await userModel.findByIdAndUpdate({_id},{$set:{token:token}})
            res.render('login',{ message: req.flash('info') })
        }
    }
    else{
        req.flash('success', 'Please enter your name, email address and password')
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

    if (!req.body.email && !req.body.password) {
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
                res.render('index',{ username: req.cookies.Username})
                localStorage.setItem('userToken', JSON.stringify(user.token));
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
        req.flash('danger', 'Email is not registered! Please Register First!');
        res.render('otpverify', { message: req.flash('danger') });
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
        user.otp = otp
        user.save();
        res.render('otpverify.ejs',{message:req.body.email})
    }
    
}
const otpverify = async(req,res)=>{
    const otp = req.body.otp
    const hid = req.body.hid
    const user = await userModel.findOne({email:hid})
    if(user.otp == otp){
        res.render('recoverPass',{message:req.body.hid})
    }
    else{
        req.flash('danger', 'Please Enter correct OTP');
        res.render('otpverify', { message: req.flash('danger') });
    }
}

const changePass = async(req,res)=>{
    const hid = req.body.hid
    const password = req.body.password;
    const user = await userModel.findOne({email:hid})
    if(req.body.password){
        const crypted = await bcrypt.hash(password, saltrounds)
    user.password = crypted
    user.otp = ''
    user.save();
    res.redirect('/')
    }
    else{
        req.flash('danger', 'Please Enter Password First');
        res.render('recoverPass', { message: req.flash('danger') });
    }
}



module.exports = { getDashboard, getPostdata, getForm, checkLoginData, Otpgen, otpverify,changePass }