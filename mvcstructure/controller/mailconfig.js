
let nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    auth:{
        user:'bagsariyaa@gmail.com',
        pass:'snhtqcnqvkxjpmyg'
    },
    secure:true
})