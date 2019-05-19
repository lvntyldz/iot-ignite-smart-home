package com.okan.headlessgateway.listener;

import com.okan.headlessgateway.object.WifiNode;

public interface WifiNodeListener {
    void onWifiNodeAdded(WifiNode device);

    void onWifiNodeAddressChange(WifiNode device);
}
