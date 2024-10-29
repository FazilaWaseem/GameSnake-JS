const canvas = document.getElementById('gamecanvas');
const cntx = canvas.getContext('2d');//canva tag k andr graphics ko draw krny k liye use hota hai


const box = 20;//size of snake segment
let snake = [{ x: 9 * box, y: 10 * box }]; //initial snake position
let direction = 'Right';
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box // food position randomly
};

let score = 0;

document.addEventListener('keydown', changeDirection);

// Direction control using buttons
document.getElementById('left').addEventListener('click', () => changeDirection({ keyCode: 37 }));
document.getElementById('up').addEventListener('click', () => changeDirection({ keyCode: 38 }));
document.getElementById('down').addEventListener('click', () => changeDirection({ keyCode: 40 }));
document.getElementById('right').addEventListener('click', () => changeDirection({ keyCode: 39 }));


//control the snake 
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'Right') {
        direction = 'Left';
    } else if (event.keyCode === 38 && direction !== 'Down') {
        direction = 'Up';
    } else if (event.keyCode === 39 && direction !== 'Left') {
        direction = 'Right';
    } else if (event.keyCode === 40 && direction !== 'Up') {
        direction = 'Down';
    }
}
//Draw snake
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        cntx.fillStyle = (i === 0) ?'#FFD700' : '#FFFACD';//head dark body light , kisi graphics k color ko set krna 
        cntx.fillRect(snake[i].x, snake[i].y, box, box);// position and size ko define krny k liye use hota hai
        cntx.strokeStyle = '#FFD700';
        cntx.strokeRect(snake[i].x, snake[i].y, box, box);//stokerect mean outline ki dimentions or positions ko set krna
    }
}
//draw food
function drawFood() {
    cntx.fillStyle = 'red';
    cntx.fillRect(food.x, food.y, box, box);
}
//game update
function updateGame() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
      //move snake in current direction
    if (direction === 'Left') snakeX -= box;
    if (direction === 'Up') snakeY -= box;
    if (direction === 'Right') snakeX += box;
    if (direction === 'Down') snakeY += box;

    //check if snake eats food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    //check foe collision with walls and its self
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over!");
    } else {
        snake.unshift(newHead);
    }
}

//coliision detection
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}
 //main game loop
function draw() {
    cntx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateGame();
    cntx.fillStyle = 'black';
    cntx.font = 'bold 30px Arial';
    cntx.textAlign = 'center';  // Center-align the text horizontally
    const yPosition = 60; 
    cntx.fillText('Score: ' + score, canvas.width / 2, yPosition);

}

let game = setInterval(draw, 300);