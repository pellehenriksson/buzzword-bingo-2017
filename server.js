var express = require("express");
var exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var uuid = require("node-uuid");

var playerIdentity = require("./utils/playeridentity");
var routes = require("./routes");

var app = express();
var port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(playerIdentity);

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
