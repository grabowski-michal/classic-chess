const http = require("http");
const socketio = require('socket.io');
const mongoose = require("mongoose");
const express = require('express')
const Models = require("./database/Models.js")(mongoose)
const Operations = require("./database/Operations.js");
const app = express()
const port = 3000;
const opers = new Operations();

app.use(express.static('staticDir'))

const server = http.createServer(app);
server.listen(port, () => {
    console.log("Classic Chess");
})

const io = socketio.listen(server);
let db;

mongoose.connect('mongodb://localhost/ClassicChess');
const connectToMongo = () => {
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
    console.log("Klient " + client.id + " pojawia się na serwerze!")
    client.on("disconnect", function () {
        console.log("Klient " + client.id + " wychodzi z serwera.")
        var waitingPlayer;

        for (var i = 0; i < zalogowani.length; i++) {
            if (zalogowani[i].id == client.id) {
                waitingPlayer = zalogowani[i].login;
            }
        }

        if (waitingPlayer != undefined) {
            opers.DeleteByWaitingPlayer(Models.FreeGame, waitingPlayer);
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
        console.log(user)

        io.sockets.to(client.id).emit("signup", {
            status: "został zarejestrowany.",
            user: data.login
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
