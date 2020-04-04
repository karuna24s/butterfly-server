//app.js will be the entry point for our server

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const axios = require("axios");
// const DarkSkyApiSecret = require("./keys").DarkSkyKey;

const port = process.env.PORT || 4001;
// const index = require("./routes/index");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// app.use(index);
app.use(express.static(__dirname + '/../../build'))

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

let interval;

//The socket parameter refers to the instance of the socket being passed from the client
io.on("connection", socket => {
  console.log("New client connected");

  socket.on("butterfly", data => {
    console.log("Server Data: ", data);
    io.sockets.emit("butterfly", data);
  });
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
