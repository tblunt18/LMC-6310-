/* THIS API KEY IS TEMPORARY, please register for your own key and replace it in the query after &api_key=_____________ 

the temporary key (already placed in url2 variable) is VIDEO KEY a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5  */

// variables hold user input, greeting, and button 
var input, button, greeting;
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

function setup() {
  //set position for wordnik word
  xpos = 0;
  ypos = 250; 
  firstSubmission = true;
  // create a variable that holds user input using createInput() function
  input = createInput();
  // set the position of the text box 20px on x-axis, 64px on y-axis
  input.position(20, 65);
  // create a submit button for the textbox 
  button = createButton('submit');
  // set the position 
  button.position(input.x + input.width, 65);
  // when the button is pressed, call the function that will process the text 
  button.mousePressed(askWordnik);
  
  // create a header element on screen that prompts user for their name 
  greeting = createElement('h2', 'enter a word');
  // set the position for this text 
  greeting.position(20, 5);
  
  // create 710 x 400 canvas 
  createCanvas(710, 400);
    
}

function draw(){
  // set background color 
  background(230,119,50);
  // these conditions only matter once a word is submitted
  if (xpos > width){
    // if the word is off the screen, reset its position 
   xpos = 0;
    
  }
  else{
    // display text, keep it in bounds of width and height of canvas
    text(word, xpos, ypos, width, height);
    // make text 50px size 
    textSize(50);
    // move x position by 1
    xpos++;
  }
  
}

function askWordnik() {
  // if this is our first time clicking submit 
  if (firstSubmission){
    // we're not on the first button submission now 
    firstSubmission = false;
    // load the JSON data using a link constructed from variables, pass in a callback function that processes data
    loadJSON(url1 + input.value() + url2, gotData);
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
  // display the word 
  greeting.html("submit again");
}