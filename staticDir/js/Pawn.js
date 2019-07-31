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
                pawn.src = "Pawn.xml";
                break;
            case "Rook":
                pawn.src = "Rook.xml";
                break;
            case "Bishop":
                pawn.src = "Bishop.xml";
                break;
            case "Knight":
                pawn.src = "Knight.xml";
                break;
            case "Queen":
                pawn.src = "Queen.xml";
                break;
            case "King":
                pawn.src = "King.xml";
                break;
        }

        if (type == "Pawn") pawn.enPassant = false;
    }

    init();

    this.get = function () {
        return pawn;
    }
}