var huPlayer, aiPlayer, game;
var origGrid = Array.from(Array(9).keys());

function playerX() {
	huPlayer = "X";
	aiPlayer = "O";
	document.turn = huPlayer;
    game = true;
	removeStartMenu();
};

function playerO() {
	huPlayer = "O";
	aiPlayer = "X";
	document.turn = huPlayer;
    game = true;
	removeStartMenu();
};

function getCell(num) {
    return document.getElementById("cell-"+num).innerText;
}

function gamePlay(cell) {
	if (document.turn == huPlayer && game) {
        if (cell.innerText == "") {
            cell.innerText = huPlayer;
        } else {
            return
        }
        var i = cell.id;
        i = i.split("-");
        i = i[1];
        origGrid[i] = huPlayer;
        if (checkWinner(origGrid, huPlayer)) {
            gameAlert("Congratulations", "Player " + huPlayer + " won!");
            game = false;
        } else if (getAvailSpots(origGrid).length == 0) {
            gameAlert("Draw", "Nobody wins!");
            game = false;
        }
		document.turn = aiPlayer;
	}
	if (document.turn == aiPlayer && game) {
        moveAI(origGrid);
        if (checkWinner(origGrid, aiPlayer)) {
            gameAlert("Congratulations", "Player " + aiPlayer + " won!");
            game = false;
        } else if (getAvailSpots(origGrid).length == 0) {
            gameAlert("Draw", "Nobody wins!");
            game = false;
        }
		document.turn = huPlayer;
	}
}

function moveAI(origGrid) {
    value = minimax(origGrid, aiPlayer).index
    document.getElementById("cell-"+value).innerText = aiPlayer;
    origGrid[value] = aiPlayer;
    return
}

function minimax(newGrid, player) {
	var availableSpots = getAvailSpots(newGrid);

	if (checkWinner(newGrid, huPlayer)) {
		return {score: -10};
	} else if (checkWinner(newGrid, aiPlayer)) {
		return {score: 10};
	} else if (availableSpots.length === 0) {
		return {score: 0};
	}

	var moves = [];
	for (var i = 0; i < availableSpots.length; i++) {
		var move = {};
		move.index = newGrid[availableSpots[i]];
		newGrid[availableSpots[i]] = player;
		if (player == aiPlayer) {
			var result = minimax(newGrid, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newGrid, aiPlayer);
			move.score = result.score;
		}
		newGrid[availableSpots[i]] = move.index;
		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

function getAvailSpots() {
    return origGrid.filter(s => typeof s == 'number');
}

function checkWinner(grid, player) {
    result = null;
    // check horizontal
    if ((grid[0] == player && grid[1] == player && grid[2] == player) ||
        (grid[3] == player && grid[4] == player && grid[5] == player) ||
        (grid[6] == player && grid[7] == player && grid[8] == player)) {
            result = true;
    }
    // check vertical
    if ((grid[0] == player && grid[3] == player && grid[6] == player) ||
        (grid[1] == player && grid[4] == player && grid[7] == player) ||
        (grid[2] == player && grid[5] == player && grid[8] == player)) {
            result = true;
    }
    // check diagonal
    if ((grid[0] == player && grid[4] == player && grid[8] == player) ||
        (grid[6] == player && grid[4] == player && grid[2] == player)) {
            result = true;
    }
    return result;
}

function gameAlert(header, message) {
    var messageoverlay = document.getElementById("messageoverlay");
    var messagebox = document.getElementById("messagebox");
    messageoverlay.style.display = "block";
    messagebox.style.left = (window.innerWidth/2) - (550 * .5)+"px";
    messagebox.style.top = "80px";
    messagebox.style.display = "block";
    document.getElementById("messageboxhead").innerHTML = header;
    document.getElementById("messageboxbody").innerHTML = message;
    document.getElementById("messageboxfoot").innerHTML = '<button onclick="reset()">Start Over</button>';
}

function reset() {
    location.reload();
    document.getElementById("messagebox").style.display = "none";
    document.getElementById("messageoverlay").style.display = "none";
    game = true;
}

function removeStartMenu() {
    document.getElementById("start-menu").style.display = 'none';
    document.getElementById("gameBoard").style.display = 'table';
    document.getElementById("title").style.padding = "30px 30px 0px 30px";
}
