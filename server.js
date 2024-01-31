const app = require("express")();
const http = require('http').Server(app);
const path = require("path");
var io = require("socket.io")(http);

app.get("/", (req, res) => {

    var options = {
        root: path.join(__dirname)
    }
    var fileName = 'index.html';
    return res.sendFile(fileName, options)
})

app.get("/admin", (req, res) => {
    return res.send("Karan SOdhi")
})
var users = 0;
//socket io logic goes below
io.on("connection", function (socket) {
    console.log("User Joined.")
    
    //io.sockets.emit("userUpdate", ++users);
    socket.emit("newUser", "Hi Welcome bro")
    socket.broadcast.emit("newUser", ++users)
    socket.on("disconnect", function () {
        console.log("user disconnected.")
        socket.broadcast.emit("newUser", --users);
    })
    






















    // console.log("A user connected: ", ++x);
    
    // setTimeout(() => {
    //     socket.send("Sent message from the server.")
    //     socket.emit("event1", {counter: x})
    // }, 3000);
    
    // socket.on("event2", function (data) {
    //         console.log(data.counter)
    // })
    
    // socket.on("msgSent", (text) => {
    //     console.log(text)
    // })
})



http.listen(3000, () => {
    console.log(`Server started on ${3000}`)
})