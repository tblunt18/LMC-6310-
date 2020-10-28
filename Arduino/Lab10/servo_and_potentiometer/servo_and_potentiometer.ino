/* Learn how to use a potentiometer to fade an LED with Arduino - Tutorial
   More info and circuit schematic: http://www.ardumotive.com/arduino-tutorials/arduino-fade-led
   Dev: Michalis Vasilakis / Date: 25/10/2014                                                   */

// add servo header file
#include <Servo.h>  

//Constants:
const int ledPin = 9;  //pin 9 has PWM funtion output 
const int potPin = A0; //pin A0 to read analog input

//Variables for potentiometer
int value; //save analog value
int sensorValue = 0;        // value read from the pot
int outputValue = 0;        // value output to the PWM (analog out)

// variables for servo
Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards
int pos = 0;    // variable to store the servo position
bool lightLow = false;

void setup(){
  //Input or output?
  pinMode(ledPin, OUTPUT); 
  pinMode(potPin, INPUT); //Optional 
  myservo.attach(10);  // attaches the servo on pin 10 to the servo object
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);

}

void loop(){
  /* potentiometer code */
  value = analogRead(potPin);          //Read and save analog value from potentiometer
  value = map(value, 0, 1023, 200, 255); //Map value 0-1023 to 0-255 (PWM)
  analogWrite(ledPin, value);          //Send PWM value to led
  delay(100);                          //Small delay

  /*serial stuff*/
  // read the analog in value:

  sensorValue = analogRead(potPin);

  // map it to the range of the analog out:

  outputValue = map(sensorValue, 0, 1023, 0, 255);

  // change the analog out value:

  analogWrite(ledPin, outputValue);

  // print the results to the Serial Monitor:
  Serial.print("sensor = ");
  Serial.print(sensorValue);
  Serial.print("\t output = ");
  Serial.println(outputValue);

  if (sensorValue < 400){
    lightLow = true;
  }
  else{
    lightLow = false;
  }

  if (lightLow){ // if potentiometer is below 400, this means LED light is low. Move motor 
    for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
      // in steps of 1 degree
      myservo.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
    }
    for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
      myservo.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
    }
  }
  // wait 2 milliseconds before the next loop for the analog-to-digital

  // converter to settle after the last reading:

  delay(2);
}


                           
