var express = require("express");
var exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var uuid = require("node-uuid");

var playerIdentity = require("./utils/playeridentity");

var myGamesRoutes = require("./myGamesRoutes");
var playGameRoutes = require("./playGameRoutes");

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
app.get("/", myGamesRoutes.index);
app.get("/games", myGamesRoutes.games);
app.get("/games/list", myGamesRoutes.gamesList);
app.post("/games", myGamesRoutes.newGame);

app.get("/play/:id", playGameRoutes.index);

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
