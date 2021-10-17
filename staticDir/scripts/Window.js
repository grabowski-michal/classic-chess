function Window() {
    document.getElementById("close").addEventListener("click", function () {
        hideWindow();
    })

    var onlyHalf = false;

    hideWindow = function () {
        document.getElementById("window").style.top = "-18vh";
    }

    this.hideWindow = hideWindow;

    this.onlyHalfly = function () {
        document.getElementById("window").style.top = "-9vh";
        document.getElementById("text").style.top = "11vh";
        onlyHalf = true;
    }

    this.showWindow = function (text) {
        if (text != undefined) document.getElementById("text").innerHTML = text;
        if (onlyHalf == false) document.getElementById("window").style.top = "0";
        else { document.getElementById("window").style.top = "-9vh"; document.getElementById("text").style.top = "11vh"; }
    }
}

function checkChecker() {
    this.showWindow = function (text) {
        if (text != undefined) document.getElementById("text").innerHTML = text;
    }
}