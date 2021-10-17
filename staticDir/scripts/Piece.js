function Piece(pieceName) {
    var pieceModel;
    this.pawnData = 0;

    this.loadModel = function (url, callback) {
        var loader = new THREE.ColladaLoader();
        var data = this.pawnData;

        if (pieceName == "Bishop")
        {
            loader.load("models/Bishop.xml", function (collada) {

                pieceModel = collada.scene;
                pieceModel.scale.set(4, 4, 4);
                pieceModel.children[0].children[0].geometry.computeVertexNormals();
                pieceModel.pawnData = data;
               
                callback(pieceModel)
            })
        }
        else if (pieceName == "King") {
            loader.load("models/King.xml", function (collada) {

                pieceModel = collada.scene;
                pieceModel.scale.set(4, 4, 4);
                pieceModel.children[0].children[0].geometry.computeVertexNormals();
                pieceModel.pawnData = data;
                
                callback(pieceModel)
            })
        }
        else if (pieceName == "Knight") {
            loader.load("models/Knight.xml", function (collada) {

                pieceModel = collada.scene;
                pieceModel.scale.set(4, 4, 4);
                pieceModel.children[0].children[0].geometry.computeVertexNormals();
                pieceModel.pawnData = data;
                
                callback(pieceModel)
            })
        }
        else if (pieceName == "Pawn") {
            loader.load("models/Pawn.xml", function (collada) {

                pieceModel = collada.scene;
                pieceModel.scale.set(4, 4, 4);
                pieceModel.children[0].children[0].geometry.computeVertexNormals();
                pieceModel.pawnData = data;

                callback(pieceModel)
            })
        }
        else if (pieceName == "Queen") {
            loader.load("models/Queen.xml", function (collada) {

                pieceModel = collada.scene;
                pieceModel.scale.set(4, 4, 4);
                pieceModel.children[0].children[0].geometry.computeVertexNormals();
                pieceModel.pawnData = data;

                callback(pieceModel)
            })
        }
        else if (pieceName == "Rook") {
            loader.load("models/Rook.xml", function (collada) {

                pieceModel = collada.scene;
                pieceModel.scale.set(4, 4, 4);
                pieceModel.children[0].children[0].geometry.computeVertexNormals();
                pieceModel.pawnData = data;

                callback(pieceModel)
            })
        }
    }

    this.getModel = function () {
        return pieceModel
    }


    this.applyMaterial = function (color) {
        
    }

    this.updateModel = function () {
        //update
    }


    this.setPosition = function (x,y) {
        pieceModel.position.set(x,20,y)
    }
}