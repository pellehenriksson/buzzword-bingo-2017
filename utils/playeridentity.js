var cookieParser = require("cookie-parser");
var uuid = require("node-uuid");

module.exports = function(req, res, next){
    var cookie = req.cookies.buzzwordbingo;

    if (cookie === undefined){
        var playerId = uuid.v4();
        var options = { maxAge: 1000 * 60 * 24, httpOnly: true, signed: false };
        res.cookie("buzzwordbingo", playerId, options);
        req.params.buzzwordbingo = playerId; //fallback
    }
    next();
};