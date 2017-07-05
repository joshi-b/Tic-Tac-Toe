var human = true;
var game = true;

var huPlayer;
var aiPlayer;

var one = document.getElementById("cell-1");
var two = document.getElementById("cell-2");
var three = document.getElementById("cell-3");
var four = document.getElementById("cell-4");
var five = document.getElementById("cell-5");
var six = document.getElementById("cell-6");
var seven = document.getElementById("cell-7");
var eight = document.getElementById("cell-8");
var nine = document.getElementById("cell-9");

function playerButton(turn) {
    var tempturn = turn.innerText;
    var tempturnArray = tempturn.split(" ");
    document.turn = tempturnArray[1];

    document.getElementById("start-menu").style.display = 'none';
    document.getElementById("message").style.display = 'block';
    msg(document.turn + " has the first turn.");
    document.getElementById("gameBoard").style.display = 'table';
    document.getElementById("title").style.padding = "30px 30px 0px 30px";

    msg("It is "+  document.turn + "'s turn.");
    setPlayers();
}

function setPlayers() {
    if (document.turn == "X") {
        huPlayer = "X";
        aiPlayer = "O";
    } else {
        huPlayer = "O";
        aiPlayer = "X";
    }
}

function changeTurn() {
    if (!human) {
        human = true;
        msg("It is "+ huPlayer + "'s turn.");
    } else {
        human = false;
        msg("It is " + aiPlayer + "'s turn.");
        setTimeout(callAI, 1000);

    }
}

function msg(message) {
    document.getElementById("message").innerText = message;
}

function reset() {
    location.reload();
    document.getElementById("messagebox").style.display = "none";
    document.getElementById("messageoverlay").style.display = "none";
    game = true;
}

function gamePlay(clicked) {
    if (human && game) {
        if (clicked.innerText == "") {
            clicked.innerText = huPlayer;
            changeTurn();
        } else {
            msg("You can't play there, try again.");
            return
        }
        if (checkWin(huPlayer)) {
            gameAlert("Congratulations!", "Player "+ huPlayer + " won!");
            game = false;
        } else if (checkDraw()) {
            gameAlert("Draw!", "Nobody won.");
        }
    }
}

function callAI() {
    if (!human && game) {
        bestMove();

        if (checkWin(aiPlayer)) {
            gameAlert("Congratulations!","Player " + aiPlayer + " won!");
            game = false;
        } else if (checkDraw()) {
            gameAlert("Draw!", "Nobody won.");
        }
        changeTurn();
    }
}

function getState(number) {
    return document.getElementById("cell-"+ number).innerText;
}

function gameAlert(header, message) {
    var messageoverlay = document.getElementById("messageoverlay");
    var messagebox = document.getElementById("messagebox");
    var messagearea = document.getElementById("message");
    messageoverlay.style.display = "block";
    messagebox.style.left = (window.innerWidth/2) - (550 * .5)+"px";
    messagebox.style.top = "80px";
    messagebox.style.display = "block";
    messagearea.style.display = "none";
    document.getElementById("messageboxhead").innerHTML = header;
    document.getElementById("messageboxbody").innerHTML = message;
    document.getElementById("messageboxfoot").innerHTML = '<button onclick="reset()">Start Over</button>';
}

function checkDraw() {
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

function checkRow(a,b,c, player) {
    var result = false;
    if (getState(a) == player && getState(b) == player && getState(c) == player) {
        result = true;
    }
    return result;
}

function checkWin(player) {
    var result = false;
    if (checkRow(1,2,3,player) ||
        checkRow(4,5,6,player) ||
        checkRow(7,8,9,player) ||
        checkRow(1,4,7,player) ||
        checkRow(2,5,8,player) ||
        checkRow(3,6,9,player) ||
        checkRow(1,5,9,player) ||
        checkRow(3,5,7,player)) {
            result = true;
        }
        return result;
}

function bestMove() {
    if (one == null && ((three.innerText == huPlayer && two.innerText == huPlayer) || (nine.innerText == huPlayer && five.innerText == huPlayer) || (seven.innerText == huPlayer && four.innerText == huPlayer))) {
        document.getElementById("cell-1").innerHTML = aiPlayer;
    } else {
        if (two.innerText == "" && ((one.innerText == huPlayer && three.innerText == huPlayer) || (eight.innerText == huPlayer && five.innerText == huPlayer))) {
            document.getElementById("cell-2").innerHTML = aiPlayer;

        } else {
            if (three.innerText == "" && ((one.innerText == huPlayer && two.innerText == huPlayer) || (seven.innerText == huPlayer && five.innerText == huPlayer) || (nine.innerText == huPlayer && six.innerText == huPlayer))) {
                document.getElementById("cell-3").innerHTML = aiPlayer;

            } else {
                if (nine.innerText == "" && ((seven.innerText == huPlayer && eight.innerText == huPlayer) || (one.innerText == huPlayer && five.innerText == huPlayer) || (three.innerText == huPlayer && six.innerText == huPlayer))) {
                    document.getElementById("cell-9").innerHTML = aiPlayer;

                } else {
                    if (seven.innerText == "" && ((nine.innerText == huPlayer && eight.innerText == huPlayer) || (three.innerText == huPlayer && five.innerText == huPlayer) || (one.innerText == huPlayer && four.innerText == huPlayer))) {
                        document.getElementById("cell-7").innerHTML = aiPlayer;

                    } else {
                        if (eight.innerText == "" && ((nine.innerText == huPlayer && seven.innerText == huPlayer) || (two.innerText == huPlayer && five.innerText == huPlayer))) {
                            document.getElementById("cell-8").innerHTML = aiPlayer;

                        } else {
                            if (four.innerText == "" && ((six.innerText == huPlayer && five.innerText == huPlayer) || (one.innerText == huPlayer && seven.innerText == huPlayer))) {
                                document.getElementById("cell-4").innerHTML = aiPlayer;

                            } else {
                                if (six.innerText == "" && ((three.innerText == huPlayer && six.innerText == huPlayer) || (five.innerText == huPlayer && four.innerText == huPlayer))) {
                                    document.getElementById("cell-6").innerHTML = aiPlayer;

                                } else {
                                    if (five.innerText == "" && ((three.innerText == huPlayer && seven.innerText == huPlayer) || (nine.innerText == huPlayer && one.innerText == huPlayer) || (six.innerText == huPlayer && four.innerText == huPlayer) || (eight.innerText == huPlayer && two.innerText == huPlayer))) {
                                        document.getElementById("cell-5").innerHTML = aiPlayer;
                                    } else {
                                        if (five.innerText == "") {
                                            document.getElementById("cell-5").innerHTML = aiPlayer;
                                        } else {
                                            if (one.innerText == "") {
                                                document.getElementById("cell-1").innerHTML = aiPlayer;
                                            } else {
                                                if (nine.innerText == "") {
                                                    document.getElementById("cell-9").innerHTML = aiPlayer;
                                                } else {
                                                    if (eight.innerText == "") {
                                                        document.getElementById("cell-8").innerHTML = aiPlayer;
                                                    } else {
                                                        if (four.innerText == "") {
                                                            document.getElementById("cell-4").innerHTML = aiPlayer;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return
}
