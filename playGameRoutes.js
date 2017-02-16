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

        // set some fallback param here as well, if no cooke expect some other param
        var playerId = req.cookies.buzzwordbingo || req.params.buzzwordbingo;

        console.log("Get board for player: " + playerId);
        var board = game.getPlayerBoard(playerId);
        
        if (!board){
            console.log("Player: '" + playerId + "' has no board, creating new");
            board = game.buildBoard(playerId);
        }
        
        var model = board.toModel();

        model.gameName = game.name;

        var opponents = game.getOpponentBoards(playerId);
        var x = opponents.map(function(b){
            return b.toModel();
        });

        model.opponents = x;

        emitGameEvent(req.params.id, board.toModel());

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

        emitGameEvent(req.params.id,  board.toModel());

        res.sendStatus(200);
    }

    function markSquare(req, res){
        console.log("Get game with id: "+ req.params.id);
        var game = gameRegistry.get(req.params.id);
        
        console.log("Get board for player: " + req.cookies.buzzwordbingo);
        var board = game.getPlayerBoard(req.cookies.buzzwordbingo);
        
        console.log("Mark square: " + req.body.squareId);
        board.markSquare(req.body.squareId);

        emitGameEvent(req.params.id, board.toModel());

        res.sendStatus(200);
    }

    function emitGameEvent(gameId, model){
        console.log("Emit event: 'gameEvent' for room:" + gameId);
        io.to(gameId).emit("gameEvent", model);
    }

    return {
        index: index,
        changePlayerName : changePlayerName,
        markSquare : markSquare
    };
}

module.exports = PlayGameRoutes;