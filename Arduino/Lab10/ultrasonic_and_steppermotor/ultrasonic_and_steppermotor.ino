// ---------------------------------------------------------------- //
// Arduino Ultrasoninc Sensor HC-SR04
// Re-writed by Arbi Abdul Jabbaar
// Using Arduino IDE 1.8.7
// Using HC-SR04 Module
// Tested on 17 September 2019
// ---------------------------------------------------------------- //

#define echoPin 11 // attach pin D2 Arduino to pin Echo of HC-SR04
#define trigPin 12 //attach pin D3 Arduino to pin Trig of HC-SR04
// Stepper - Version: Latest 
#include <Stepper.h>

// defines variables
long duration; // variable for the duration of sound wave travel
int distance; // variable for the distance measurement
const int stepsPerRevolution = 800;  // change this to fit the number of steps per revolution
// for your motor
Stepper myStepper(stepsPerRevolution, 4, 5, 6, 7); // initialize the stepper library on pins 4 through 7:

void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPitn as an OUTPUT
  pinMode(echoPin, INPUT); // Sets he echoPin as an INPUT
  Serial.begin(9600); // // Serial Communication is starting with 9600 of baudrate speed
  Serial.println("Ultrasonic Sensor HC-SR04 Test"); // print some text in Serial Monitor
  Serial.println("with Arduino UNO R3");
  // set the speed at 60 rpm:
  myStepper.setSpeed(20);
  // initialize the serial port:
  Serial.begin(9600);
}
void loop() {
  // Clears the trigPin condition
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)
  // Displays the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  if (distance < 100){
    // if an object is close, move the stepper
     // step one revolution  in one direction:
     Serial.println("clockwise");
     myStepper.step(stepsPerRevolution);
     delay(500);
    
     // step one revolution in the other direction:
     Serial.println("counterclockwise");
     myStepper.step(-stepsPerRevolution);
     delay(500);
  }
  
}
