package com.okan.headlessgateway.constant;

public class DynamicNodeConstants {
    public static final String TYPE = "DYNAMIC NODE - DHT11 SENSOR";
    public static final String TEMPERATURE_SENSOR = "DHT11 Temperature Sensor";
    public static final String HUMIDITY_SENSOR = "DHT11 Humidity Sensor";
    public static final String MQ6_GAS_SENSOR = "MQ6 GAS Sensor";
    public static final String FLAME_SENSOR = "Flame Sensor";
    public static final String RAIN_SENSOR = "Rain Sensor";

    public static final String ACTUATOR_BLUE_LED = "Blue LED Actuator";
    public static final String LED_ON_ACTION = "{\"status\":1.0}";
    public static final String LED_OFF_ACTION = "{\"status\":0.0}";

    private DynamicNodeConstants() {
    }
}
