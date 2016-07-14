
$(document).ready(function(){


var board = [new Array(8), 
			new Array(8),
			new Array(8),
			new Array(8),
			new Array(8),
			new Array(8),
			new Array(8),
			new Array(8)
			];

var blackTurn = true;

var hasJumped = false;

var checkerClickedData = 0,
	checkerClickedId = 0,
	checkerClickedX = 0,
	checkerClickedY = 0,
	checkerClickedId = 0;

//when the page is loaded, make a div, assign a class to it that makes it a colored square
//on for loop that assigns odd array index white class, odd black class
//maybe use $( :even) selector
//so on the even 
//
$(document).ready(function () {
	
	for (var i = 0; i < board.length; i++) {

		$("#dat-board").append(
			$('<div>').attr("id","row" + i).attr("class", "row")
		);
		for (var y = 0; y < board[i].length; y++) {
			var cell = $('<div>').attr("id", "square" + [i] + [y]).addClass("square");

			if ((i + y) % 2 === 0) {
				cell.addClass('odd');

			}
			if ((i + y) % 2 === 1) {
				
				cell.addClass('even');
				if (i <= 2) {
					cell.addClass("checker black-checker");
					createChecker("black", false, i, y);		
					
				}
				if (i >= 5) {
					cell.addClass("checker red-checker");
					createChecker("red", false, i, y);
					
				}
			}
			$("#row" + i).append(cell);

		}
	}
});


//highlighting squares


function deleteMovingPiece(x, y){
	try{
		board[x][y] = {};
	} catch(e){
		debugger;
	}
	
}


function createChecker(color, king, x, y) {
	var checker = {
		color: color,
		isKing: king
	};

	board[x][y] = checker;
	console.log(board);
}
		
function isEmpty(x, y) {
	if(!board[x]){
			return true;
	}
	else{
		return !board[x][y] || $.isEmptyObject(board[x][y]);
	}

}

function isOnTheBoard(x, y){
	if((x < 0) || (x > 7)){
		return false;
	}
	if((y < 0) || (y > 7)){
		return false;
	}
	else{
		return true;
	}
}

function dataForSquare(row, cell){
		if(!board[row]){
			return null;
		}
		else{
			return board[row][cell];
		}
	}

function highlight(x,y) {
	$("#square" + x + y).addClass("highlight");
}

function hasEnemyChecker(x, y, a, b) {
	var enemyPiece = dataForSquare(a, b);
	if(isEmpty(a, b)){
		return false;
	}
	else if(enemyPiece.color === undefined){
		return false;
	}
	else if ((checkerClickedData.color === "red" && enemyPiece.color === "red") || (checkerClickedData.color === "black" && enemyPiece.color === "black")) {
		return false;
	}
	else{
		return true;
	}
}



function getSingleMoves(x, y) {
	var targets = [];
	if(checkerClickedData.color === "red"){
		var direction = -1;
	}
	else{
		var direction = +1;
	}
	if(isEmpty((x + direction),(y + direction))){
		targets.push({
			row: (x + direction),
			col: (y + direction)
		})
	}
	if(isEmpty((x + direction),(y - direction))){
		targets.push({
			row: (x + direction),
			col: (y - direction)
		})
	}
	if(checkerClickedData.isKing === true){
		if(isEmpty((x + -direction),(y + -direction))){
			targets.push({
				row: (x + -direction),
				col: (y + -direction)
			})
		}
		if(isEmpty((x + -direction),(y - -direction))){
			targets.push({
				row: (x + -direction),
				col: (y - -direction)
			})
		}
	}
	return targets;
	console.log(targets);
}

function getOneJump(x, y) {
	var targets = [];
	if(checkerClickedData.color === "red"){
		var direction = -1;
	}
	else{
		var direction = +1;
	}
	if((hasEnemyChecker(x, y, (x + direction),(y + direction))) && (isEmpty((x + (2 * direction)),(y + (2 * direction))) && (isOnTheBoard((x + (2 * direction)),(y + (2 * direction)))))) {
		targets.push({
			row: (x + (2 * direction)),
			col: (y + (2 * direction))
		})
	}
	if((hasEnemyChecker(x, y, (x + direction),(y - direction))) && (isEmpty((x + (2 * direction)),(y + (-2 * direction))) && (isOnTheBoard((x + (2 * direction)),(y + (-2 * direction)))))) {
		targets.push({
			row: (x + (2 * direction)),
			col: (y + (-2 * direction))
		})
	}
	if(checkerClickedData.isKing === true){
		if((hasEnemyChecker(x, y, (x + -direction),(y + -direction))) && (isEmpty((x + (2 * -direction)),(y + (2 * -direction))) && (isOnTheBoard((x + (2 * -direction)))))) {
				targets.push({
					row: (x + (2 * -direction)),
					col: (y + (2 * -direction))
				})
		}
		if((hasEnemyChecker(x, y, (x + -direction),(y - -direction))) && (isEmpty((x + (2 * -direction)),(y + (-2 * -direction))) && (isOnTheBoard((x + (2 * -direction)),(y + (-2 * -direction)))))) {
			targets.push({
				row: (x + (2 * -direction)),
				col: (y + (-2 * -direction))
			})
		}
	}	
	return targets;
}


function kill(x, row1, y, cell1) {
	var avOfRow = (x + row1) / 2;
	var avOfCell = (y + cell1) / 2;
	var killId = "#square" + [avOfRow] + [avOfCell];
	if(avOfRow % 1 !== 0){
		hasJumped = false;
	}
	else{
		if(blackTurn === true){
			deleteMovingPiece(avOfRow, avOfCell);
			$(killId).removeAttr('class');
			$(killId).addClass('square even');
		}
		else{
			deleteMovingPiece(avOfRow, avOfCell);
			$(killId).removeAttr('class');
			$(killId).addClass('square even');
		}
		hasJumped = true;
	}	
}

function makeKing(row, x, y){
	checkerData = dataForSquare(x, y);
	if(checkerData.color === "red"){
		if(row === 0){
			checkerData.isKing = true;
			$("#square" + [x] + [y]).addClass("red-checker-king");
		}
	}
	if(checkerData.color === "black"){
		if(row === 7){
			checkerData.isKing = true;
			$("#square" + [x] + [y]).addClass("black-checker-king");
		}
	}
	console.log(board);
}

function handleCheckerClick(event) {
	var el = event.currentTarget;
	var id = $(el).attr('id');
	var x = Number(id.charAt(6));
	var y = Number(id.slice(-1));
	checkerClickedData = dataForSquare(x, y);
	checkerClickedId = id;
	checkerClickedX = x;
	checkerClickedY = y;
	var targets = [];
	if(hasJumped === true){
		return;
	}
	else{	
		if(!hasJumped){
			$('div').removeClass("highlight");
			targets.push.apply(targets, getSingleMoves(x, y));
		}
		targets.push.apply(targets, getOneJump(x, y));
		for(var i = 0; i< targets.length; i++){
			highlight(targets[i].row,targets[i].col);
		}
	}
}

function secondJumpLogic(highlightedId, row1, cell1){
	var className = blackTurn ? 'black-checker' : 'red-checker';
	if(hasJumped === true){
		$("#" + checkerClickedId).removeAttr('class');
		$("#" + checkerClickedId).addClass('square even');
		if(checkerClickedData.isKing){
			$("#" + highlightedId).addClass("checker " + className + " " + className + "-king");
		}
		else{
			$("#" + highlightedId).addClass("checker " + className);
		}
		$('div').removeClass("highlight");
		var moreJumps = getOneJump(row1, cell1);
		if(moreJumps.length){
			for(var i = 0; i< moreJumps.length; i++){
				highlight(moreJumps[i].row,moreJumps[i].col);
				$("#end-turn-btn").append(
					$('<button>').attr("id","turn-btn").attr("class", "turn-btn").html("End turn now"));
				checkerClickedId = "square" + [row1] + [cell1];
				checkerClickedData = dataForSquare(row1, cell1);
				checkerClickedX = row1;
				checkerClickedY = cell1;
			}
		}	
		else {
			$("#turn-btn").remove();
			blackTurn = !blackTurn;
			hasJumped = false;
			return;
		}
	}
	else{
		$("#" + checkerClickedId).removeAttr('class');
		$("#" + checkerClickedId).addClass('square even');
		if(checkerClickedData.isKing){
			$("#" + highlightedId).addClass("checker " + className + " " + className + "-king");
		}
		else{
			$("#" + highlightedId).addClass("checker " + className);
		}
		$('div').removeClass("highlight");
		blackTurn = !blackTurn;
	}
}


function handleHighlights(ele){
	var highlightedId = $(ele).attr('id');
	var row1 = Number(highlightedId.charAt(6));
	var cell1 = Number(highlightedId.slice(-1));
	var highlightedCellData = dataForSquare(row1, cell1);
	createChecker(checkerClickedData.color, checkerClickedData.isKing, row1, cell1);
	deleteMovingPiece(checkerClickedX, checkerClickedY);
	kill(checkerClickedX, row1, checkerClickedY, cell1);
	secondJumpLogic(highlightedId, row1, cell1);
	makeKing(row1, row1, cell1);
}

$(".square").click(function(event){
	 if($(this).hasClass("highlight")){	
		var ele = event.currentTarget;
		handleHighlights(ele);
	}	
	else{
		if(blackTurn === true){
			if($(this).hasClass("checker black-checker")) {
				handleCheckerClick(event);
			}
			else {
				return;
			}
		} 
		else {
			if($(this).hasClass("checker red-checker")) {
				handleCheckerClick(event);

			}
			else{
				return;
			}
		}
	}

$("#turn-btn").click(function() {
	blackTurn = !blackTurn;
	hasJumped = false;
	$('div').removeClass("highlight");
	$('#turn-btn').remove();
})
	// set a global variable to the info of the square just jumped onto but only after a kill
	// if($(this).hasId(justJumped))
	
});

// if(){
// }
	
});