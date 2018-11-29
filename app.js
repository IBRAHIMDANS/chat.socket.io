var app = require('express')();
const bodyParser = require("body-parser");
const ent = require('ent');//proteger des injection sql ou javascript
// const cookieParser = require('cookie-parser');
const session = require("express-session");
var server = require('http').Server(app);
var io = require('socket.io')(server);

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({  resave : false,
  saveUninitialized: false,
  secret:'ssshhhhhh'}));

  server.listen(8080);


  app.get('/', function (req, res) {

    const session = req.session;
    res.sendFile(__dirname + '/index.html');

  });

  io.on('connection', function (socket,userr) {

    socket.on('new_user',(userr)=>{
      userr=ent.encode(userr)
      socket.username = userr;
      socket.broadcast.emit('new_user',userr);

    })
    socket.on('message',(data)=>{
      data= ent.encode(data);
      socket.broadcast.emit('message' , {pseudo : socket.username, message : data })
    })

  });
