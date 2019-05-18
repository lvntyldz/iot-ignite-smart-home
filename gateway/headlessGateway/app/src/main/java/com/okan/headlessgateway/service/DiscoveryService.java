package com.okan.headlessgateway.service;

import android.content.Intent;
import android.util.Log;

import com.ardic.android.iot.hwnodeapptemplate.base.BaseWifiNodeDevice;
import com.ardic.android.iot.hwnodeapptemplate.listener.WifiNodeManagerListener;
import com.ardic.android.iotignite.exceptions.UnsupportedVersionException;
import com.okan.headlessgateway.FromView;
import com.okan.headlessgateway.R;
import com.okan.headlessgateway.listener.CompatibilityListener;

public class DiscoveryService implements WifiNodeManagerListener, CompatibilityListener {

    private static final String TAG = "HG-DiscoveryService-";
    private FromView view;

    public DiscoveryService(FromView view) {
        this.view = view;
    }

    public void onHideActivityBtnClick() {
        view.showMessage(R.string.activity_hide_msg);
    }

    public void onStartNDSBtnClick() {
        view.startServiceFromActivity(new Intent(view.getMainContext(), WifiNodeService.class));
        WifiNodeService.setCompatibilityListener(this);
        view.showMessage(R.string.nds_started);
        view.getEspList();
    }

    @Override
    public void onUnsupportedVersionExceptionReceived(UnsupportedVersionException e) {
        Log.i(TAG, "exception : ", e);
        view.showMessage(R.string.onUnsupportedVersionExceptionReceived_msg);
    }

    @Override
    public void onWifiNodeDeviceAdded(BaseWifiNodeDevice baseWifiNodeDevice) {
        Log.i(TAG, "Node Device Added On WiFi... nodeDevice : " + baseWifiNodeDevice);
        view.showMessage(R.string.onWifiNodeDeviceAdded_msg);
    }

    @Override
    public void onIgniteConnectionChanged(boolean b) {
        Log.i(TAG, "ignite connection changed... val : " + b);
        view.showMessage(R.string.onIgniteConnectionChanged_msg);
    }
}