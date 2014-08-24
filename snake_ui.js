(function(root){
	
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var View = SnakeGame.View = function(elem){
		var game = this;
		this.currentScore = 1;
		this.highScore = 1;
		this.newHighScore = false;
		this.$el = elem;
		this.Board = new SnakeGame.Board(game);
		this.Snake = this.Board.snake;
		this.over = false;
	};
	
	View.prototype.start = function(){
		this.listener();
		var game = this;
		if(game.lost){
			return false;
		}
		$(root).keydown(function(event){game.handleKeyEvent(event)});
		setInterval(function(){
			if(game.Snake.collided){
				game.gameOver();
			}else if (game.Snake.turned === true){
				game.Snake.turned = false
			} else{
				game.currentScore = game.Snake.segments.length;
				var currentScoreText = "Current Score: " + game.currentScore;
				$(".currentScore").html(currentScoreText)
				if(game.currentScore > game.highScore){
					game.highScore = game.currentScore;
					game.newHighScore = true;
					var highScoreText = "High Score: " + game.highScore;
					$(".highScore").html(highScoreText)
				}
				game.Board.move();
			}
			var rendered = game.Board.render();
			game.$el.html(rendered);								
		}, 200)
	};
	
	View.prototype.gameOver = function(){
		this.over = true;
		if(this.newHighScore){
			$(".content").addClass("victory");
			$(".content").html("New High Score! Click Board To Try Again");
		} else{
			$(".content").html("Game Over. Click Board To Try Again")			
		}
	};
	
	View.prototype.listener = function(){
		var game = this;
		$(".root").click(function(){
			if(game.over){			
				game.over = false;
				$(".content").removeClass("victory");
				$(".content").html("Snake Game");
				game.currentScore = 1;
				game.reset();
			}
		})	
	};

	View.prototype.reset = function(){
		this.currentScore = 1;
		this.newHighScore = false;
		this.$el.empty();
		this.Board = new SnakeGame.Board(game);
		this.Snake = this.Board.snake;
		this.over = false;
	}
	
	View.prototype.handleKeyEvent = function(event){
		if(event.keyCode === 38){
			this.Board.snake.turn([-1, 0])
		} else if(event.keyCode === 40){
			this.Board.snake.turn([1, 0])
		} else if(event.keyCode === 37){
			this.Board.snake.turn([0, -1])
		} else if(event.keyCode === 39){
			this.Board.snake.turn([0, 1])
		}
		this.Board.render();
	};
	
	
			
})(this);