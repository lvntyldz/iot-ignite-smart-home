#include "IgniteEsp8266ThingHandler.h"

#include "IgniteEsp8266Timer.h"
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>

// Node Type
#define NODE_TYPE "DYNAMIC NODE - DHT11 SENSOR"

// Sensors
#define SENSOR_FLAME "Flame Sensor"
#define SENSOR_RAIN "Rain Sensor"

#define ACTUATOR true
#define NOT_ACTUATOR false

// Sensor Types
#define TYPE_FLAME "Flame"
#define TYPE_RAIN "Rain"
#define TYPE_LED "Led"

// Actuators
#define ACTUATOR_BLUE_LED "Blue LED Actuator"

// ConnectedPinsForInfo
#define PIN_DATA_FLAME_SENSOR "D3"
#define PIN_DATA_RAIN_SENSOR "D5"
#define PIN_DATA_BLUE_LED "D6"

#define PIN_FLAME_SENSOR D3
#define PIN_RAIN_SENSOR D5
#define PIN_BLUE_LED D6
#define PIN_RESET_BUTTON D8

// reset button
#define PIN_DATA_RESET_BUTTON "D8"

// Vendors
#define VENDOR_FLAME "Flame Sensor"
#define VENDOR_RAIN "Rain Sensor"
#define VENDOR_BLUE_LED "Simple Diode"

// Data Types
#define DATA_TYPE_FLOAT "FLOAT"
#define DATA_TYPE_STRING "STRING"
#define DATA_TYPE_INTEGER "INTEGER"
#define DATA_TYPE_BOOLEAN "BOOLEAN"

#define CONFIG_REQUEST "configuration"
#define ACTION_REQUEST "action"
#define RESET_REQUEST "reset"
#define DATA_RESPONSE "data"
#define STATUS_REQUEST "inventory-status"

bool IgniteEsp8266ThingHandler::ledState;

long IgniteEsp8266ThingHandler::resetStateTime;

void IgniteEsp8266ThingHandler::setup() {
  initBlueLED();
  initResetButton();
  initFlame();
  initRain();
}

IgniteEsp8266ThingHandler::IgniteEsp8266ThingHandler()
    : IgniteThingHandler(NODE_TYPE, getMacAddress()) {
  ledState = false;
  resetStateTime = 0;
}

IgniteEsp8266ThingHandler::~IgniteEsp8266ThingHandler() {}

void IgniteEsp8266ThingHandler::thingActionReceived(String thingId,
                                                    String action) {

  Serial.println("Action Received For :");
  Serial.println(thingId);

  Serial.println("Action Message :");
  Serial.println(action);

  StaticJsonBuffer<250> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(action);

  if (thingId.equals(ACTUATOR_BLUE_LED)) {
    float actionMsg = root["status"];
    setBlueLED(actionMsg);
  }
}

void IgniteEsp8266ThingHandler::inventorySetup() {

  Serial.println("----- ----- ----- inventorySetup ----- ----- -----");

  addThingToInventory(SENSOR_FLAME, TYPE_FLAME,
                      PIN_DATA_FLAME_SENSOR, NOT_ACTUATOR, VENDOR_FLAME,
                      DATA_TYPE_INTEGER,
                      new IgniteEsp8266Timer(readFlame));

  addThingToInventory(SENSOR_RAIN, TYPE_RAIN,
                      PIN_DATA_RAIN_SENSOR, NOT_ACTUATOR, VENDOR_RAIN,
                      DATA_TYPE_INTEGER,
                      new IgniteEsp8266Timer(readRain));

  addThingToInventory(ACTUATOR_BLUE_LED, TYPE_LED, PIN_DATA_BLUE_LED, ACTUATOR,
                      VENDOR_BLUE_LED, DATA_TYPE_STRING,
                      new IgniteEsp8266Timer(readLedData));
}

void IgniteEsp8266ThingHandler::unknownMessageReceived(String msg) {
  Serial.println("----- ----- ----- unknownMessageReceived ----- ----- -----");
  Serial.print("msg");
  Serial.println(msg);
}

void IgniteEsp8266ThingHandler::readFlame() {
  Serial.println("----- ----- ----- readFlame ----- ----- -----");
  String packet = "";
  String flameData = "";

  int flameVal = digitalRead(PIN_FLAME_SENSOR);

  Serial.print("flame : ");
  Serial.println(flameVal);


  if(flameVal==0){
    Serial.println("***Flame detected!!!");
  }else{
    Serial.println("No Flame.");
  }


  if (isnan(flameVal)) {
    Serial.println("Failed to read from Flame sensor!");
    return;
  }

  flameData = String(flameVal);

  StaticJsonBuffer<100> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  JsonArray &data = root.createNestedArray("data");

  root["messageType"] = DATA_RESPONSE;
  root["thingId"] = SENSOR_FLAME;
  data.add(flameData);

  root.printTo(packet);
  Serial.println("flame :");
  Serial.println(packet);
  packet += "\n";
  sendMessage(packet);
}

void IgniteEsp8266ThingHandler::readRain() {
  Serial.println("----- ----- ----- readRain ----- ----- -----");
  String packet = "";
  String rainData = "";

  int rainVal = digitalRead(PIN_RAIN_SENSOR);

  Serial.print("Rain : ");
  Serial.println(rainVal);


  if(rainVal==0){
    Serial.println("***Rain detected!!!");
  }else{
    Serial.println("No Rain.");
  }


  if (isnan(rainVal)) {
    Serial.println("Failed to read from Rain sensor!");
    return;
  }

  rainData = String(rainVal);

  StaticJsonBuffer<100> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  JsonArray &data = root.createNestedArray("data");

  root["messageType"] = DATA_RESPONSE;
  root["thingId"] = SENSOR_RAIN;
  data.add(rainData);

  root.printTo(packet);
  Serial.println("rain :");
  Serial.println(packet);
  packet += "\n";
  sendMessage(packet);
}

void IgniteEsp8266ThingHandler::readLedData() {
  Serial.println("----- ----- ----- readLedData ----- ----- -----");
  String packet = "";
  StaticJsonBuffer<100> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  JsonArray &data = root.createNestedArray("data");

  String ledDataString = "";

  if (ledState) {
    ledDataString = "ON";
  } else {
    ledDataString = "OFF";
  }
  root["messageType"] = DATA_RESPONSE;
  root["thingId"] = ACTUATOR_BLUE_LED;
  data.add(ledDataString);

  root.printTo(packet);
  Serial.println("Blue LED :");
  Serial.println(packet);
  packet += "\n";
  sendMessage(packet);
}

String IgniteEsp8266ThingHandler::getMacAddress() {
  Serial.println("----- ----- ----- getMacAddress ----- ----- -----");

  byte mac[6];
  WiFi.macAddress(mac);
  String cMac = "";
  for (int i = 0; i < 6; ++i) {
    cMac += String(mac[i], HEX);
    if (i < 5)
      cMac += ":";
  }
  cMac.toUpperCase();
  return cMac;
}

void IgniteEsp8266ThingHandler::initBlueLED() {
  Serial.println("----- ----- ----- initBlueLED ----- ----- -----");
  pinMode(PIN_BLUE_LED, OUTPUT);
  digitalWrite(PIN_BLUE_LED, LOW);
}

void IgniteEsp8266ThingHandler::initFlame() {
  Serial.println("----- ----- ----- initFlame ----- ----- -----");
  pinMode(PIN_FLAME_SENSOR, INPUT);
}

void IgniteEsp8266ThingHandler::initRain() {
  Serial.println("----- ----- ----- initRain ----- ----- -----");
  pinMode(PIN_RAIN_SENSOR, INPUT);
}

void IgniteEsp8266ThingHandler::initResetButton() {
  Serial.println("----- ----- ----- initResetButton ----- ----- -----");
  pinMode(PIN_RESET_BUTTON, INPUT);
  attachInterrupt(PIN_RESET_BUTTON, resetOn, RISING);
}

void IgniteEsp8266ThingHandler::resetOn() {
  Serial.println("----- ----- ----- resetOn ----- ----- -----");
  Serial.println("\nHold Reset Button 4 Sec.\n");
  detachInterrupt(PIN_RESET_BUTTON);
  attachInterrupt(PIN_RESET_BUTTON, resetOnFinal, FALLING);
  resetStateTime = millis();
}

void IgniteEsp8266ThingHandler::resetOnFinal() {
  Serial.println("----- ----- ----- resetOnFinal ----- ----- -----");
  detachInterrupt(PIN_RESET_BUTTON);

  if ((resetStateTime + 4000) < millis()) {
    Serial.println("\nResetting...\n");
    reset();
  } else {
    Serial.println("\nFail to reset. Push 4 Sec.\n");
    attachInterrupt(PIN_RESET_BUTTON, resetOn, RISING);
  }
}

void IgniteEsp8266ThingHandler::setBlueLED(int msg) {
  Serial.println("----- ----- ----- setBlueLED ----- ----- -----");
  Serial.println("LED MSG :");
  Serial.println(msg);
  String ledSyncMessage = "{\"ledState\":";

  if (msg == 1) {
    digitalWrite(PIN_BLUE_LED, HIGH);
    ledState = true;
    ledSyncMessage += "1}";

  } else if (msg == 0) {
    digitalWrite(PIN_BLUE_LED, LOW);
    ledState = false;
    ledSyncMessage += "0}";
  }

  // send syncronization message here.
  sendMessage(ledSyncMessage);
}
