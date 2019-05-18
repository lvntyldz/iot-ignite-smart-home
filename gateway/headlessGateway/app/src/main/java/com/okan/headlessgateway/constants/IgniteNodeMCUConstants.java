package com.okan.headlessgateway.constants;

public class IgniteNodeMCUConstants {
    public static final int PORT = 9999;
    public static final String SERVICE_TYPE = "_iotignite._tcp.local.";
    public static final String SERVICE_NAME = "IotIgnite-ESP-Gateway";
    public static final String INVENTORY_OK_MSG = "{\"messageType\":\"inventory-status\", \"status\":\"OK\"}";
    public static final String INVENTORY_NOK_MSG = "{\"messageType\":\"inventory-status\", \"status\":\"NOK\"}";

    private IgniteNodeMCUConstants() {
    }
}
