let catModel = require('../model/catModel')
//Category Save
const savecat = async(req,res)=>{
    let category = req.body.catname;
    let total = await catModel.countDocuments()
    const result = await new catModel({
        id:total+1,
        name:category
    })
    await result.save();
    const getAll = await catModel.find({})
    console.log(getAll);
    res.render('form', { username: 'AZIM' },{getAll:getAll})
}
module.exports = { savecat}
