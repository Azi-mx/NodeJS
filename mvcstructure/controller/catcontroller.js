const catModel = require('../model/catModel'); // Make sure you require your model

// Category Save

const savecat = async (req, res) => {
    try {
        const category = req.body.catname;
        const total = await catModel.countDocuments();

        const result = await new catModel({
            id: total + 1,
            name: category
        });

        await result.save();

        const getAll = await catModel.find({});
        console.log(getAll);

        // Render the 'form' template and pass 'getAll' data to it
        res.render('form', { username: 'AZIM', getAll: getAll ,message:'Category Added Succesfully',data:''});
        // res.redirect('/admin/form?getAll=' + JSON.stringify(getAll));

    } catch (error) {
        // Handle errors here
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
};

const delcat = async(req,res)=>{
    let id = req.params.id
    let data = await catModel.findByIdAndRemove({_id:id})
    console.log("Data Removed");
    res.redirect('/admin/form')
}
const showcat = async (req,res)=>{
    try{
    let id = req.params.id
    let data = await catModel.findOne({_id:id})
    // let name = data.name;
    const getAll = await catModel.find({});

    // console.log(data);
    // res.redirect('/admin/form?data=' + JSON.stringify(data));

    res.render('form', { username: 'AZIM', getAll: getAll ,message:'',data:data});
    }
    catch (error) {
        // Handle errors here
        console.error(error);
        res.status(500).send('Internal Server Error')
    }

}
const editcat = async (req,res)=>{
    let id = req.params.id;
    let name = req.body.catname;
    let data = await catModel.findByIdAndUpdate({_id:id},{$set:{name:name}})
    res.redirect('/admin/form')
}

module.exports = { savecat,delcat,showcat,editcat };
