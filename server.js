var express = require("express");
var exphbs = require("express-handlebars");
var routes = require("./routes");

var app = express();
var port = process.env.PORT || 5000;

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", routes.index);
app.get("/games", routes.games);

app.use("/", express.static(__dirname + "/public/"));

app.listen(port, function(err){
    if (err){
        console.error(err);
    }
    console.log("server running on port: " + port);
});
