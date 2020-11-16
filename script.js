(() => {
  function setup() {
    const canvas = document.getElementById("falling-snow-canvas"); //Selector element by js
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return {
      canvas,
      canvasContext: canvas.getContext("2d"), //context canvas
      numberOfSnowBalls: 250
    };
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createSnowballs(canvas, numberOfSnowBalls) {
    //Spread Operator (...) Syntax
    return [...Array(numberOfSnowBalls)].map(() => {
      return {
        x: random(0, canvas.width), // 0 left to right window
        y: random(0, canvas.height),
        opacity: random(0.5, 1),
        radius: (2, 4),
        speedX: random(-5, 5), //fall left ,right
        speedY: random(1, 3) // down 1-3 pixel
      };
    });
  }

  function drawSnowBalls(canvasContext, snowBall) {
    canvasContext.beginPath(); //set context Begin Draw
    canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, Math.PI * 2); //Draw Circle
    canvasContext.fillStyle = `rgba(255,255,255,${snowBall.opacity})`;
    canvasContext.fill();
  }

  function moveSnowBall(canvas, snowBall) {
    snowBall.x += snowBall.speedX;
    snowBall.y += snowBall.speedY;

    if (snowBall.x > canvas.width) {
      //reset snowball position
      snowBall.x = 0;
    } else if (snowBall.x < 0) {
      snowBall.x = canvas.width;
    }

    if (snowBall.y > canvas.height) {
      snowBall.y = 0;
    }
  }

  function run() {
    const { canvas, canvasContext, numberOfSnowBalls } = setup(); //Object Destructuring
    const snowBalls = createSnowballs(canvas, numberOfSnowBalls);

    setInterval(() => {
      //claer canvas
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      snowBalls.forEach(snowBall => {
        drawSnowBalls(canvasContext, snowBall);
      });
      snowBalls.forEach(snowBall => {
        moveSnowBall(canvas, snowBall);
      });
    }, random(50, 65)); // random 50-65 millisecond
  }

  run();
})();
