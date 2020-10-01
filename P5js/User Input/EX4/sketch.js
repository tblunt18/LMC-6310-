// holds timer variable for counting down  
let time = 10;
// rectangle width for when a message is typed
let rectWidth;
// boolean variables are true or false if we're on a given screen
var introScreen, instructionScreen;
// text for intro screen 
var introText = "Earth to Nebulon";
// text for instruction screen 
var instructions = "COVID-19 is out of our hands, it's time to call in reinforcements. Send an S.O.S to our allies on planet Nebulon. The system will have to perform some translations to get the message across.*BE QUICK, THE CLOCK IS TICKING!!";
// input and button variables (not all are used, these can be worked with)
var input, button, greeting;
// holds universe image on intro screen 
var img;
// used for creating circle objects
let circle;
// position variables
let x, y;
// holds an array of circles/ Shape() objects 
let shapeArray = [];
// boolean variable will be false when player is out of time 
let timesUp;
// holds all letters, spaces, and periods typed by user. 
let letters = [];

/** function runs before setup(), use this to load images and other assets **/
function preload() {
  // load the universe image 
  img = loadImage('universe.jpg');
}

/** runs before draw() **/
function setup() {
  // Create floating circles that fall down intro screen 
  for (let i = 0; i < 15; i++) {
    shapeArray.push(new Shape());
  }
  // position of letters to be displayed to user after intro screen
  x = width/2;
  y = 350;
  
  // set appearance of canvas 
  createCanvas(720, 400);
  noStroke();
  background(230);
  rectWidth = width / 4;

  // display the introduction screen
  introScreen = true;
  instructionScreen = false;
  textFont('Impact');
  fill(255);
  // create a start button to go to next screen
  button = createButton('START');
  // set the position 
  button.position(width / 2 - 50, height / 2 + 70);
  // size button
  button.size(60, 50);
  // when the button is pressed, call the function that takes us to next screen
  button.mousePressed(nextScreen);
}

function draw() {
  // if user hasn't navigated past intro screen, stay  
  if (introScreen) {
    // display the intro screen canvas
    image(img, 0, 0, 720,600);
    // draws moving circles on screen
    drawCircles(); 
    //image(img, 0, height / 2, img.width / 2, img.height / 2);
    textSize(38);
    fill(255);
    text(introText, width / 4+ 50, height - (height / 2));
    textSize(20);
    text("S.O.S Pandemically",width / 4+90, height - (height / 2 - 40));
     
  } 
  else if (instructionScreen){
    // display canvas for instruction screen 
    background(0);
     // set the position 
    button.position(650, 350);
    // size button
    button.size(40, 40);
    // when the button is pressed, call the function that takes us to next screen
    button.mousePressed(nextScreen);
    // draw the stars 
    drawCircles();
    // fill
    fill(255);
    // message box 
    rect(30, 70, 550, 200, 20);
    // instructions
    textSize(25);
    fill(0);
    text(instructions,50, 100, 500, 400);  
  }
  else {
    // if time isn't up, let the user type a message  
    if (!timesUp){
      // display text and letters entered by user 
      textSize(28);
      fill(0);
      textFont('Impact');
      text("click the screen, type your message (be quick)", 20, 40);
      textSize(20);
      textFont('Verdana');
      // display letters user has typed 
      text(join(letters,''), x, y); 
    }
    else{
      // time is up, display the message 
      background(0);
      // display letters user has typed as random ellipse/circle shapes 
      drawCircles();
      textSize(20);
      fill(255);
      textFont('Impact');
      text("YOUR MESSAGE HAS BEEN TRANSLATED BELOW (Nebulonians write in shapes, hues, and size)", 30, 90, 500, 200);
      // the send button doesn't connect to a function now. you are tasked with using send to clear this page and leave an ending message 
      button = createButton('SEND');
      button.position(width / 2 - 50, height / 2 + 110);
      // size button
      button.size(60, 40);
    } 
  }

}

// function handles transitions from intro screen > instruction screen > home screen
function nextScreen() {
  
  if (introScreen){
    // set intro screen to false, since we're not there anymore 
    introScreen = false;
    // move to instruction screen
    instructionScreen = true;
    // hide the 'play' button from intro screen [the clear() function doesn't work for DOM elements like createButton]
    button.hide();
    // clear the canvas of other elements 
    clear();
    // clear the array of shape objects
    shapeArray = [];
    // create a submit button to go to next screen
    button = createButton('>>>');
    // create array of stars in its place 
    for (let i = 0; i < 150; i++) {
      shapeArray.push(new Shape(random(700),random(400)));
    }
  }
  else{
    // hide and clear previous elements to go to home screen 
    instructionScreen = false;
    button.hide();
    clear();
    // set up timer variables 
    timer = createP(" ");
    timer.style('font-size', '38px');
    timer.style('font-family', 'Impact');
    // this calls the timer function every 1000 ms
    setInterval(timeIt, 1000);
    // time just started, so its not up yet 
    timesUp = false;
  }
  
}

// this function handles the timer, and is only called after the player has navigated through the first two screens 
function timeIt(){
  timer.html(time);
  if (time > 0){
     time --;
  }

  if (time == 0 && !timesUp) {
    // time is up (so the user can't type anymore)
    timesUp = true;
    // clear shapeArray (it was last used on the instruction screen, so we want to empty it)
    shapeArray = [];
    // create a new set of shapes 
    // Create set of circles that will be generated based on number of characters entered by the user 
    var newXPosition = 30;
    for (let i = 0; i < letters.length; i++) {
      // create random shape objects all along the same y axis
      //shapeArray.push(new Shape(newXPosition,250));
      shapeArray.push(new Shape());
      // set static y value and an incrementing x value to position circle objects 
      shapeArray[i].overloadConstructor(newXPosition,250);
      // increment the x position so that the circles are in one line alone the x axis
      newXPosition += 40;
    }
    
  } 
  
}

function drawCircles() {
  // display falling circles on intro screen
  if (introScreen){
    for (let i = 0; i < shapeArray.length; i++) {
      shapeArray[i].move();
      shapeArray[i].display();
    }
  }
  // display moving stars on instruction screen
  else if (instructionScreen){
    // display star objects 
    for (let i = 0; i < shapeArray.length; i++) {
      shapeArray[i].moveStar();
      shapeArray[i].displayStar();
    }
  }
  // display the circles that double as letters after time is up and game is over 
  else{
    for (let i = 0; i < shapeArray.length; i++) {
      //shapeArray[i].move();
      shapeArray[i].display();
    }
  } 

}


// key pressed function is pulled from Keyboard Example on p5.js site
function keyPressed() {
  // if time is not up, allow key press events to occur 
  if (!timesUp){
    let keyIndex = -1;
    if (key >= 'a' && key <= 'z') {

      keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    if (keyCode == 32) {
      // the user pressed space bar 
      append(letters,"  ");
    }
    if (keyCode == 190){
      append(letters, ".")
    }
    else {
      if (keyIndex === -1) {
        // If it's not a letter key, clear the screen
        background(230);
      }
      else{
         // add the current key to the array of letters 
        append(letters,key);

        // It's a letter key, fill a rectangle
        randFill_r = Math.floor(Math.random() * 255 + 1);
        randFill_g = Math.floor(Math.random() * 255 + 1);
        randFill_b = Math.floor(Math.random() * 255 + 1);
        fill(randFill_r, randFill_g, randFill_b);
        let xpos = map(keyIndex, 0, 25, 0, width - rectWidth);
        rect(xpos, 0, rectWidth, height);
      }

    }
  }
  
}

// this class is a modified version of the Jitter class define in the example here https://p5js.org/examples/objects-objects.html
class Shape {
  // this constructor defines values for the circles that fall on the intro screen 
  constructor() {
    this.x = random(700);
    this.y = random(400);
    this.diameter = random(2, 10);
    this.speed = 0.2;
    this.color = color(random(150,255),random(150,255),random(150,255));
    
  }
  
  // overload constructor for the circles that mimic stars on the instruction screen
  overloadConstructor(xpos,ypos){
    this.x = xpos;
    this.y = ypos;
    this.speed = 1;
    this.diameter = random(10,50);
    this.color = color(random(150,255),random(150,255),random(150,255));
  }
  
  // moves circles on intro screen
  move() {
    this.y += this.speed;
    this.x += random(-this.speed, this.speed);
    
    // Reset to the bottom of screen if shape is past canvas 
    if (this.y > height || this.y < 0) {
      this.y = random(height);
    }
  }
  
  // moves stars on the instruction screen 
  moveStar(){
   this.x += random(-this.speed + 7, this.speed); 
    // Reset to the bottom of screen if shape is past canvas 
    if (this.x > width) {
      this.x = random(1,100);
      this.y = random(height);
    }
  }
  
  display() {
    fill(this.color,0.2);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
  
  displayStar(){
    fill(255);
    ellipse(this.x, this.y, 1, 1);
    
  }
}