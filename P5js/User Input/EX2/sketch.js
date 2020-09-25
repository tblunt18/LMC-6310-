let input;
let h1;
let h5;
let xposition;
let yposition;
let shuffledinput;
let r;
let g;
let b;

function setup() {
  // set the x and y position for our main text 
  xposition = 5;
  yposition = 100; 
  // input initially unshuffled, set it to empty string
  shuffledInput = ''
  // holds the values for background color (r,g,b)
  r = random(255);
  g = random(255);
  b = random(255);
  // display 2 header elements 
  h1 = createElement('h3', 'Whats your fav book? why?');
  h5 = createElement('h5', 'press enter when finished');
  // set position for headers
  h1.position(5, 5);
  h5.position(5, 25);
  
  // create canvas 500px by 500px
  createCanvas(500, 500);
  // create a variable that holds user input using createInput() function 
  input = createInput('type here');
  // give textbox a size 
  input.size(200, 20);
  
}

function draw() {
  // background color using variables from setup()
  background(r,g, b);
  // display user input, but confine it to stay within window
  text(input.value(), xposition,yposition, width, height);
  // display shuffled user input (will be blank until text is entered)
  text(shuffledInput, xposition,yposition + 200, width, height);
  
}

function keyPressed(){
  // check to see if ENTER button has been pressed 
  if (keyCode == ENTER){
    // pick a random new background color 
    r = random(255);
    g = random(255);
    b = random(255);

    // call the function that shuffles our input
    shuffleInput();
    
  }
  
}

/* this function grabs user's input, shuffles it, and displays it below original input */
function shuffleInput(){
    // save the input value 
    stringinput = input.value();
    // split the input string into an array of strings 
    let splitStringInput = split(stringinput,' ');
    // shuffle the order of words in the array 
    let shuffledText = shuffle(splitStringInput);
    // join the new shuffled array into a string, save in shuffledInput variable from initial setup()   
    shuffledInput = join(shuffledText, ' ');  
    
}