module.exports = function (mongoose) {
    var Schema = mongoose.Schema;

    var userSchema = new Schema(
    {
        login: { type: String, required: true },
        password: { type: String, required: true },
        wins: { type: Number, required: true },
        draws: { type: Number, required: true },
        losses: { type: Number, required: true },
        points: { type: Number, required: true },
    });

    var freeGameSchema = new Schema({
        waitingPlayer: { type: String, required: true },
    })

    var gameSchema = new Schema(
    {
        gameId: { type: Number, required: true },
        whitePlayer: { type: String, required: true },
        blackPlayer: { type: String, required: true },
    });

    var models = {
        User: mongoose.model("User", userSchema),
        Game: mongoose.model("Game", gameSchema),
        FreeGame: mongoose.model("FreeGame", freeGameSchema),
    }

    return models;
}