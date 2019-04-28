package com.ardic.android.iot.hwnodeapptemplate.service;

import android.util.Log;

import com.ardic.android.connectivitylib.listener.NsdServiceListener;
import com.ardic.android.iot.hwnodeapptemplate.nsdserver.NodeNsdServer;

public class NSDHelperService {

    public static final String TAG = NSDHelperService.class.getSimpleName();
    // NSD Variables
    private NodeNsdServer mJmDnsServer;

    public NSDHelperService(String deviceID, NsdServiceListener listener) {
        this.mJmDnsServer = NodeNsdServer.getInstance(deviceID, listener);
    }

    public void startNSDService() {
        Log.d(TAG, "Starting NSD Service...");
        mJmDnsServer.start();
    }

    public void stopNSDService() {
        Log.d(TAG, "Stopping NSD Service...");
        mJmDnsServer.stop();
    }

    public void restartNSDService() {
        Log.d(TAG, "Restarting NSD Service...");
        if (mJmDnsServer != null) {
            mJmDnsServer.stop();
            mJmDnsServer.start();
        }
    }


}
