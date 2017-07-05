function playerButton(turn) {
    var tempturn = turn.innerText;
    var tempturnArray = tempturn.split(" ");
    document.turn = tempturnArray[1];

    document.getElementById("start-menu").style.display = 'none';
    document.getElementById("message").style.display = 'block';
    msg(document.turn + " has the first turn.");
    document.getElementById("gameBoard").style.display = 'table';
    document.getElementById("title").style.padding = "30px 30px 10px 30px";

    msg("It is "+  document.turn + "'s turn.");
}

var human = true;
var game = true;

//assume human always x for now.
var huPlayer = "X";
var aiPlayer = "O";

var one = document.getElementById("cell-1");
var two = document.getElementById("cell-2");
var three = document.getElementById("cell-3");
var four = document.getElementById("cell-4");
var five = document.getElementById("cell-5");
var six = document.getElementById("cell-6");
var seven = document.getElementById("cell-7");
var eight = document.getElementById("cell-8");
var nine = document.getElementById("cell-9");

function changeTurn() {
    if (!human) {
        human = true;
        document.turn = "X";
        msg("It is "+ document.turn + "'s turn.");
    } else {
        human = false;
        document.turn = "O";
        msg("It is O's turn.");
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
            clicked.innerText = document.turn;
            changeTurn();
        } else {
            msg("You can't play there, try again.");
            return
        }
        if (checkWin(document.turn)) {
            gameAlert("Congratulations!", "Player "+ document.turn + " won!");
            game = false;
        } else if (checkDraw()) {
            gameAlert("Draw!", "Nobody won.");
        }
    }
}

function callAI() {
    if (!human && game) {
        bestMove();

        if (checkWin("O")) {
            gameAlert("Congratulations!","Player O won!");
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
    messageoverlay.style.display = "block";
    messagebox.style.left = (window.innerWidth/2) - (550 * .5)+"px";
    messagebox.style.top = "100px";
    messagebox.style.display = "block";
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
    if (one == null && ((three.innerText == "X" && two.innerText == "X") || (nine.innerText == "X" && five.innerText == "X") || (seven.innerText == "X" && four.innerText == "X"))) {
        document.getElementById("cell-1").innerHTML = "O";

    } else {
        if (two.innerText == "" && ((one.innerText == "X" && three.innerText == "X") || (eight.innerText == "X" && five.innerText == "X"))) {
            document.getElementById("cell-2").innerHTML = "O";

        } else {
            if (three.innerText == "" && ((one.innerText == "X" && two.innerText == "X") || (seven.innerText == "X" && five.innerText == "X") || (nine.innerText == "X" && six.innerText == "X"))) {
                document.getElementById("cell-3").innerHTML = "O";

            } else {
                if (nine.innerText == "" && ((seven.innerText == "X" && eight.innerText == "X") || (one.innerText == "X" && five.innerText == "X") || (three.innerText == "X" && six.innerText == "X"))) {
                    document.getElementById("cell-9").innerHTML = "O";

                } else {
                    if (seven.innerText == "" && ((nine.innerText == "X" && eight.innerText == "X") || (three.innerText == "X" && five.innerText == "X") || (one.innerText == "X" && four.innerText == "X"))) {
                        document.getElementById("cell-7").innerHTML = "O";

                    } else {
                        if (eight.innerText == "" && ((nine.innerText == "X" && seven.innerText == "X") || (two.innerText == "X" && five.innerText == "X"))) {
                            document.getElementById("cell-8").innerHTML = "O";

                        } else {
                            if (four.innerText == "" && ((six.innerText == "X" && five.innerText == "X") || (one.innerText == "X" && seven.innerText == "X"))) {
                                document.getElementById("cell-4").innerHTML = "O";

                            } else {
                                if (six.innerText == "" && ((three.innerText == "X" && six.innerText == "X") || (five.innerText == "X" && four.innerText == "X"))) {
                                    document.getElementById("cell-6").innerHTML = "O";

                                } else {
                                    if (five == null && ((three.innerText == "X" && seven.innerText == "X") || (nine.innerText == "X" && one.innerText == "X") || (six.innerText == "X" && four.innerText == "X") || (eight.innerText == "X" && two.innerText == "X"))) {
                                        document.getElementById("cell-5").innerHTML = "O";

                                    } else {
                                        if (five.innerText == "") {
                                            document.getElementById("cell-5").innerHTML = "O";

                                        } else {
                                            if (one.innerText == "") {
                                                document.getElementById("cell-1").innerHTML = "O";

                                            } else {
                                                if (nine.innerText == "") {
                                                    document.getElementById("cell-9").innerHTML = "O";

                                                } else {
                                                    if (eight.innerText == "") {
                                                        document.getElementById("cell-8").innerHTML = "O";

                                                    } else {
                                                        if (four.innerText == "") {
                                                            document.getElementById("cell-4").innerHTML = "O";

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
