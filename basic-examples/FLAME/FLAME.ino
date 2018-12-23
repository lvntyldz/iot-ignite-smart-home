int analogPin  = 3;
int  digitalPin = 2;//2 or 4

//Global variables
int analogPinValue = 0;
int digitalPinValue = 0;

void setup() {
  Serial.begin(115200);
  pinMode(digitalPin, INPUT);
  pinMode(analogPin, INPUT);
  delay(1000);
}

void loop() {
  analogPinValue = analogRead(analogPin);
  digitalPinValue = digitalRead(digitalPin);

  Serial.print("analogPin Value : ");
  Serial.println(analogPinValue);
  
  Serial.print("digitalPin Value : ");
  Serial.println(digitalPinValue);

  if(digitalPinValue==0){
    Serial.println("***Flame detected!!!");
  }else{
    Serial.println("No Flame.");
  }

  delay(300);
}
