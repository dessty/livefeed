const express = require('express');
const bodyParser = require('body-parser');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');
const cors = require('cors'); // added cors to prevent cross origin error

const app = express();
const port = process.env.PORT || 3001;
let socketOpen = false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}));

/**
 * Websocket API configuration for streaming 
 */
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['*']
  }
});
app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  socketOpen = true;
  console.log('a user has just connected');

  //
  socket.on('disconnect', () => {
    socketOpen = false;
    console.log('user disconnected');
  });

  //
  socket.on('new comment', (msg) => {
    io.emit('broadcast', msg);
  });
});



http.listen(4000, () => {
  console.log('listening on port 4000');
});



/**
 * DB API confiugration
 */
const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    response.send(result);
    console.log("==============broadcast", result);
    console.log(body.message)
    if (socketOpen) {
      io.emit('broadcast', body);
    }

    // res.send(`broadcast", ${result}`);
    // 
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    // console.log("/getComments -", result);
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});
