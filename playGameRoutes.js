var JSX = require("node-jsx").install();
var React = require("react");
var ReactDOM = require("react-dom/server");
var gameRegistry = require("./models/gameRegistry");
var PlayGame = React.createFactory(require("./components/PlayGame.react"));

function PlayGameRoutes(io){

    this.io = io;

    function index (req, res){
        console.log("Get game with id: "+ req.params.id);
        var game = gameRegistry.get(req.params.id);

        console.log("Get board for player: " + req.cookies.buzzwordbingo);
        var board = game.getPlayerBoard(req.cookies.buzzwordbingo);
        
        if (!board){
            console.log("Player: '" + req.cookies.buzzwordbingo + "' has no board, creating new");
            board = game.buildBoard(req.cookies.buzzwordbingo);
        }
        
        var model = board.toModel();

        model.gameName = game.name;

        var opponents = game.getOpponentBoards(req.cookies.buzzwordbingo);
        var x = opponents.map(function(b){
            return b.toModel();
        });

        model.opponents = x;

        emitGameEvent(req.params.id);

        var markup = ReactDOM.renderToString(PlayGame({ data: model }));
        res.render("playgame", { markup: markup, state: JSON.stringify(model) });
    }

    function changePlayerName(req, res){
        console.log("Get game with id: "+ req.params.id);
        var game = gameRegistry.get(req.params.id);

        console.log("Get board for player: " + req.cookies.buzzwordbingo);
        var board = game.getPlayerBoard(req.cookies.buzzwordbingo);

        console.log("Set playername: '"+ req.body.name + "' on board: "+ board.id);
        board.setPlayerName(req.body.name);

        emitGameEvent(req.params.id);

        res.sendStatus(200);
    }

    function markSquare(req, res){
        console.log("Get game with id: "+ req.params.id);
        var game = gameRegistry.get(req.params.id);
        
        console.log("Get board for player: " + req.cookies.buzzwordbingo);
        var board = game.getPlayerBoard(req.cookies.buzzwordbingo);
        
        console.log("Mark square: " + req.body.squareId);
        board.markSquare(req.body.squareId);

        emitGameEvent(req.params.id);

        res.sendStatus(200);
    }

    function emitGameEvent(gameId){
        console.log("Emit event: 'gameEvent' for room:" + gameId);
        io.to(gameId).emit("gameEvent", { data: "slayer slayer" });
    }

    return {
        index: index,
        changePlayerName : changePlayerName,
        markSquare : markSquare
    };
}

module.exports = PlayGameRoutes;