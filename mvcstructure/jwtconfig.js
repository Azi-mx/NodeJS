const jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const secretKey = 'Afraz143';

const verifyToken = (req,res,next)=>{
    let token = JSON.parse(localStorage.getItem('userToken'));
    jwt.verify(token, secretKey, function(err, decoded) {
        if(err){
            res.redirect('/admin/data')
        } else {
            next();
        }   
      });
}

module.exports = verifyToken;