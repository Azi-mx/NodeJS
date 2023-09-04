const express = require('express')
const flash = require('connect-flash')

const cookie = require('cookie-parser');
const app = express();
const http = require('http');


const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})



const session = require('express-session');
app.use(cookie())
const router = require('./routes/user');
app.use(session({
    secret: 'testSecret',
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(flash())
app.use(router);
app.use(express.static(__dirname))


 
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    res.render('login',{message:''});
})

app.get('/chat', (req, res) => {
    res.render('chat');
  });



app.get('/logout',(req,res)=>{
    res.clearCookie('Username')
    res.redirect('/')
})

app.get('/register',(req,res)=>{
    res.render('register',{message:''})
})
app.listen(8080,()=>{
    console.log('listened on port 8080');
})


