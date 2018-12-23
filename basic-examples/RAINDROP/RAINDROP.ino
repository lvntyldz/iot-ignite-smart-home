int pinRainDrop=4;// pin number is 4 or 2

void setup() {
  Serial.begin(115200);
  Serial.println(".....starting.....");
  pinMode(pinRainDrop, INPUT);
}

void loop() {

  int inputRainDrop = digitalRead(pinRainDrop);

  Serial.print("inputRainDrop : ");
  Serial.println(inputRainDrop);

  if(inputRainDrop==0){
    Serial.println("***Rain detected!!!");
  }else{
    Serial.println("No Rain.");
  }

  delay(1000);

}
