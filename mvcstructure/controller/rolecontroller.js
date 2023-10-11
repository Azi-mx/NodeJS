const rolemodel = require('../model/role')
const express = require('express');
   


const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());
let editrole=  '';
const roleData =async (req,res)=>{
    const getAllRole = await rolemodel.find();
    res.render('role',{
                    username: req.cookies.UserName,
                    getAllRole: getAllRole,
                    message:'',
                    editrole:editrole
            });
} 
const saverole = async (req,res)=>{
    let getAllRole = await rolemodel.find();
    const rolename = req.body.rolename;
    const checkName = await rolemodel.findOne({rolename:rolename})
    
    if(checkName){       
            req.flash('success', 'role already exists');
            res.render('role',{
                username: req.cookies.UserName,
                getAllRole: getAllRole,
                message: req.flash('success'),
                editrole:''
            });
    } else {
        const result = {
            role_name: rolename,
            isActive:1
        }
        const savedata = new rolemodel(result);
        await savedata.save();
        getAllRole = await rolemodel.find();
        req.flash('success', 'role added successfully');
        res.render('role',{
            username: req.cookies.UserName,
            getAllRole: getAllRole,
            message: req.flash('success'),
            editrole:''
        }); 
    }
}

const deleteRoleData = async (req,res)=>{
    const id = req.params.id;
    const data = await rolemodel.findByIdAndRemove({_id: id});
        if(data){
            res.redirect('/admin/roleForm')
        }
}

const editRoleData = async (req,res)=>{
    const id = req.params.id;
    getAllRole = await rolemodel.find();
    editrole = await rolemodel.findOne({_id: id});
    if(editrole){
        res.render('role',{
            username: req.cookies.UserName,
            getAllRole: getAllRole,
            message: '',
            editrole:editrole
        }); 
    }

}
const updaterole = async (req,res)=>{
    const id = req.params.id
    const rolename = req.body.rolename;
    const result = await rolemodel.findByIdAndUpdate({
            _id:id
    },
        {$set:{
            role_name:rolename
        }
    }
    )
    getAllRole = await rolemodel.find();
    req.flash('success', 'role updated successfully');
    if(result){
        res.render('role',{
            username: req.cookies.UserName,
            getAllRole: getAllRole,
            message: req.flash('success'),
            editrole:''
        }); 
    }

}

module.exports = {roleData,saverole,deleteRoleData,editRoleData,updaterole};