This is a 2 player Tic Tac Toe game.

The game starts by selecting the grid size from the dropdown, and after "Play" is clicked, a table is created where
the game will be played.

Player 1 always starts first, and is denoted by red colour, whereas Player 2 is denoted by green.

A new game can be started by clicking the "New" button.

The fucntioning of the game has been written in javascript which can be found inside "js" folder
by the name of "ttt.js" and is described in brief as follows:-
	
	i) First of all, the value selected from the dropdown is taken and returned by a function row.rows().
	ii) Then a function called createTable() is called which creates the table dynamically depending on grid size selected.
	iii) Then a 2D array is also created dynamically depending upon the grid size slected and is returned by the name of 
	     "board[][]".  
	iv) Then the functions to check the status of the game, i.e. current player, current player colour, has any player got  
	    the required number of rows horizontally, vertically or diagonally to win the game keep checking after each player plays his turn.
	v) After any 1 condition out of all the conditions that govern the result of the game which are, any 1 player has
	   got the required number of consecutive cells to win, or all the cells have been filled without any player winning
	   an alert is displayed which shows the result of the game.
