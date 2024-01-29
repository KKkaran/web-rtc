const app = require("express")();
const http = require('http').Server(app);
const path = require("path");
var io = require("socket.io")(http);
let x = 0;

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

//socket io logic goes below
io.on("connection", function (socket) {
    console.log("A user connected: ", ++x);

    setTimeout(() => {
        socket.send("Sent message from the server.")
        socket.emit("event1", {counter: x})
    }, 3000);

    socket.on("disconnect", function () {
        console.log("A user disconnected", --x)
    })
})



http.listen(3000, () => {
    console.log(`Server started on ${3000}`)
})