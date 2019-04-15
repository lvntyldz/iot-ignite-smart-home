#include "IgniteEsp8266ThingHandler.h"

#include "IgniteEsp8266Timer.h"
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>

// Node Type
#define NODE_TYPE "DYNAMIC NODE - DHT11 SENSOR"

// Sensors
#define SENSOR_MQ6_GAS "MQ6 GAS Sensor"
#define SENSOR_DHT11_TEMPERATURE "DHT11 Temperature Sensor"
#define SENSOR_DHT11_HUMIDITY "DHT11 Humidity Sensor"

#define ACTUATOR true
#define NOT_ACTUATOR false

// Sensor Types
#define TYPE_MQ6_GAS "Mq6Gas"
#define TYPE_TEMPERATURE "Temperature"
#define TYPE_HUMIDITY "Humidity"
#define TYPE_LED "Led"

// Actuators
#define ACTUATOR_BLUE_LED "Blue LED Actuator"

// ConnectedPinsForInfo
#define PIN_DATA_MQ6_GAS_SENSOR "D5"
#define PIN_DATA_DHT11_SENSOR "D4"
#define PIN_DATA_BLUE_LED "D6"

#define PIN_MQ6_GAS_SENSOR D5
#define PIN_DHT11_SENSOR D4
#define PIN_BLUE_LED D6
#define PIN_RESET_BUTTON D8

// reset button
#define PIN_DATA_RESET_BUTTON "D8"

// Vendors
#define VENDOR_MQ6_GAS "MQ-6 Gas Sensor"
#define VENDOR_DHT11 "DHT11 Temperature And Humidity Sensor"
#define VENDOR_BLUE_LED "Simple Diode"

// Data Types
#define DATA_TYPE_FLOAT "FLOAT"
#define DATA_TYPE_STRING "STRING"
#define DATA_TYPE_INTEGER "INTEGER"
#define DATA_TYPE_BOOLEAN "BOOLEAN"

// DHT Specific
#define DHTTYPE DHT11

#define CONFIG_REQUEST "configuration"
#define ACTION_REQUEST "action"
#define RESET_REQUEST "reset"
#define DATA_RESPONSE "data"
#define STATUS_REQUEST "inventory-status"

DHT *IgniteEsp8266ThingHandler::dht = new DHT(PIN_DHT11_SENSOR, DHTTYPE);

bool IgniteEsp8266ThingHandler::ledState;

long IgniteEsp8266ThingHandler::resetStateTime;

void IgniteEsp8266ThingHandler::setup() {
  initBlueLED();
  initResetButton();
  initMq6Gas();
  dht->begin();
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

  addThingToInventory(SENSOR_MQ6_GAS, TYPE_MQ6_GAS,
                      PIN_DATA_MQ6_GAS_SENSOR, NOT_ACTUATOR, VENDOR_MQ6_GAS,
                      DATA_TYPE_INTEGER,
                      new IgniteEsp8266Timer(readMq6Gas));

  addThingToInventory(SENSOR_DHT11_TEMPERATURE, TYPE_TEMPERATURE,
                      PIN_DATA_DHT11_SENSOR, NOT_ACTUATOR, VENDOR_DHT11,
                      DATA_TYPE_FLOAT,
                      new IgniteEsp8266Timer(readDHTTemperature));

  addThingToInventory(SENSOR_DHT11_HUMIDITY, TYPE_HUMIDITY,
                      PIN_DATA_DHT11_SENSOR, NOT_ACTUATOR, VENDOR_DHT11,
                      DATA_TYPE_FLOAT, new IgniteEsp8266Timer(readDHTHumidity));

  addThingToInventory(ACTUATOR_BLUE_LED, TYPE_LED, PIN_DATA_BLUE_LED, ACTUATOR,
                      VENDOR_BLUE_LED, DATA_TYPE_STRING,
                      new IgniteEsp8266Timer(readLedData));
}

void IgniteEsp8266ThingHandler::unknownMessageReceived(String msg) {
  Serial.println("----- ----- ----- unknownMessageReceived ----- ----- -----");
  Serial.print("msg");
  Serial.println(msg);
}

void IgniteEsp8266ThingHandler::readDHTTemperature() {
  Serial.println("----- ----- ----- readDHTTemperature ----- ----- -----");
  String packet = "";
  String tempData = "";
  float t = dht->readTemperature();

  Serial.print("Temperature : ");
  Serial.println(t);

  if (isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  tempData = String(t);

  StaticJsonBuffer<100> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  JsonArray &data = root.createNestedArray("data");

  root["messageType"] = DATA_RESPONSE;
  root["thingId"] = SENSOR_DHT11_TEMPERATURE;
  data.add(tempData);

  root.printTo(packet);

  Serial.println("Temperature :");
  Serial.println(packet);
  packet += "\n";
  sendMessage(packet);
}

void IgniteEsp8266ThingHandler::readDHTHumidity() {
  Serial.println("----- ----- ----- readDHTHumidity ----- ----- -----");
  String packet = "";
  String humData = "";
  float h = dht->readHumidity();

  Serial.print("Humidity : ");
  Serial.println(h);


  if (isnan(h)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  humData = String(h);

  StaticJsonBuffer<100> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  JsonArray &data = root.createNestedArray("data");

  root["messageType"] = DATA_RESPONSE;
  root["thingId"] = SENSOR_DHT11_HUMIDITY;
  data.add(humData);

  root.printTo(packet);
  Serial.println("Humidity :");
  Serial.println(packet);
  packet += "\n";
  sendMessage(packet);
}

void IgniteEsp8266ThingHandler::readMq6Gas() {
  Serial.println("----- ----- ----- readMq6Gas ----- ----- -----");
  String packet = "";
  String gasData = "";

  int gasVal = digitalRead(PIN_MQ6_GAS_SENSOR);

  Serial.print("Gas : ");
  Serial.println(gasVal);

  if (isnan(gasVal)) {
    Serial.println("Failed to read from MQ6 Gas sensor!");
    return;
  }

  gasData = String(gasVal);

  StaticJsonBuffer<100> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  JsonArray &data = root.createNestedArray("data");

  root["messageType"] = DATA_RESPONSE;
  root["thingId"] = SENSOR_MQ6_GAS;
  data.add(gasData);

  root.printTo(packet);
  Serial.println("Gas :");
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

void IgniteEsp8266ThingHandler::initMq6Gas() {
  Serial.println("----- ----- ----- initMq6Gas ----- ----- -----");
  pinMode(PIN_MQ6_GAS_SENSOR, INPUT);
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
