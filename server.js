var http = require("http");
var url = require('url');
var fs = require("fs");
var qs = require("querystring");
var Datastore = require('nedb');
var socketio = require('socket.io');
var mongoose = require("mongoose");

var Models = require("./database/Models.js")(mongoose)
var Operations = require("./database/Operations.js");

var opers = new Operations();
var UserCount = [];

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if (req.url == "/") { fs.readFile("staticDir/index.html", function (error, data) { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/style.css") { fs.readFile("staticDir/style.css", function (error, data) { res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/Game.js") { fs.readFile("staticDir/js/Game.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/Pawn.js") { fs.readFile("staticDir/js/Pawn.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/Main.js") { fs.readFile("staticDir/js/Main.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/Net.js") { fs.readFile("staticDir/js/Net.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/Piece.js") { fs.readFile("staticDir/js/Piece.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/Window.js") { fs.readFile("staticDir/js/Window.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/Canvas.js") { fs.readFile("staticDir/js/Canvas.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/Fireplace.js") { fs.readFile("staticDir/js/Fireplace.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/three.js") { fs.readFile("staticDir/libs/three.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/OrbitControls.js") { fs.readFile("staticDir/libs/OrbitControls.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/jquery.js") { fs.readFile("staticDir/libs/jquery.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/ColladaLoader.js") { fs.readFile("staticDir/libs/ColladaLoader.js", function (error, data) { res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/models/Pawn.xml") { fs.readFile("staticDir/models/Pawn.xml", function (error, data) { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/models/Knight.xml") { fs.readFile("staticDir/models/Knight.xml", function (error, data) { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/models/Bishop.xml") { fs.readFile("staticDir/models/Bishop.xml", function (error, data) { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/models/Rook.xml") { fs.readFile("staticDir/models/Rook.xml", function (error, data) { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/models/Queen.xml") { fs.readFile("staticDir/models/Queen.xml", function (error, data) { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/models/King.xml") { fs.readFile("staticDir/models/King.xml", function (error, data) { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/ww.png") { fs.readFile("staticDir/gfx/ww.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/wb.png") { fs.readFile("staticDir/gfx/wb.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/hw.png") { fs.readFile("staticDir/gfx/hw.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/hb.png") { fs.readFile("staticDir/gfx/hb.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/gw.png") { fs.readFile("staticDir/gfx/gw.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/gb.png") { fs.readFile("staticDir/gfx/gb.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/qw.png") { fs.readFile("staticDir/gfx/qw.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/qb.png") { fs.readFile("staticDir/gfx/qb.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/kw.png") { fs.readFile("staticDir/gfx/kw.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/kb.png") { fs.readFile("staticDir/gfx/kb.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/pw.png") { fs.readFile("staticDir/gfx/pw.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else if (req.url == "/pb.png") { fs.readFile("staticDir/gfx/pb.png", function (error, data) { res.writeHead(200, { 'Content-Type': 'image/gif; charset=utf-8' }); res.write(data); res.end(); })
            } else { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.write("<h2>Nie znaleziono strony</h2>"); res.end(); }
            break;
        case "POST":
            servResp(req, res);
            break;
    }

    function servResp() {
        var allData = "";
        req.on("data", function (data) {
            allData += data;
        })
        req.on("end", function (data) {
            var finishObj = qs.parse(allData);
            switch (finishObj.func) { }
        })
    }
})

server.listen(3000);
var io = socketio.listen(server);
console.log("Classic Chess");

mongoose.connect('mongodb://localhost/ClassicChess');
var db;

function connectToMongo() {
    db = mongoose.connection;
    db.on("error", function (err) {
        console.log("Mongo ma problem :(");
    });
    db.once("open", function () {
        console.log("Mongo jest podłączone i działa!");
        opers.DeleteAll(Models.FreeGame);
        opers.DeleteAll(Models.Game);
    });
    db.once("close", function () {
        console.log("Mongo zostało zamknięte.");
    });
}

connectToMongo();

var zalogowani = [];
var newGameId = 1;

io.sockets.on("connection", function (client) {
    console.log("Klient " + client.id + " sie podłączył")
    client.on("disconnect", function () {
        console.log("Klient " + client.id + " się rozłącza")
        var waitingPlayer;

        for (var i = 0; i < zalogowani.length; i++) {
            if (zalogowani[i].id == client.id) {
                waitingPlayer = zalogowani[i].login;
            }
        }

        if (waitingPlayer != undefined) {
            opers.DeleteByWaitingPlayer(Models.FreeGame, waitingPlayer, function (data) {});
        }

        for (var i = 0; i < zalogowani.length; i++) {
            if (zalogowani[i].id == client.id) {
                zalogowani.splice(i, 1);
            }
        }
    })    
	client.on("signup", function (data) {
        console.log("REJESTRACJA")
        var user = new Models.User({
            login: data.login,
            password: data.password,
            wins: 0,
            draws: 0,
            losses: 0,
            points: 0,
        });

        io.sockets.to(client.id).emit("signup", {
            status: "został zarejestrowany.",
            user: data.login
        });

        user.validate(function (err) {
            console.log(err);
        });

        opers.InsertOne(user);
    })
	client.on("login", function (data) {
	    console.log("LOGOWANIE");
	    var checking = false;
        for (var i = 0; i < zalogowani.length; i++) {
            if (zalogowani[i].login == data.login) {
                checking = true;
            }
        }
        if (checking == false) {
            var dane = {
                login: data.login,
                id: client.id
            }

            opers.SelectByLogin(Models.User, data.login, data.password, 1, function (data) {
                if (data.data.length > 0) zalogowani.push(dane);
                io.sockets.to(client.id).emit("login", data);
            })
        } else {
            var data1 = {
                status: "deny",
            }

            io.sockets.to(client.id).emit("login", data1);
        }
    })
    client.on("read", function (data) {
        console.log("emit to " + client.id)
        opers.SelectAll(Models.User, function (data) {
            io.sockets.to(client.id).emit("read", data);
        })
    })
    client.on("searchForGames", function (data) {
        opers.SelectAndLimit(Models.FreeGame, 1, function (data) {
            io.sockets.to(client.id).emit("searchForGames", data);
        })
    })
    client.on("addFreeGame", function (data) {
        var freegame = new Models.FreeGame({
            waitingPlayer: data.login
        });

        opers.InsertOne(freegame);
    })
    client.on("joinGame", function (data) {
        var me = data.login;
        opers.SelectAndLimit(Models.FreeGame, 1, function (data) {
            console.log(data.data[0].waitingPlayer);
            var whitePlayer, blackPlayer;
            var color = Math.round(Math.random());
            var gameId = newGameId;
            newGameId++;

            var dane = {
                gameId: gameId,
            }
            
            if (color == 0) {
                whitePlayer = data.data[0].waitingPlayer;
                blackPlayer = me;
                dane.yourColor = "black";
            } else {
                whitePlayer = me;
                blackPlayer = data.data[0].waitingPlayer;
                dane.yourColor = "white";
            }
            io.sockets.to(client.id).emit("joinGame", dane);

            if (color == 0) dane.yourColor = "white";
            else dane.yourColor = "black";

            var opponentsId;

            for (var i = 0; i < zalogowani.length; i++) {
                if (zalogowani[i].login == data.data[0].waitingPlayer) {
                    opponentsId = zalogowani[i].id;
                }
            }

            io.sockets.to(opponentsId).emit("joinGame", dane);

            var game = new Models.Game({
                gameId: gameId,
                whitePlayer: whitePlayer,
                blackPlayer: blackPlayer,
            });

            opers.DeleteFirst(Models.FreeGame);
            opers.InsertOne(game);
        })
    })

    client.on("turn", function (data) {
        var me;
        for (var i = 0; i < zalogowani.length; i++) {
            if (zalogowani[i].id == client.id) {
                me = zalogowani[i].login;
            }
        }
        var priorData = data;
        opers.SelectByGameId(Models.Game, data.gameId, 1, function (data) {
            console.log(data);
            if (priorData.color == "white") {
                console.log("white wykonal swoj ruch");
                var opponentsId;
                console.log(data.data[0].blackPlayer);
                for (var i = 0; i < zalogowani.length; i++) {
                    console.log(zalogowani[i]);
                    if (zalogowani[i].login == data.data[0].blackPlayer) {
                        opponentsId = zalogowani[i].id;
                    }
                }
                io.sockets.to(opponentsId).emit("turn", priorData);
            } else if (priorData.color == "black") {
                var opponentsId;
                console.log(data.data[0].whitePlayer);
                for (var i = 0; i < zalogowani.length; i++) {
                    console.log(zalogowani[i]);
                    if (zalogowani[i].login == data.data[0].whitePlayer) {
                        opponentsId = zalogowani[i].id;
                    }
                }
                io.sockets.to(opponentsId).emit("turn", priorData);
            }
        })
    })
    client.on("getForRegister", function (data) {
        opers.SelectAll(Models.User, function (data) {
            io.sockets.to(client.id).emit("getForRegister", data);
        })
    })
    client.on("setStatisticsForUser", function (data) {
        console.log("STATYSTYKI UPDATE");
        opers.UpdateStatistics(Models.User, data.user, data.wins, data.draws, data.losses, data.points);
    })
})