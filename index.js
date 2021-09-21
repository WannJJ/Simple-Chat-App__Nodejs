const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const {
  Server
} = require('socket.io')
const io = new Server(server)


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})


var user_id = 0;
io.on('connection', (socket) => {
  console.log("user connected");
  user_id += 1;
  io.emit('user-id', user_id);
  console.log(user_id);
  socket.on('on-chat', data => {
    console.log(data);

    io.emit('user-chat', data);

  })
});
server.listen(3000, () => {
  console.log('listening on port 3000');
})