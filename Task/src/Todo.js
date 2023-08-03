const express = require('express');
const app = express();
const body = require('body-parser')
const path = require('path')
const mainpath = path.join(__dirname,"../Public");
app.use(express.static(mainpath));
const bodyparser = body.urlencoded({extended:false})
app.set('view engine',"ejs");
let editdata = '';

let tasks = [
  {
    id:1,
    task:"Football"
  },
  {
    id:2,
    task:"Cricket"
  },
  {
    id:3,
    task:"Volleyball"
  }
]
app.get('/', (req, res) => {
  res.render('Todo',{
    tasks:tasks,
    editdata:editdata

  });
});


app.get('/del/:id',(req,res)=>{
  let id = req.params.id;
  id = id-1;
  tasks.splice(id,1);
  let j=1;
  tasks.forEach((i)=>{
    i.id = j
    j++;
  })
  res.redirect('/');
})


app.post('/savedata',bodyparser,(req,res)=>{
    id = req.body.id;
    // console.log(id)
    if(id != ''){
      console.log('y');
      tasks.find((i)=>{
        if(i.id==id){
          i.task = req.body.name
        }
      })
    }
    else{
      console.log('yes')
      let data  = {
        id:tasks.length + 1,
        task:req.body.name
      }
      tasks.push(data)
    }
    console.log(tasks)

    editdata = ''
    res.render('Todo',{
      tasks:tasks,
      editdata:editdata
    })
})


app.get('/edit/:id',(req,res)=>{
  let id = req.params.id;
  editdata = tasks.find((i)=>i.id==id)
  res.render('Todo',{
    tasks:tasks,
    editdata:editdata
  })
})
app.listen(8000,()=>console.log("Server 8000 running"))