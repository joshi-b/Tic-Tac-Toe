window.onload = function init() {
    document.turn = "X";
    playerTurn(document.turn + " has the first turn.");
}

function playerTurn(message) {
    document.getElementById("message").innerText = message;
}

function gamePlay(box) {
    if (box.innerText == "") {
        box.innerText = document.turn;
        nextMove();
    } else {
        playerTurn("You can't play on a non-empty square.");
    }
}

function nextMove() {
    if (checkWin(document.turn)) {
        alert("Congratulations!\nPlayer " + document.turn + " won!");
        clearSlate();
    } else if (document.turn == "X") {
        document.turn = "O";
        playerTurn("It is " + document.turn + "'s turn.");
    } else {
        document.turn = "X";
        playerTurn("It is " + document.turn + "'s turn.");
    }
}

function checkWin(move) {
    var result = false;
    if (checkRow(1,2,3, move) ||
        checkRow(4,5,6, move) ||
        checkRow(7,8,9, move) ||
        checkRow(1,4,7, move) ||
        checkRow(2,5,8, move) ||
        checkRow(3,6,9, move) ||
        checkRow(1,5,9, move) ||
        checkRow(3,5,7, move)) {
            result = true;
        }
    return result;
}

function checkRow(a, b, c, move) {
    var result = false;
    if (getState(a) == move && getState(b) == move && getState(c) == move) {
        result = true;
    }
    return result;
}

function getState(number) {
    return document.getElementById("row-"+ number).innerText;
}

function clearSlate() {
    location.reload();
}
