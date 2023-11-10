const express = require('express');
const app = express();
const body = require('body-parser');
const routes = require('./routes/user');
app.use(express.json());
// ... (other code)
// app.use(routes)
app.use(express.static(__dirname))
app.set("view engine","ejs")
const pgsqlroutes = require('./routes/pgsqlroutes')
app.use(pgsqlroutes)

// Create the 'Movies' table

app.listen(8000, () => {
    console.log("File Running and port running 8000");
});
