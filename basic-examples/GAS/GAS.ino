int pinDO=3;
int pinAO=4;

void setup() {
  Serial.begin(115200);
  Serial.println(".....starting.....");
  pinMode(pinDO, INPUT);
  pinMode(pinAO, INPUT);
}

void loop() {
  
  int inputDO = digitalRead(pinDO);
  int inputAO = digitalRead(pinAO);

  Serial.print("inputDO : ");
  Serial.println(inputDO);  
  Serial.print("inputAO : ");
  Serial.println(inputAO);

  if(inputAO>0){
    Serial.println("***Gass detected!!!");
  }else{
    Serial.println("No gass.");
  }

  delay(1000);
  
}
