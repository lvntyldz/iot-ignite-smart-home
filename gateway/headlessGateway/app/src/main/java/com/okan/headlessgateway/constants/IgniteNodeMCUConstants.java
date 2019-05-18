package com.okan.headlessgateway.constants;

public class IgniteNodeMCUConstants {

    //network constants
    public static final int PORT = 9999;
    public static final String SERVICE_TYPE = "_iotignite._tcp.local.";
    public static final String SERVICE_NAME = "IotIgnite-ESP-Gateway";
    public static final String INVENTORY_OK_MSG = "{\"messageType\":\"inventory-status\", \"status\":\"OK\"}";
    public static final String INVENTORY_NOK_MSG = "{\"messageType\":\"inventory-status\", \"status\":\"NOK\"}";

    //sensor constants
    public static final String ACTUATOR_BLUE_LED = "Blue LED Actuator";
    public static final String LED_ON_ACTION = "{'status':1.0}";
    public static final String LED_OFF_ACTION = "{'status':0.0}";

    private IgniteNodeMCUConstants() {
    }
}
