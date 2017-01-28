		var canvas;
		var canvasCtx;
		var settingSave;
		var ballx = 50;
		var ballY = 50;

		var ballSpeedX = 10;
		var ballSpeedY = 5;
		var playerName = "No name";

		var paddle1Y = 250;
		var paddle2Y = 250;
		
		var player1Score = 0;
		var player2Score = 0;
		var showingWinScren = true;

		const PADDLE_THIKNESS = 10;
		const PADDLE_HEIGHT = 100;
		const WINNING_SCORE = 5;


		window.onload = function(){

			canvas = document.getElementById("targetCanvas");
			canvasCtx = canvas.getContext("2d");
			settingSave = document.getElementById("save");
			
			var fremsPerSecond = 30;

			setInterval(function(){
				moveEverything();
				drawEverything();
			}, 1000/fremsPerSecond );


			settingSave.addEventListener("click", handleSetthingPanel);

			canvas.addEventListener("mousedown", handleMouseClick);

			canvas.addEventListener("mousemove", handelMouseMove);

		}


		function handleSetthingPanel(evt){

			var settingPanel = document.getElementById("settings_panel");
			var name = document.getElementById("name").value;
			var speed = document.getElementById("speed").value;

		



			if( name != "" && speed != ""){
				playerName = name;
				ballSpeedX = speed;
				ballSpeedY = speed/2;
			}else {
				playerName = "No name";
				ballSpeedX = 10;
				ballSpeedY = 5;
			}

			if (showingWinScren) {
				player1Score = 0;
				player2Score = 0;
				showingWinScren = false;
			}	
			
			settingPanel.setAttribute("class", "hide-div");

		}


		function handleMouseClick(evt){
			if (showingWinScren) {
				player1Score = 0;
				player2Score = 0;
				showingWinScren = false;
			}	
		}

		function handelMouseMove(evt){
			var mousePos = calculateMousePoint(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
		}


		function calculateMousePoint(evt){
			var rect = canvas.getBoundingClientRect();
			var rootValu = document.documentElement;
			var mouseX = evt.clientX - rect.left - rootValu.scrollLeft;
			var mouseY = evt.clientY - rect.top - rootValu.scrollTop;
			return{
				x:mouseX,
				y:mouseY
			}

		}




		function ballReset(){
			if ( player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE ) {
				showingWinScren = true;
			}

			ballSpeedX = -ballSpeedX;
			ballx = canvas.width/2;
			ballY = canvas.height/2;
		}


		function computerMovement(){
			var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
			if (paddle2YCenter < ballY-35) {
				paddle2Y += 6;
			}else if(paddle2YCenter > ballY+35){
				paddle2Y -= 6;
			}
		}

		function moveEverything(){
			if ( showingWinScren) {
				return;
			}

			computerMovement();

			ballx += ballSpeedX;
			ballY += ballSpeedY;
			
			if(ballx < 0){
				if(ballY > paddle1Y && ballY < ( paddle1Y + PADDLE_HEIGHT )){
					ballSpeedX = -ballSpeedX;
					var deltaY = ballY - ( paddle1Y + PADDLE_HEIGHT / 2 );
					ballSpeedY = deltaY * 0.35;
				}else{
					player2Score++; // Must be before ballReset()
					ballReset();
				}				
			}
			if(ballx > canvas.width){
				if(ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT)){
					ballSpeedX = -ballSpeedX;
					var deltaY = ballY - ( paddle2Y + PADDLE_HEIGHT / 2 );
					ballSpeedY = deltaY * 0.35;
				}else{
					player1Score++; // Must be before ballReset()
					ballReset();
				}
			}
			if(ballY < 0){
				ballSpeedY = -ballSpeedY;
			}
			if(ballY > canvas.height){
				ballSpeedY = -ballSpeedY;
			}
		}



		function drawEverything(){
			// Next line code blanks out the screen with black
			colorRect(0, 0, innerWidth, innerHeight, "#000");

			if ( showingWinScren) {
				canvasCtx.fillStyle = "#fff";

				if (player1Score >= WINNING_SCORE) {

					canvasCtx.fillText( playerName + " win :)" , 350, 300);

				}else if(player2Score >= WINNING_SCORE){

					canvasCtx.fillText("Right player Win!", 350, 300);

				}

				canvasCtx.fillText("Click to continue", 350, 500);
				return;
			}

			// Next line code for paddle of left side player
			colorRect(0, paddle1Y, PADDLE_THIKNESS, PADDLE_HEIGHT, "#fff");

			// Next line code for paddle of left side player
			colorRect(canvas.width-PADDLE_THIKNESS, paddle2Y, PADDLE_THIKNESS, PADDLE_HEIGHT, "#fff");

			// Next line code for the ball
			colorCircle(ballx, ballY, 10, "#fff");

			canvasCtx.fillText(player1Score, 100, 100);

			canvasCtx.fillText(player2Score, canvas.width-100, 100);
			drawNet();
		}


		function drawNet(){
			for(var i = 0; i < canvas.height; i+=40){
				colorRect(canvas.width/2-1, i, 2, 20, "#fff" );
			}
		}


		function colorCircle(centerX, centerY, redious, drawColor){
			canvasCtx.fillStyle = drawColor;
			canvasCtx.beginPath();
			canvasCtx.arc(centerX, centerY, redious, 0, Math.PI*2, true);
			canvasCtx.fill()
		}



		function colorRect(leftX, topY, width, height, drawColor){
			canvasCtx.fillStyle = drawColor;
			canvasCtx.fillRect(leftX, topY, width, height);
		}

		