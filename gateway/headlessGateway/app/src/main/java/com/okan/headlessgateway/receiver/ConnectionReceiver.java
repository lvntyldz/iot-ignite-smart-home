package com.okan.headlessgateway.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.okan.headlessgateway.service.WifiNodeService;


public class ConnectionReceiver extends BroadcastReceiver {

    private static final String TAG = ConnectionReceiver.class.getSimpleName();

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "Connection state is changed!!! Restarting Nsd Service...");

        if (WifiNodeService.getInstance() != null) {
            WifiNodeService.getInstance().restartManagement();
        }
    }
}
