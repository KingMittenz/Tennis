//These two lines of canvas is for the code to actually work
var canvas;
var canvasContext;
//Changes the balls position
var ballX = 50;
var ballY = 50;
//Changes the ball speed
var ballSpeedX = 10;
var ballSpeedY = 5;
//The scores of the game
var player1Score = 0;
var player2Score = 0;
//The maximum score
const WINNING_SCORE = 3;
//winning screen
var showingWinScreen = false;
//Starting positions for the paddles i think
var paddle1Y = 250;
var paddle2Y = 250;
//The fixed amount of how the paddles look
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}
function handleMouseClick(evt) {
	if(showingWinScreen){
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}
//Makes the page wait for all the codes to load before it starts running
window.onload = function() {
	canvas = document.getElementById('gamecanvas');
	canvasContext = canvas.getContext('2d');
  //Sets the time and framerate for your game to move/load
  var framesPreSecond = 30;
	setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPreSecond);
	canvas.addEventListener('mousedown', handleMouseClick);
	canvas.addEventListener('mousemove',
	function(evt) {
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
	});
}
function ballReset() {
	if(player1Score >= WINNING_SCORE ||
		player2Score >= WINNING_SCORE){
			showingWinScreen = true;
		}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2
	ballY = canvas.height/2
}
function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2YCenter < ballY-35) {
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY+35) {
		paddle2Y -= 6;
	}
}
//Next function and if changes the direction and movement of the game settings
function moveEverything() {
	if(showingWinScreen) {
		return;
	}
	computerMovement();
	ballY += ballSpeedY;
  ballX += ballSpeedX;
  if (ballX > canvas.width - 30){
		if (ballY > paddle2Y &&
				ballY < paddle2Y+PADDLE_HEIGHT) {
					ballSpeedX = -ballSpeedX;
					var deltaY = ballY
						-(paddle2Y+PADDLE_HEIGHT/2);
						ballSpeedY = deltaY * 0.35;
			} else if (ballX < canvas.width){
				player1Score ++; //Must be before ballReset()
				ballReset();
			}
  }
  if (ballX < 30){
		if (ballY > paddle1Y &&
				ballY < paddle1Y+PADDLE_HEIGHT) {
					ballSpeedX = -ballSpeedX;
					var deltaY = ballY
						-(paddle1Y+PADDLE_HEIGHT/2);
						ballSpeedY = deltaY * 0.35;
			} else if (ballX < 10){
				player2Score ++; //Must be before ballReset()
				ballReset();
			}
  }
  if (ballY > canvas.height){
    ballSpeedY = -ballSpeedY;
  }
  if (ballY < 0){
    ballSpeedY = -ballSpeedY;
  }
}
function drawNet(){
	for(var i=0;i<canvas.height; i+=40){
		colorRect(canvas.width/2-1,i,2,20,'white')
	}
}
function drawEverything() {
  //Changes the color and the size of the shapes in the game
  //Next line blanks out the screen with whatever color you put there
	colorRect(0 , 0, canvas.width, canvas.height, 'black');
	if(showingWinScreen) {
		canvasContext.fillStyle = 'white';
		if(player1Score >= WINNING_SCORE){
			canvasContext.fillText("left player won", 350, 200);
		}else if(player2Score >= WINNING_SCORE){
			canvasContext.fillText("right player won", 350, 200);
		}
		canvasContext.fillText("click to continue", 350, 500);
		return;
	}
	drawNet();
  //Next line sets left players paddle
	colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	//Next line sets enemy paddle
	colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
  //Next line draws the ball
  colorCircle(ballX, ballY, 10, 'white')
	//score board
	canvasContext.fillText(player1Score, 100, 100)
	canvasContext.fillText(player2Score, canvas.width-100, 100)
}
function colorCircle(centerX, centerY, radius, drawColor) {
  //Next line makes the ball
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}
//Sets the color scheme
function colorRect(leftX,topY, width,height, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY, width,height);
}
