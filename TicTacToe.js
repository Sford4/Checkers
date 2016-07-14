
$(document).ready(function(){

var container = ["blue", "yellow", "green"];
var board = [[1, 2, 3, 4, 5, 6, 7, 8], 
			[9, 10, 11, 12, 13, 14, 15, 16],
			[17, 18, 19, 20, 21, 22, 23, 24],
			[25, 26, 27, 28, 29, 30, 31, 32],
			[33, 34, 35, 36, 37, 38, 39, 40],
			[41, 42, 43, 44, 45, 46, 47, 48],
			[49, 50, 51, 52, 53, 54, 55, 56],
			[57, 58, 59, 60, 61, 62, 63, 64]
			];


// $("#color-changer-btn").click( function() {
// 	$("#colors").text(container[i]);
// 	i++;
// 	if(i === container.length){
// 		i=0;
// 	};
// });


//when the page is loaded, make a div, assign a class to it that makes it a colored square
//on for loop that assigns even numbers white class, odd black class
$("#color-changer-btn").click( function() {
	for (var i = 0; i < board.length; i++) {
		$("#dat-board").append(
			$('<li>').attr("id","item" + i));
	for (var y = 0; y < board[i].length; y++) {
		$("#item" + i).append("<span>" + board[i][y] + ",</span>");
	}
	}
	});




});