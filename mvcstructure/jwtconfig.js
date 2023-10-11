const jwt = require('jsonwebtoken');

const secretKey = 'Afraz143';
const verifyToken = (req,res,next)=>{
    let token = JSON.parse(localStorage.getItem('userToken'));
    jwt.verify(token, secretKey, function(err, decoded) {
        if(err){
            res.redirect('/admin')
        } else {
            next();
        }   
      });
}

module.exports = verifyToken;