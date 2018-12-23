int buzzerPin = 2;// 2 or 4 (depends on board)

void setup (){
  
        Serial.begin(115200);
        Serial.println(".....starting.....");

        pinMode (buzzerPin, OUTPUT);
}

void loop (){

  Serial.println("Tone sending...");
  digitalWrite (buzzerPin, HIGH); //send tone
  delay(1000);
  Serial.println("Tone stopping...");
  digitalWrite (buzzerPin, LOW); //no tone
  delay(100);

}
