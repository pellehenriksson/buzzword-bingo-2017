var express = require("express");
var exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var uuid = require("node-uuid");

var playerIdentity = require("./utils/playeridentity");

var gameRoutes = require("./gameRoutes");
var playRoutes = require("./playRoutes");

var app = express();
var port = process.env.PORT || 5000;

// -- middle ware ---------------------------------------------------
app.use(cookieParser());
app.use(playerIdentity);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/public/"));

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// -- routes --------------------------------------------------------
app.get("/", gameRoutes.index);

app.get("/games", gameRoutes.games);
app.get("/games/list", gameRoutes.gamesList);
app.post("/games", gameRoutes.newGame);

app.get("/play/:id", playRoutes.index);

// default when no matching route
app.use(function(req, res){
       res.redirect("/");
   });

// -- start server --------------------------------------------------
app.listen(port, function(err){
    if (err){
        console.error(err);
    }
    console.log("server running on port: " + port);
});
