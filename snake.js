(function(root){
	
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var boardSize = SnakeGame.boardSize = 13;
	
	var applesFrequency = SnakeGame.applesFrequency = 15;
	
	var Snake = SnakeGame.Snake = function(board){
		this.board = board;
		this.dir = [-1, 0];
		var middle = Math.floor(boardSize /2); 
		this.segments = [[middle, middle]];
		this.head = this.segments[0];
		this.tail = this.segments[0];
		this.turned = false;
		this.collided = false;
	};
		
	var addCoords = SnakeGame.addCoords = function(coords1, coords2){
		var x  = (coords1[0] + coords2[0]) % boardSize
		var y = (coords1[1] + coords2[1]) % boardSize
		if(x < 0){
			x = x + SnakeGame.boardSize
		}
		if(y < 0 ){
			y = y + SnakeGame.boardSize
		}
		return [x, y];
	};
		
	Snake.prototype.move = function(){
		var head = this.head;
		var dir = this.dir;
		var segments = this.segments;
		this.segments.push(addCoords(head, dir));
		if(!this.board.apples[head]){
			this.segments.shift();
		} else{
			this.board.apples[head] = null;
		}
		this.head = this.segments[this.segments.length - 1];
		this.tail = this.segments[0];
		var nonHead = this.segments.slice(0, segments.length - 1)
		if(contains(nonHead, this.head)){
			this.collided = true;
		}
	};
	
	Snake.prototype.collided = function(){
		var segments = this.segments;
		var head = this.head;
		return this.hea
		var head = this.head;
		var dir = this.dir;
		this.segments.push(addCoords(head, dir));
		if(!this.board.apples[head]){
			this.segments.shift();
		} else{
			this.board.apples[head] = null;
		}
	};
		
	Snake.prototype.turn = function(newDir){
		if(!this.turned){
			this.dir = newDir;
			this.move();
			this.turned = true;			
		}
	};

	
	var makeBoard = function(){
		var board = [];
		for(var i = 0; i < boardSize; i++){
			board.push([]);
			for(var j = 0; j < boardSize; j++){
				board[i].push([])
			}
		}
		return board;
	};
	
	var contains = SnakeGame.contains = function(arr, elem){
		for(var i = 0; i < arr.length; i++){
			if((arr[i][0] == elem[0]) && (arr[i][1] == elem[1])){
				return true;
			}
		}
		return false;
	};
		
	var Board = SnakeGame.Board = function(game){
		var snakeBoard = this;
		this.game = game;
		this.snake = new Snake(snakeBoard);
		this.board = makeBoard();
		this.numSteps = 0;
		this.apples = {};
	};
	
	Board.prototype.render = function(){
		var $el = $('<table>');
		var renderedBoard = this.board;
		for(i = 0; i < renderedBoard.length; i++){
			var elem_i = $('<tr>')
			$el.append(elem_i);
			for(var j = 0; j < renderedBoard.length; j++){
				var elem_j = $('<td>');
				elem_i.append(elem_j)
				if(this.apples[[i, j]]){
					elem_j.addClass("red");
				}
				if(contains(this.snake.segments, [i, j])){
					if(this.snake.tail == [i, j].toString() || this.snake.head == [i, j].toString()){
						elem_j.addClass("lightGreen")
					} else{
						elem_j.addClass("green");
					}
					elem_j.removeClass("red");
				}
				if(this.snake.collided && !elem_j.hasClass("green") && !elem_j.hasClass("red")){
					elem_j.addClass("black");
				}
			}
		}
		return $el;
	};
	
	var sizer = SnakeGame.sizer = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key) && obj[key]) size++;
	    }
	    return size;
	};	
	
	Board.prototype.move = function(){
		var apples = this.apples;
		this.snake.move();
		this.numSteps++;
		if((this.numSteps % applesFrequency === 1) || sizer(apples) === 0){
			if(sizer(apples) < 3){
				var x = Math.floor(boardSize * Math.random());
				var y = Math.floor(boardSize * Math.random());		
				this.apples[[x, y]] = true;
			}
		}
	};
	

	
			
})(this);