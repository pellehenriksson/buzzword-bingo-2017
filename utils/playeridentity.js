var cookieParser = require("cookie-parser");
var uuid = require("node-uuid");

module.exports = function(req, res, next){

    console.log("Get the cookie");

    var cookie = req.cookies.buzzwordbingo;

    console.log("Cookie: " + cookie);

    if (cookie === undefined){
        console.log("Creating a cookie");
        
        var playerId = uuid.v4();
        var options = { maxAge: 1000 * 60 * 24, httpOnly: true, signed: false };
        res.cookie("buzzwordbingo", playerId, options);
        
        // set some fallback param here as well
    }

    next();
};