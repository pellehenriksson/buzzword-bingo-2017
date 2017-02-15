var express = require("express");
var exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var uuid = require("node-uuid");

var playerIdentity = require("./utils/playeridentity");
var routes = require("./routes");

var app = express();
var port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(playerIdentity);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", routes.index);
app.get("/games", routes.games);
app.get("/games/list", routes.gamesList);
app.post("/games", routes.newGame);

app.use("/", express.static(__dirname + "/public/"));

app.listen(port, function(err){
    if (err){
        console.error(err);
    }
    console.log("server running on port: " + port);
});
