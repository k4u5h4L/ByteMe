
let audio;
// For displaying the label
let instru = "waiting...";
// The classifier
let classifier;

// model url
let modelURL = 'voice-model/';

// Load the model
function preload() {
    classifier = ml5.soundClassifier(modelURL + 'model.json');
}

// Initialize the values 
let snake;
let rez = 20;
let food;
let b; // breadth
let h; // height

let timer;

// Setup the board
function setup() {
    createCanvas(640, 480);
    timer = -1;

    classifyAudio(); // Classify The given audio Model

    w = floor(width / rez);
    h = floor(height / rez);
    frameRate(5);
    snake = new Snake();
    foodLocation();
}

function foodLocation() {
    let x = floor(random(b)); // spawn the food in a random x axis location
    let y = floor(random(h)); // spawn the food in a random y axis location
    food = createVector(x, y);

    timer = timer + 1;
    // console.log(timer);
}

function classifyAudio() {
    classifier.classify(gotResults);
}

function gotResults(error, results) {
    // In case of exception
    if (error) {
        console.error(error);
        return;
    }
    // Store the instru and classify again!
    instru = results[0].label; // results[0] displays the highest probability of the input stimulus w.r.t the classes
    controlSnake();
    classifyAudio();
}

function controlSnake() {
    // Function to control the Snake using your Voice!!!
    if (instru === 'left') {  // left label as trained in the model
        snake.setDir(-1, 0);
    } else if (instru === 'right') {  // left label as trained in the model
        snake.setDir(1, 0);
    } else if (instru === 'down') {  // down label as trained in the model
        snake.setDir(0, 1);
    } else if (instru === 'up') {  // up label as trained in the model
        snake.setDir(0, -1);
    }
}

function draw() {
    // main function to draw and resize the snake
    scale(rez);
    background(220);
    text(instru, 10, 50);
    if (snake.eat(food)) {
        foodLocation();
    }
    snake.update();
    snake.show();
    if (snake.endGame()) {
        print('END GAME');
        background(255, 0, 0);
        noLoop();
        
        alert("Well Done!!\n\nYour score is " + timer);
        location.reload();
    }

    noStroke();
    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);
}
