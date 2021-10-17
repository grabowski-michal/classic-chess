function Canvas(x, y) {

    var canvas, context;
    var width = 300;
    var height = 400;

    function init() {
        canvas = document.createElement("canvas");
        canvas.width = width; // bez px;
        canvas.height = height; // bez px;
        canvas.style.position = "absolute";
        canvas.style.left = x + "vmin";
        canvas.style.top = y + "vmin";
        canvas.style.background = "rgba(0, 0, 0, 0)";
        canvas.style.width = "66vmin";
        canvas.style.height = "100vh";
        canvas.style.pointerEvents = "none";
        context = canvas.getContext("2d");
    }

    init();

    this.canvas = function () {
        return canvas;
    }
    this.context = function () {
        return context;
    }

    this.canvasUpdate = function (user, wins, draws, losses, points) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.font = "15px Tahoma";
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fillText("Użytkownik: " + user, 0, 20);
        context.fillText("Wygranych: " + wins, 0, 40);
        context.fillText("Remisów: " + draws, 0, 60);
        context.fillText("Przegranych: " + losses, 0, 80);
        context.fillText("Punktów: " + points, 0, 100);
    }
}