const express = require('express');
const router = new express.Router();
const userModel = require('../Model/userModel');
const { getForm } = require('../controller/userControll');
const body = require('body-parser');
const bodyParser = body.urlencoded({ extended: false })
const multer = require('multer');

router.get('/form', getForm)
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
const { data, deldata, editdata } = require("../controllers/user");
router.get('/form', data);
router.get('/del/:id', deldata);
router.get('/edit/:id', editdata);
router.post('/savedata', upload.single('image'), async (req, res) => {
    id = req.body.id;
    gamme = req.body.name;
    editdata = '';
    editdata = userModel.find((i) => i.id == id)
    let oldimg = (imgname != '') ? imgname : '';


    if (id != '') {
        if (req.file && imgname != '') {
            let img = 'uploads/' + editdata.image
            fs.unlink(img, () => {
                console.log("deleted");
            })
        }
        // console.log("id is " + id)
        //update

        userModel.find((i) => {
            if (i.id == id) {
                i.name = req.body.name;
                i.age = req.body.age
                i.image = (req.file && imgname != '') ? imgname : oldimg;
            }


        })

        let finalUpdate = await userModel.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                id: (user.length) + 1,
                moviename: req.body.name,
                date: req.body.date,
                charactor: req.body.charactor,
                image: (imgname != undefined) ? imgname : oldimg
            }
        })
        console.log(finalUpdate)
    }
    else {
        if (gamme != '') {
            //push
            let ide = userModel.length + 1
            let data = {
                id: ide.toString(),
                name: req.body.name,
                age: req.body.age,
                image: imgname
            }

            userModel.save(data);
            
        }
    }
    editdata = '';

    res.redirect('/form')

})





module.exports = router;