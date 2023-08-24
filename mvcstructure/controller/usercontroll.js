let userModel = require('../model/userModels')
let bcrypt = require('bcrypt');
const saltrounds = 10;

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
    res.render('form')
}

//This is to register user 
const getPostdata = async (req, res) => {
    const {username, email, password} = req.body;
    let checkuser = await userModel.findOne({email})

    if (req.body.password && req.body.username && req.body.email) {
        if (checkuser) {
            req.flash('info', 'Email is already registered')
            res.render('register', { message: req.flash('info') });
        }
        else {
            const crypted = await bcrypt.hash(password,saltrounds)
            const result = await userModel({
                id: 1,
                name: req.body.username,
                email: req.body.email,
                password: crypted
            })
            const res1 = await result.save();
            console.log('User saved successfully');
            console.log(res1);
            // res.send(res1)
            res.redirect('/admin/data')
        }
    }
}



const checkUserData = async (req, res) => {

    let user = await userModel.findOne({ email: req.body.email, password: req.body.password });
    console.log('User query result:', user);
    if (user) {
        // Your password comparison logic here
        res.cookie('Username', user.name);
        res.redirect('/admin/data');
    } else {
        req.flash('danger', 'Email or password wrong!')
        res.render('login', { message: req.flash('danger') });
    }

};

const checkLoginData = async (req, res) => {
    let user = await userModel.findOne({email:req.body.email})
    if(!user){
        res.send("User not found")
    }else{
        const isPasswordValid  = await bcrypt.compare(req.body.password, user.password)
       
    }
    res.redirect('/admin/data')
}

module.exports = { getDashboard, getPostdata, getForm, checkUserData,checkLoginData}