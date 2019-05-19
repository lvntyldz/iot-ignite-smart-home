package com.okan.headlessgateway.listener;

import com.okan.headlessgateway.base.BaseWifiNodeDevice;

public interface WifiNodeManagerListener {
    void onWifiNodeDeviceAdded(BaseWifiNodeDevice device);

    void onIgniteConnectionChanged(boolean isConnected);
}
