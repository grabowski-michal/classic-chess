module.exports = function () {

    var opers = {

        InsertOne: function (data) {
            data.save(function (error, data, dodanych) {
                console.log("dodano " + data)
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

        DeleteByWaitingPlayer: function (Model, waitingPlayer, callback) {
            Model.remove({ waitingPlayer: waitingPlayer }, function (err, data) {
                if (err) return console.error(err);
            })
        },

        DeleteAll: function (Model) {
            Model.remove(function (err, data) {
                if (err) return console.error(err);
            })
        },

        DeleteById: function (Model, _id) {
            Model.remove({ _id: _id }, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
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