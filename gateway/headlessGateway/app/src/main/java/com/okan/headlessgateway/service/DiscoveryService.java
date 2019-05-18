package com.okan.headlessgateway.service;

import android.content.Intent;
import android.util.Log;

import com.ardic.android.iot.hwnodeapptemplate.base.BaseWifiNodeDevice;
import com.ardic.android.iot.hwnodeapptemplate.listener.WifiNodeManagerListener;
import com.ardic.android.iotignite.exceptions.UnsupportedVersionException;
import com.okan.headlessgateway.FromView;
import com.okan.headlessgateway.R;
import com.okan.headlessgateway.constants.IgniteNodeMCUConstants;
import com.okan.headlessgateway.listener.CompatibilityListener;

import java.util.List;

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
    }

    public void ledOnBtnClick() {

        List<BaseWifiNodeDevice> nodeList = view.getNodeList();

        BaseWifiNodeDevice node = null;
        if (nodeList == null || nodeList.isEmpty()) {
            Log.i(TAG, "There is No Node!");
            view.showMessage(R.string.no_active_node);
            return;
        }

        node = nodeList.get(0);

        if (node.sendActionMessage(IgniteNodeMCUConstants.ACTUATOR_BLUE_LED, IgniteNodeMCUConstants.LED_ON_ACTION)) {
            view.showMessage(R.string.led_started);
        }

    }

    public void ledOffBtnClick() {

        List<BaseWifiNodeDevice> nodeList = view.getNodeList();

        BaseWifiNodeDevice node = null;
        if (nodeList == null || nodeList.isEmpty()) {
            Log.i(TAG, "There is No Node!");
            view.showMessage(R.string.no_active_node);
            return;
        }

        node = nodeList.get(0);

        if (node.sendActionMessage(IgniteNodeMCUConstants.ACTUATOR_BLUE_LED, IgniteNodeMCUConstants.LED_OFF_ACTION)) {
            view.showMessage(R.string.led_started);
        }

        view.showMessage(R.string.led_sopped);
    }

    @Override
    public void onUnsupportedVersionExceptionReceived(UnsupportedVersionException e) {
        Log.i(TAG, "exception : ", e);
        view.showMessage(R.string.onUnsupportedVersionExceptionReceived_msg);
    }

    @Override
    public void onWifiNodeDeviceAdded(BaseWifiNodeDevice baseWifiNodeDevice) {
        Log.i(TAG, "Node Device Added On WiFi... nodeDevice : " + baseWifiNodeDevice);
        view.addNodeToList(baseWifiNodeDevice);
        view.showMessage(R.string.onWifiNodeDeviceAdded_msg);
    }

    @Override
    public void onIgniteConnectionChanged(boolean b) {
        Log.i(TAG, "ignite connection changed... val : " + b);
        view.showMessage(R.string.onIgniteConnectionChanged_msg);
    }
}
