package com.okan.headlessgateway.node;

import android.content.Context;
import android.text.TextUtils;

import com.okan.headlessgateway.base.BaseWifiNodeDevice;
import com.okan.headlessgateway.object.WifiNode;
import com.ardic.android.iotignite.nodes.IotIgniteManager;

public class GenericWifiNodeDevice extends BaseWifiNodeDevice {

    private boolean isRunning = false;

    public GenericWifiNodeDevice(IotIgniteManager igniteContext, Context mContext, WifiNode device) {
        super(igniteContext,
                mContext,
                !TextUtils.isEmpty(device.getNodeType()) ? device.getNodeType() + " - " + device.getHolder().getNodeId() : device.getHolder().getNodeId(),
                device);
    }

    @Override
    public synchronized void start() {
        if (!isRunning) {
            isRunning = true;
            super.start();
        }
    }

    @Override
    public synchronized void stop() {
        if (isRunning) {
            isRunning = false;
            super.stop();
        }
    }
}
