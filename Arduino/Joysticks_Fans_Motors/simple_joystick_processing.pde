import processing.serial.*;
Serial myPort;  // Create object from Serial class
String val; 
// Data received from the serial port
String xvalue;
String yvalue;
String[] splitValues;



void setup()
{
  // I know that the first port in the serial list on my mac
  // is Serial.list()[0].
  // On Windows machines, this generally opens COM1.
  // Open whatever port is the one you're using.
  String portName = Serial.list()[2]; //change the 0 to a 1 or 2 etc. to match your port
  myPort = new Serial(this, portName, 9600);
  
  size(640, 480);
}

void draw()
{
  if ( myPort.available() > 0){  // If data is available,
    val = myPort.readStringUntil('\n');   // read it and store it in val
  } 
  
  // split incoming data string 
  if (val != null){
    splitValues = split(val,"\t");
    xvalue = splitValues[0];
    yvalue = splitValues[1];
  }
  //print the values 
  println(xvalue);
  println(yvalue);
  
  ellipse(224, 184, 220,200);
  
  // Challenge: map the x and y values to the position of the ellipse draw on the screen
}
