const rolemodel = require('../model/role')
const userModel = require('../model/userModels')
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
let nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'bagsariyaa@gmail.com',
        pass: 'snhtqcnqvkxjpmyg'
    },
    secure: true
})
const signupdetails = async (req, res) => {

    const { username, email, role_id, googleId } = req.body;
    let roleData = await rolemodel.find({ isActive: 1 });


    if (email && username && role_id) {
        let checkuser = await userModel.findOne({ email })
        let checkuserrole = await userModel.findOne({ role_id }).populate('role_id');


        if (checkuserrole) {
            if (checkuserrole.role_id.role_name == 'Admin') {
                req.flash('info', 'Admin is already registered!');
                res.render('logindetails', { message: req.flash('info'), roleData: roleData });
            } else if (checkuserrole.role_id.role_name == 'Manager') {
                const checkmanager = await userModel.find({ role_id });
                if (checkmanager.length == 2) {
                    req.flash('info', 'Two Managers have been already registered!');
                    res.render('logindetails', { message: req.flash('info'), roleData: roleData });
                }
                else {
                    let data = await userModel.findOneAndUpdate({ googelId: googleId }, {
                        $set: {
                            name: req.body.username,
                            email: req.body.email,
                            role_id: role_id
                        }
                    })
                    const mailData = {
                        from: 'bagsariyaa@gmail.com',
                        to: email,
                        subject: 'Testing the nodemailer',
                        text: "The email is succesfully recieved",
                        html: '<p>This is a p tag</p>'
                    }

                    await transporter.sendMail(mailData);
                    console.log('User saved successfully');
                    // res.send(res1)
                    req.flash('info', 'You Have been registered Succesfully')
                    // res.render('login', { message: req.flash('info') })
                    res.redirect('/admin/data')

                }

            }
            else if (checkuser) {
                req.flash('info', 'Email is already registered')
                res.render('logindetails', { message: req.flash('info'), roleData: roleData });
            }
        }
        else {
            let data = await userModel.findOneAndUpdate({ googelId: googleId }, {
                $set: {
                    name: req.body.username,
                    email: req.body.email,
                    role_id: role_id
                }
            })

            const mailData = {
                from: 'bagsariyaa@gmail.com',
                to: email,
                subject: 'Testing the nodemailer',
                text: "The email is succesfully recieved",
                html: '<p>This is a p tag</p>'
            }

            await transporter.sendMail(mailData);
            console.log('User saved successfully');
            // res.send(res1)
            req.flash('info', 'You Have been registered Succesfully')
            res.redirect('/admin/data')
        }
    }
    else {
        req.flash('success', 'Please enter your name, email address and password')
        res.render('logindetails', { message: req.flash('success'), roleData: roleData });
    }
}
module.exports = signupdetails