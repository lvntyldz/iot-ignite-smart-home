package com.okan.headlessgateway;

import android.content.Intent;
import android.util.Log;

import com.ardic.android.iot.hwnodeapptemplate.base.BaseWifiNodeDevice;
import com.ardic.android.iot.hwnodeapptemplate.listener.CompatibilityListener;
import com.ardic.android.iot.hwnodeapptemplate.listener.WifiNodeManagerListener;
import com.ardic.android.iot.hwnodeapptemplate.service.WifiNodeService;
import com.ardic.android.iotignite.exceptions.UnsupportedVersionException;

class DiscoveryService implements WifiNodeManagerListener, CompatibilityListener {

    private FromView view;
    private static final String TAG = "HG-DiscoveryService-";

    public DiscoveryService(FromView view) {
        this.view = view;
        view.startServiceFromActivity(new Intent(view.getMainContext(), WifiNodeService.class));
        WifiNodeService.setCompatibilityListener(this);
        Log.i(TAG, "WifiNodeService Started...");
    }

    public void onHideActivityBtnClick() {
        view.showMessage(R.string.activity_hide_msg);
    }

    public void onStartNDSBtnClick() {
        view.showMessage(R.string.nds_started);

        view.getEspList();
    }

    @Override
    public void onUnsupportedVersionExceptionReceived(UnsupportedVersionException e) {
        Log.i(TAG, "onUnsupportedVersionExceptionReceived");
    }

    @Override
    public void onWifiNodeDeviceAdded(BaseWifiNodeDevice baseWifiNodeDevice) {
        Log.i(TAG, "onWifiNodeDeviceAdded");
    }

    @Override
    public void onIgniteConnectionChanged(boolean b) {
        Log.i(TAG, "onIgniteConnectionChanged");
    }
}
