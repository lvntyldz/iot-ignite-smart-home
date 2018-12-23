int pinRainDrop=4;// pin number is 4 or 2

void setup() {
  Serial.begin(115200);
  Serial.println(".....starting.....");
  pinMode(pinRainDrop, INPUT_PULLUP);
}

void loop() {

  int inputRainDrop = digitalRead(pinRainDrop);

  Serial.print("inputRainDrop : ");
  Serial.println(inputRainDrop);

  if(inputRainDrop==1){
    Serial.println("***The door opened!!!");
  }else{
    Serial.println("Door closed.");
  }

  delay(1000);
}
