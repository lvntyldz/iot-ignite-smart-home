#include <Arduino.h>
#include "IgniteEsp8266WifiManager.h"
#include "IgniteEsp8266ThingHandler.h"

IgniteEsp8266ThingHandler handler;
IgniteEsp8266WifiManager manager(&handler);

IgniteEsp8266Hotspot hotspot;

void setup() {
  manager.setup();
  //hotspot.startHotspot();
  //Serial.begin(115200);
  
}
void loop() {
  Serial.println(WiFi.localIP());
  manager.loop();

  
  //hotspot.startHotspot();
  delay(5000);

}
