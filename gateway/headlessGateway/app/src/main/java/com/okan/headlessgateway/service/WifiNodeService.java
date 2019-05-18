package com.okan.headlessgateway.service;


import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;

import com.ardic.android.iotignite.callbacks.ConnectionCallback;
import com.ardic.android.iotignite.exceptions.UnsupportedVersionException;
import com.ardic.android.iotignite.nodes.IotIgniteManager;
import com.ardic.android.utilitylib.interfaces.TimeoutListener;
import com.ardic.android.utilitylib.timer.TimeoutTimer;
import com.okan.headlessgateway.listener.CompatibilityListener;
import com.okan.headlessgateway.network.WifiNodeManager;

public class WifiNodeService extends Service implements ConnectionCallback, TimeoutListener {

    private static final String TAG = WifiNodeService.class.getSimpleName();
    private static final long RESTART_INTERVAL = 10000L;
    private static CompatibilityListener compatibilityListener;
    private IotIgniteManager.Builder igniteBuilder;
    private IotIgniteManager igniteManager;
    private TimeoutTimer igniteTimer;
    private WifiNodeManager wifiNodeManager;

    public static void setCompatibilityListener(CompatibilityListener listener) {
        compatibilityListener = listener;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        igniteTimer = new TimeoutTimer(this);

        igniteBuilder = new IotIgniteManager.Builder()
                .setContext(getApplicationContext())
                .setConnectionListener(this)
                .setLogEnabled(true);

        rebuildIgnite();
    }

    @Override
    public void onConnected() {
        Log.d(TAG, "Ignite connected");
        igniteTimer.cancelTimer();
        wifiNodeManager = WifiNodeManager.getInstance(getApplicationContext(), igniteManager);
        startManagement();
        wifiNodeManager.sendIgniteConnectionChanged(true);
    }

    @Override
    public void onDisconnected() {
        Log.d(TAG, "Ignite disconnected");
        stopManagement();
        igniteTimer.startTimer(RESTART_INTERVAL);
        if (wifiNodeManager != null) {
            wifiNodeManager.sendIgniteConnectionChanged(false);
        }
    }

    @Override
    public void onTimerTimeout() {
        Log.i(TAG, "onTimerTimeout");
        rebuildIgnite();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_STICKY;

    }

    public void startManagement() {
        if (wifiNodeManager != null) {
            wifiNodeManager.startManagement();
        }
    }

    public void stopManagement() {
        if (wifiNodeManager != null) {
            wifiNodeManager.stopManagement();
        }
    }

    public void restartManagement() {
        if (wifiNodeManager != null) {
            wifiNodeManager.restartManagement();
        }
    }

    private void rebuildIgnite() {

        igniteTimer.startTimer(RESTART_INTERVAL);

        try {
            igniteManager = igniteBuilder.build();
        } catch (UnsupportedVersionException e) {
            Log.i(TAG, "Unsupported version exception : " + e);
            if (compatibilityListener != null) {
                compatibilityListener.onUnsupportedVersionExceptionReceived(e);
            }
        }
    }

    @Override
    public void onDestroy() {
        wifiNodeManager.stopManagement();
        super.onDestroy();
    }

}