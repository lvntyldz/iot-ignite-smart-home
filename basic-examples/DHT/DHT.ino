#include "DHT.h"

#define DHTPIN 4 // 2

#define DHTTYPE DHT11 // DHT 11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("DHT starting...");
  dht.begin();
}

void loop() {
  delay(2000);

  //humidity
  float h = dht.readHumidity();

//temperature
  float t = dht.readTemperature();

//temperature(Fahrenheit)
  float f = dht.readTemperature(true);

  // Check results.
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed to read from DHT sensor!!!");
    return;
  }

  // Compute as Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute as  Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(" *C ");
  Serial.print(f);
  Serial.print(" *F\t");
  Serial.print("Heat index: ");
  Serial.print(hic);
  Serial.print(" *C ");
  Serial.print(hif);
  Serial.println(" *F");
}
