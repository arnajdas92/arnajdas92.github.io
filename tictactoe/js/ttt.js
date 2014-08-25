var row = {
    num_rows:0,
    rows:function(){
        var num_rows = document.getElementById('rows').value;
        return num_rows;
    }
};
  var board = [];

function createTable(){
    var num_rows = row.rows();
    var num_cols = num_rows;
    var theader = '<table>\n';
    var tbody = '';
    for( var i=0; i<num_rows;i++){
        tbody += '<tr class="box_row">';
        for( var j=0; j<num_cols;j++){
            tbody += '<td class="box_cell" data-row = "' + i + '"' + ' data-col = "' + j + '">';
            tbody += '</td>'
        }
        tbody += '</tr>\n';
    }
     var tfooter = '</table>';
    document.getElementById('datagrid').innerHTML = theader + tbody + tfooter;
    $(document).ready(function(){
    // Fix to make hover work correctly
    $(".box_cell").hover(function () {
        $(this).addClass("hover");
    }, function () {
            $(this).removeClass("hover");
        });
    // Take the appropriate action when a box is clicked
        $('.box_cell').click(function(){
            // Check if cell is 0 on the board
            if (check_cell(this) === 0 && winningPlayer === 0) {
                // Change color if it's 0
                change_cell(this);
                // Check if we have a winner
                check_winner();
            }
        });
    });
    
        var arr = [];

              // Creates all lines:
              for(var i=0; i < row.rows(); i++){
                  // Creates an empty line
                  arr.push([]);
                  // Adds cols to the empty line:
                  arr[i].push( new Array(row.rows()));
                  for(var j=0; j < row.rows(); j++){
                    // Initializes:
                    arr[i][j] = 0;
                  }
              }
        board = arr;
}

// Create variable to store the winning player
var winningPlayer = 0;

// Keep track of whose turn it is
var turn = {
    number : 0,
    current_player_color : function() {
        if (this.number % 2 === 0) {
            return 1;
        }
        else {
            return 2;
        }
    },
    change_turn : function(){
        this.number += 1;
    }
};

// Check to see if any of the rows has num_rows in a row
function check_rows() {
    var i;
    
    for (i = 0; i < board.length; i++) {
        //console.log("rows="+board[i].length);
        var same = true;
        for (j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0 || board[i][j] !== board[i][0]) {
                same = false;
            }
        }
        if (same) {
            return same;
        }
    }
}

// Check to see if any of the columns has num_rows in a row
function check_cols() {
    for (i = 0; i < board.length; i++) {
        var same = true;
        for (j = 0; j < board[i].length; j++) {
            if (board[j][i] === 0 || board[j][i] !== board[0][i]) {
                same = false;
            }
        }
        if (same) {
            return same;
        }
    }
}

// Check to see if any of the diagonals has (num_rows-1) in a row
function check_diag() {
    //var num_rows = document.getElementById('rows').value;
    var same = true;
    for (i = 0; i < board.length; i++) {
        if (board[i][i] === 0 || board[i][i] !== board[0][0]) {
            same = false;
        }
    }
    if (same) {
        return same;
    }
    same = true;
    for (i = 0; i < board.length; i++) {
        //console.log(num_rows);
        if (board[i][row.rows() - 1 - i] === 0 || board[i][row.rows() - 1  - i] !== board[0][row.rows() - 1 ]) {  //num_rows instead of 3
            same = false;        }
    }
    if (same) {
        return same;
    }
}

// Check to see if it's a tie
function check_tie() {
    var flattened_board = Array.prototype.concat.apply([], board);
    //console.log(flattened_board.length);
    for(i = 0; i < flattened_board.length; i++){
        if(flattened_board[i] === 0){
            //console.log(i);
            return false;
        }
    }
    return true;
}

// Check to see if either player has won
function check_winner() {
    if (check_rows() === true || check_cols() === true || check_diag() === true) {
        winningPlayer = turn.current_player_color();
         Alert.render("Player " + winningPlayer + ", you win!");
    }
    else if (check_tie() === true) {
         Alert.render("It's a tie");
    }
    else {
        turn.change_turn();
    }
}


// Check the value of a cell
function check_cell(cell) {
    var row = $(cell).data("row");
    var col = $(cell).data("col");
    //createArray();
    return(board[row][col]);
}

function change_cell(cell) {
    // Change cell to the player color
    var row = $(cell).data("row");
    var col = $(cell).data("col");
    //console.log(arnaj.matrix);
    //console.log(turn.current_player_color());
    board[row][col] = turn.current_player_color();
    if (turn.current_player_color() == 1){
        // Remove hover class immediately once clicked
        $(".box_cell").click(function () {
            $(this).removeClass("hover");
        });
        $(cell).addClass('red');
    }
    else {
        $(cell).addClass('blue');
    }
    
    //Doesn't work, possibly because the array is destroyed?
    //console.log(arnaj.matrix[row][col]);
}

function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Acknowledge This Message";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="location.reload()">OK</button>';
    }
    this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
         document.getElementById('dialogoverlay').style.display = "none";
    }
}

var Alert = new CustomAlert();
