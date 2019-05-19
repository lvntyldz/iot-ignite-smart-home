package com.okan.headlessgateway.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.okan.headlessgateway.service.WifiNodeService;

public class StartReceiver extends BroadcastReceiver {
    private static final String TAG = StartReceiver.class.getSimpleName();

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "Boot completed.Starting service...");
        context.startService(new Intent(context, WifiNodeService.class));
    }
}
