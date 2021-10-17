function Pawn(id, position, type, color, gameId) {

    var pawn;

    function init() {

        var Color;
        if (color == 'w') Color = "white"; else if (color == 'b') Color = "black";

        pawn = {
            id: id,
            position: position,
            type: type,
            color: Color,
            gameId: gameId,
            firstMove: false,
        }

        switch (type) {
            case "Pawn":
                pawn.src = "models/Pawn.xml";
                break;
            case "Rook":
                pawn.src = "models/Rook.xml";
                break;
            case "Bishop":
                pawn.src = "models/Bishop.xml";
                break;
            case "Knight":
                pawn.src = "models/Knight.xml";
                break;
            case "Queen":
                pawn.src = "models/Queen.xml";
                break;
            case "King":
                pawn.src = "models/King.xml";
                break;
        }

        if (type == "Pawn") pawn.enPassant = false;
    }

    init();

    this.get = function () {
        return pawn;
    }
}