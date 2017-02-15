var express = require("express");

var app = express();
var port = process.env.PORT || 5000;

app.use("/", express.static(__dirname + "/public/"));

app.get("/", function(req, res){
    res.send("hello!");
});

app.listen(port, function(err){
    if (err){
        console.error(err);
    }
    console.log("server running on port: " + port);
});
