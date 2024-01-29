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

//socket io logic goes below
io.on("connection", function (socket) {
    console.log("A user connected: ", ++x);

    socket.on("disconnect", function () {
        console.log("A user disconnected", --x)
    })
})



http.listen(3000, () => {
    console.log(`Server started on ${3000}`)
})