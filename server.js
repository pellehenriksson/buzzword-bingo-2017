var express = require("express");
var exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var uuid = require("node-uuid");

var playerIdentity = require("./utils/playeridentity");

var myGamesRoutes = require("./myGamesRoutes");
var playGameRoutes = require("./playGameRoutes"); // maybe pass the io in here !! 

var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

var port = process.env.PORT || 5000;

// -- middle ware ---------------------------------------------------
app.use(cookieParser());
app.use(playerIdentity);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/public/"));

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// -- socket --------------------------------------------------------
io.on("connection", function(socket){
   
    console.log("connected");
    
    socket.on("join", function(room){
        
        socket.join(room);
        
        console.log("joined room " + room);

        io.to(room).emit("gameEvent", { data: "slayer slayer" });

     });

    socket.on("leave", function(room){
        socket.leave(room);
    });

    socket.on("disconnect", function(){
        console.log("disconnect");
    });
});

// -- routes --------------------------------------------------------
app.get("/", myGamesRoutes.index);
app.get("/games", myGamesRoutes.games);
app.get("/games/list", myGamesRoutes.gamesList);
app.post("/games", myGamesRoutes.newGame);

app.get("/play/:id", playGameRoutes.index);
app.post("/play/:id/changeplayername", playGameRoutes.changePlayerName);
app.post("/play/:id/marksquare", playGameRoutes.markSquare);

// default when no matching route
app.use(function(req, res){
       res.redirect("/");
   });

// -- start server --------------------------------------------------
server.listen(port, function(err){
    if (err){
        console.error(err);
    }
    console.log("server running on port: " + port);
});
