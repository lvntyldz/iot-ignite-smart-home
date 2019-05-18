package com.okan.headlessgateway.network;

import com.ardic.android.connectivitylib.listener.NsdServiceListener;
import com.ardic.android.connectivitylib.network.NSDServer;
import com.okan.headlessgateway.constants.IgniteNodeMCUConstants;

import java.util.HashMap;

public class NodeNsdServer extends NSDServer {

    private static NodeNsdServer instance;
    private String gatewayId;

    private NodeNsdServer(String name, String type, String gatewayID, NsdServiceListener listener, HashMap<String, byte[]> properties) {
        super(name, type, listener, gatewayID, properties);
        this.gatewayId = gatewayID;
    }

    public static NodeNsdServer getInstance(String gatewayID, NsdServiceListener listener) {
        if (instance == null) {
            HashMap<String, byte[]> properties = new HashMap<>();
            properties.put("deviceID", gatewayID.getBytes());
            String editedHostname = gatewayID.replace(":", "").replace("@", "");
            instance = new NodeNsdServer(IgniteNodeMCUConstants.SERVICE_NAME, IgniteNodeMCUConstants.SERVICE_TYPE, editedHostname, listener, properties);
        }

        return instance;
    }

    public boolean start() {
        if (!isRunning()) {
            return super.start();
        }
        return true;
    }

    public void stop() {
        if (isRunning()) {
            close();
        }
    }
}