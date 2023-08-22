const express = require('express');
const router = new express.Router();
const userModel = require('../Models/userModel');
const { getForm,edittdata,deldata} = require('../controller/userControll');
const body = require('body-parser');
const bodyParser = body.urlencoded({ extended: false })
const multer = require('multer');
const fs = require('fs')


let imgname = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        imgname = Date.now() + file.originalname;
        return cb(null, imgname);
    }
});
const upload = multer({ storage: storage });

router.get('/form', getForm);
router.get('/del/:id', deldata);
router.get('/edit/:id', edittdata);
router.post('/savedata', upload.single('image'), async (req, res) => {

    id = req.body.id;
    gamme = req.body.name;
   
    if (id != '') {
    user = await userModel.find({_id:id})

    let oldimg = (user.image != '') ? user.image : '';

        if (req.file && imgname != '') {
            let img = 'uploads/' + user.image
            fs.unlink(img, () => {
                console.log("deleted");
            })
        }
        // console.log("id is " + id)
        //update

        let finalUpdate = await userModel.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                Movie_Id: (user.length) + 1,
                Name: req.body.name,
                Release_Date: req.body.date,
                NoOf_MainCharacters: req.body.charactor,
                PosterImage: (req.file && imgname != '') ? imgname : oldimg
            }
        })
        console.log(finalUpdate)
    }
    else {
        if (gamme != '') {
            //push
            let ide = user.length + 1
            let data =  new userModel({
                Movie_Id: ide.toString(),
                Name: req.body.name,
                Release_Date: req.body.date,
                NoOf_MainCharacters: req.body.charactor,
                PosterImage: imgname
            })

            let b= await data.save();
            
        }
    }
    editdata = '';

    res.redirect('/form')

})





module.exports = router;