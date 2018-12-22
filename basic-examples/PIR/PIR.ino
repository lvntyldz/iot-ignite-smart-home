
int sensor = 13;

void setup() {
  Serial.begin(9600);
  pinMode(sensor, INPUT); // declare sensor as input
}

void loop(){
    long state = digitalRead(sensor);
    Serial.print("state Value : ");
    Serial.println(state);

    delay(100);
    
    if(state == HIGH){
      Serial.println("Motion detected!");
    } else {
      Serial.println("Motion absent!");
    }
}
