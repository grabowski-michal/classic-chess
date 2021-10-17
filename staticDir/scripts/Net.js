function Net() {
    var client = io();
    var window = new Window();
    this.window = window;

    function init() {
        client.on("read", function (data) {
            var check = false;
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].login == "admin") {
                    check = true;
                }
            }
            if (!check) {
                net.signup("admin", "admin");
            }
        })
        client.on("getForRegister", function (data) {
            var check = false;
            if (data != undefined) {
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].login == document.getElementById("user_reg").value) {
                        check = true;
                    }
                }
                if (check == true) {
                    window.showWindow("Taki użytkownik już istnieje!");
                } else {
                    net.signup(document.getElementById("user_reg").value, document.getElementById("pass_reg").value);
                }
            }
        })
        client.on("signup", function (data) {
            if (data != undefined) {
                window.showWindow(data.user + " " + data.status);
            }
        })
        client.on("login", function (data) {
            if (data.status != "deny") {
                if (data.data.length > 0) {
                    window.showWindow("Zalogowano.");
                    main.zalogowano(data.data[0].login);
                    main.setStatistics(data.data[0].wins, data.data[0].draws, data.data[0].losses, data.data[0].points);
                } else {
                    window.showWindow("Nieprawidłowe hasło bądź nazwa użytkownika");
                }
            } else {
                window.showWindow("Taki użytkownik jest właśnie zalogowany");
            }
        })
        client.on("searchForGames", function (data) {
            if (data.data.length <= 0) { // Stwórz własną wolną grę
                net.addFreeGame(main.getNick());
            } else { // Dołącz do pierwszej wolnej gry
                net.joinGame(main.getNick());
            }
        })
        client.on("joinGame", function (data) {
            // console.log(data);
            game.setGameId(data.gameId);
            game.setYourColor(data.yourColor);
            game.turnTheGameOn();
            main.createPawns();
            document.getElementById("bariera").style.display = "none";
            document.getElementById("checkChecker").style.display = "initial";
            var string;
            console.log(data);
            if (data.yourColor == "white") { string = "białymi.<br/>Twój ruch."; main.setCameraPosition(-600, 600, 0); }
            if (data.yourColor == "black") { string = "czarnymi.<br/>Ruch przeciwnika."; main.setCameraPosition(600, 600, 0); }
            window.onlyHalfly();
            window.showWindow("Grasz "+string);
            document.getElementById("checkText").innerHTML = document.getElementById("check").innerHTML;
        })
        client.on("turn", function (data) {
            game.opponentMove(data.pawn, data.xDes, data.yDes, data.enPassant, data.casting);
            if (game.isGameEnabled() == true) {
                var string;
                if (game.getYourColor() == "white") string = "białymi.<br/>Twój ruch.";
                if (game.getYourColor() == "black") string = "czarnymi.<br/>Twój ruch.";
                window.showWindow("Grasz " + string);
            }
            document.getElementById("checkText").innerHTML = document.getElementById("check").innerHTML;
        })
    }

    init();

    this.getForRegister = function () {
        client.emit("getForRegister", {})
    }

    this.signup = function (user, pass) {
        client.emit("signup", {
            login: user,
            password: pass,
        })
    }

    this.checkAdmin = function () {
        client.emit("read", {})
    }

    this.login = function (user, pass) {
        client.emit("login", {
            login: user,
            password: pass,
        })
    }

    this.searchForGames = function () {
        client.emit("searchForGames", {});
    }

    this.addFreeGame = function (login) {
        client.emit("addFreeGame", {
            login: login,
        });
    }

    this.joinGame = function (login) {
        client.emit("joinGame", {
            login: login,
        });
    }

    this.turn = function (pawn, xDes, yDes, enPassant, casting, color, gmid) {
        client.emit("turn", {
            pawn: pawn,
            xDes: xDes,
            yDes: yDes,
            enPassant: enPassant,
            casting: casting,
            color: color,
            gameId: gmid,
        });
    }

    this.setStatisticsForUser = function (user, wins, draws, losses, points) {
        client.emit("setStatisticsForUser", {
            user: user,
            wins: wins,
            draws: draws,
            losses: losses,
            points: points,
        });
    }
}