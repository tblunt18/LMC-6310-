//www.elegoo.com
//2018.8.20
/*
  This example use the Y-axle of joystick to control the DC Motor
*/

const int Y_pin = 1; // analog pin connected to Y output

#define ENABLE 5
#define DIRA 3
#define DIRB 4

int i;
 
void setup() {
  //---set pin direction
  pinMode(ENABLE,OUTPUT);
  pinMode(DIRA,OUTPUT);
  pinMode(DIRB,OUTPUT);
  Serial.begin(9600);
}

void loop() {
    long y;
  y = analogRead(Y_pin);
  Serial.print("val=");
  Serial.println(y);
  if(y == 0){
    analogWrite(ENABLE,255); 
    digitalWrite(DIRA,LOW); //one way
    digitalWrite(DIRB,HIGH);
    }
  if(y>0&&y<100){
    analogWrite(ENABLE,200); 
    digitalWrite(DIRA,LOW); //one way
    digitalWrite(DIRB,HIGH);
    }
  if(y>100&&y<250){
    analogWrite(ENABLE,180); 
    digitalWrite(DIRA,LOW); //one way
    digitalWrite(DIRB,HIGH);
    }
  if(y>250&&y<400){
    analogWrite(ENABLE,128); 
    digitalWrite(DIRA,LOW); //one way
    digitalWrite(DIRB,HIGH);
    }
  if(y>400&&y<500){
    analogWrite(ENABLE,80); 
    digitalWrite(DIRA,LOW); //one way
    digitalWrite(DIRB,HIGH);
    }    
  if(y>500&&y<600){
    analogWrite(ENABLE,0); 
    digitalWrite(DIRA,LOW); //one way
    digitalWrite(DIRB,HIGH);
    }
  if(y == 1023){
    analogWrite(ENABLE,255); 
    digitalWrite(DIRA,HIGH); //revers
    digitalWrite(DIRB,LOW);
    }
  if(y>923&&y<1023){
    analogWrite(ENABLE,200); 
    digitalWrite(DIRA,HIGH); //revers
    digitalWrite(DIRB,LOW);
    }
  if(y>800&&y<923){
    analogWrite(ENABLE,180); 
    digitalWrite(DIRA,HIGH); //revers
    digitalWrite(DIRB,LOW);
    }
  if(y>700&&y<800){
    analogWrite(ENABLE,128); 
    digitalWrite(DIRA,HIGH); //revers
    digitalWrite(DIRB,LOW);
    }
  if(y>600&&y<700){
    analogWrite(ENABLE,80); 
    digitalWrite(DIRA,HIGH); //revers
    digitalWrite(DIRB,LOW);
    }    
}
   
