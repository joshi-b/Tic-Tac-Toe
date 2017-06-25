function playerButton(turn) {
    var tempturn = turn.innerText;
    var tempturnArray = tempturn.split(" ");
    document.turn = tempturnArray[1];
    document.getElementById("start-menu").style.display = 'none';
    document.getElementById("message").style.display = 'block';
    playerTurn(document.turn + " has the first turn.");
    document.getElementById("gameBoard").style.display = 'table';
    document.getElementById("title").style.padding = "30px 30px 10px 30px";
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
        myAlert("Congratulations!","Player " + document.turn + " won!");
    } else if (noWinner()) {
        myAlert("Draw!", "Nobody won.");
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
    return document.getElementById("cell-"+ number).innerText;
}

function clearSlate() {
    location.reload();
    document.getElementById('messagebox').style.display = 'none';
    document.getElementById('messageoverlay').style.display = 'none';
}

function myAlert(header,message) {
    var messageoverlay = document.getElementById('messageoverlay');
    var messagebox = document.getElementById('messagebox');
    messageoverlay.style.display = "block";
    messagebox.style.left = (window.innerWidth/2) - (550 * .5)+"px";
    messagebox.style.top = "100px";
    messagebox.style.display = "block";
    document.getElementById('messageboxhead').innerHTML = header;
    document.getElementById('messageboxbody').innerHTML = message;
    document.getElementById('messageboxfoot').innerHTML = '<button onclick="clearSlate()">Start Over</button>';
}

function noWinner() {
    var result = false;
    if (getState(1) &&
        getState(2) &&
        getState(3) &&
        getState(4) &&
        getState(5) &&
        getState(6) &&
        getState(7) &&
        getState(8) &&
        getState(9)) {
            result = true;
        }
    return result;
}
