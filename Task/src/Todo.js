const express = require('express');
const app = express();

app.set('view engine',"ejs");

app.get('/', (req, res) => {
  res.render('Todo');
});

app.listen(8000,()=>console.log("Server 8000 running"))