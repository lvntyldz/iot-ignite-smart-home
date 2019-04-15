#ifndef _INCL_IGNITE_ESP8266THING_HANDLER
#define _INCL_IGNITE_ESP8266THING_HANDLER

#include "IgniteThingHandler.h"

class IgniteEsp8266ThingHandler : public IgniteThingHandler {


  public :

    IgniteEsp8266ThingHandler();
    ~IgniteEsp8266ThingHandler();
    virtual void thingActionReceived(String thingId, String action);
    virtual void inventorySetup();
    virtual void unknownMessageReceived(String msg);
    static void readLedData();
    static void readFlame();
    static void readRain();
    virtual void setup();



  private :
    String getMacAddress();
    static bool ledState;
    static long resetStateTime;
    void initBlueLED();
    void initFlame();
    void initRain();
    void initResetButton();
    static void resetOn();
    static void resetOnFinal();
    void setBlueLED(int msg);
};

#endif
