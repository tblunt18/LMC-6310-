/* THIS API KEY IS TEMPORARY, please register for your own key and replace it in the query after &api_key=_____________ 

the temporary key (already placed in url2 variable after &api_key=) is a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5  */

// variables hold user input, greeting, and button 
var input, button2, greeting;
var url1 = 'https://api.wordnik.com/v4/word.json/';
var url2 =
  '/relatedWords?useCanonical=false&limitPerRelationshipType=20&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
// boolean lets us know if user has submitted before 
var firstSubmission;
// holds the word that wordnik will give 
var word;
var link;
// position for moving word
var xpos;
var ypos;
var stringinput; 
var wordsArray = [];
var kathysWords; 

/*******************/
// holds timer variable for counting down  
let time = 10;
// boolean variables are true or false if we're on a given screen
var introScreen, instructionScreen;
// text for intro screen 
var introText = "Calling Kathy AI";
// text for instruction screen 
var instructions = "You're sending a message to your friend, but all systems are down. You need Kathy AI to deliver a voice message. Her vocab is pulled from the web, so her words may not exactly match yours.";
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


/** function runs before setup(), use this to load images and other assets **/
function preload() {
  // load the telephone image 
  img = loadImage('telephone.jpg');
}

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
  
  //set position for wordnik phrase
  xpos = -200;
  ypos = 150; 
  
  firstSubmission = true;
  
  // create a variable that holds user input using createInput() function
  input = createInput();
  // set the position of the text box 20px on x-axis, 64px on y-axis
  input.position(20, 65);
  // create a submit button for the textbox 
  button2 = createButton('submit');
  // set the position 
  button2.position(input.x + input.width, 65);
  // when the button is pressed, call the function that will process the text 
  button2.mousePressed(askWordnik);
  
  /* create a header element on screen that prompts user for their name 
  greeting = createElement('h2', 'Relay your message to Kathy AI');
  // set the position for this text 
  greeting.position(20, 5);*/
  
    // display the introduction screen
  introScreen = true;
  instructionScreen = false;
  textFont('Impact');
  fill(255);
  // create a start button to go to next screen
  button = createButton('PLAY');
  // set the position 
  button.position(width / 2 - 50, height / 2 + 70);
  // size button
  button.size(60, 50);
  // when the button is pressed, call the function that takes us to next screen
  button.mousePressed(nextScreen);
    
}

function draw(){
  // set background color 
  //background(230,119,50);
  
  /** draw code **/
   // if user hasn't navigated past intro screen, stay  
  if (introScreen) {
    // hide user input buttons on intro screen 
    button2.hide();
    input.hide();
    // display the intro screen canvas
    image(img, 0, 0, 720,600);
    // draws moving circles on screen
    drawCircles(); 
    //image(img, 0, height / 2, img.width / 2, img.height / 2);
    textSize(38);
    fill(255);
    text(introText, width / 4+ 50, height - (height / 2));
    textSize(20);
    text("A Game of Telephone",width / 4+90, height - (height / 2 - 40));
     
  } 
  else if (instructionScreen){
    // display canvas for instruction screen 
    background(102, 153, 255);
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
      background(255, 102, 0);
      button2.show();
      input.show();
      // display text and letters entered by user 
      textSize(28);
      fill(0);
      textFont('Impact');
      text("enter your message before Kathy AI times out", 20, 40);
      textSize(20);
      textFont('Verdana');
      
    }
    else{
      background(200);
      // hide user input and submisison button 
      button2.hide();
      input.hide();
      // these conditions only matter once a word is submitted
      if (xpos > width){
        // if the word is off the screen, reset its position 
       xpos = 0;

      }
      else{
        kathysWords = join(wordsArray, ' ');
        textSize(50);
        text(kathysWords, xpos, ypos, width, height);
        xpos+= 1; 
      }
      // time is up, display the message 
      // display letters user has typed as random ellipse/circle shapes 
      drawCircles();
      textSize(20);
      fill(255);
      textFont('Impact');
      text("Here's the message Kathy sent", 30, 90, 500, 200);
      // the send button doesn't connect to a function now. you are tasked with using send to clear this page and leave an ending message 
      button = createButton('FINISH');
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
    for (let i = 0; i < 70; i++) {
      // create random shape objects all along the same y axis
      shapeArray.push(new Shape());
      // set static y value and an incrementing x value to position circle objects 
      //shapeArray[i].overloadConstructor(random(255),250);
     
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
      shapeArray[i].move();
      shapeArray[i].display();
    }
  } 

}

function askWordnik() {
  // if this is our first time clicking submit 
  if (firstSubmission){
    // we're not on the first button submission now 
    firstSubmission = false;
    // load the JSON data using a link constructed from variables, pass in a callback function that processes data
    console.log("input: " + input.value());
    // save the input value 
    stringinput = input.value();
    // split the input string into an array of strings 
    let splitInput = split(stringinput,' ');
    // for every word the user entered
    for (var i = 0; i < splitInput.length; i++){
      // load JSON file from worknik search using url and the current word
      loadJSON(url1 + splitInput[i] + url2, gotData);
    }
    
  }
  // this is not the first time clicking submit 
  else{
    console.log("not first submission");
    // use the word we previously caught from the API 
    loadJSON(url1 + word + url2, gotData);
  }
  
}

// callback function processes data  
function gotData(data) {
  // store random number (random returns floating point number, use floor to get rid of the decimal 
  var index1 = floor(random(0, data.length));
  // use random number to pull a word from wordnik's array of words
  var index2 = floor(random(0, data[index1].words.length));
  // set the related word as the query value for next button submit
  word = data[index1].words[index2];
  // add current related word to the words array 
  append(wordsArray,word); 
  // display the word 
  //greeting.html("submit again");
}

// this class is a modified version of the Jitter class define in the example here https://p5js.org/examples/objects-objects.html
class Shape {
  // this constructor defines values for the circles that fall on the intro screen 
  constructor() {
    this.x = random(700);
    this.y = random(400);
    this.diameter = random(2, 10);
    this.speed = 0.5;
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