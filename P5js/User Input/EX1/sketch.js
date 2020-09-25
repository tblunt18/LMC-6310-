let input, button, greeting;

function setup() {
  // create 710 x 400 canvas 
  createCanvas(710, 400);
  // create a variable that holds user input using createInput() function
  input = createInput();
  // set the position of the text box 20px on x-axis, 64px on y-axis
  input.position(20, 65);
  // create a submit button for the textbox 
  button = createButton('submit');
  // set the position 
  button.position(input.x + input.width, 65);
  // when the button is pressed, call the function that will process the text 
  button.mousePressed(replicateText);
  // create a header element on screen that prompts user for their name 
  greeting = createElement('h2', 'what is your full name?');
  // set the position for this text 
  greeting.position(20, 5);
  // set alignment and size for text 
  textAlign(CENTER);
  textSize(20);
}

/* this function is used to process the text. This function takes a line from the user and makes random copies of it across the screen */
function replicateText() {
  // take the input from the textbox, save it in this "name" variable
  const name = input.value();
  // add the greeting that was created in setup() to the screen
  greeting.html('hello ' + name + '!');
  // clear the users input 
  input.value('');
  
  // loop while i is less than 200, transform the user input by:
  for (let i = 0; i < 200; i++) {
    // saving current screen so far 
    push();
    // creating a random color for the users input
    fill(random(255), 255, 255);
    // giving it a random position within bounds of the screen
    translate(random(width), random(height));
    rotate(random(2 * PI));
    // drawing the users name on the screen using the text function 
    text(name, 0, 0);
    // restore the previous screen settings 
    pop();
  }
}
