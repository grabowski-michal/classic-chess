module.exports = function () {
    var opers = {

        InsertOne: function (data) {
            data.save(function (error, data) {
                if (error) console.log("error: " + error);
                console.log(new Date() + "Pomyślnie dodano użytkownika o nazwie " + data.login + ".");
            })
        },

        SelectAll: function (Model, callback) {
            var obj = {};
            Model.find({}, function (err, data) {
                if (err) {
                    obj.data = err;
                } else {
                    obj.data = data;
                }
                callback(obj);
            })
        },

        SelectAndLimit: function (Model, count, callback) {
            var obj = {};
            Model.find({}, function (err, data) {
                if (err) obj.data = err;
                else obj.data = data;
                callback(obj);
            }).limit(count)
        },

        DeleteByWaitingPlayer: function (Model, waitingPlayer) {
            Model.deleteOne({ waitingPlayer: waitingPlayer }, function (err, data) {
                if (err) return console.error(err);
            })
        },

        DeleteAll: function (Model) {
            Model.deleteMany(function (err, data) {
                if (err) return console.error(err);
            })
        },

        DeleteById: function (Model, _id) {
            Model.deleteOne({ _id: _id }, function (err, data) {
                if (err) return console.error(err);
            })
        },

        DeleteFirst: function (Model) {
            Model.deleteOne({}, function (err, data) {
                if (err) return console.error(err);
            })
        },

        SelectByLogin: function (Model, login, password, count, callback) {
            var obj = {};
            Model.find({ login: login, password: password }, function (err, data) {
                if (err) {
                    obj.data = err;
                } else {
                    obj.data = data;
                }
                callback(obj);
            }).limit(count)
        },

        SelectByGameId: function (Model, gameId, count, callback) {
            var obj = {};
            Model.find({ gameId: gameId }, function (err, data) {
                if (err) {
                    obj.data = err;
                } else {
                    obj.data = data;
                }
                callback(obj);
            }).limit(count)
        },

        UpdateStatistics: function (Model, login, wins, draws, losses, points) {
            Model.update({ login: login }, { login: login, wins: wins, draws: draws, losses: losses, points: points }, function (err, data) {
                if (err) return console.error(err);
            })
        },
    }

    return opers;

}