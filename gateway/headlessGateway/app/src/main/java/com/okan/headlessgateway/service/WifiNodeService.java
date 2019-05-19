package com.okan.headlessgateway.service;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;

import com.okan.headlessgateway.listener.CompatibilityListener;
import com.okan.headlessgateway.manager.WifiNodeManager;
import com.ardic.android.iotignite.callbacks.ConnectionCallback;
import com.ardic.android.iotignite.exceptions.UnsupportedVersionException;
import com.ardic.android.iotignite.nodes.IotIgniteManager;
import com.ardic.android.utilitylib.interfaces.TimeoutListener;
import com.ardic.android.utilitylib.timer.TimeoutTimer;


public class WifiNodeService extends Service implements ConnectionCallback, TimeoutListener {

    private static final String TAG = WifiNodeService.class.getSimpleName();
    private static final long IGNITE_RESTART_INTERVAL = 10000L;
    private static WifiNodeService serviceInstance;
    private static CompatibilityListener compatibilityListener;
    private IotIgniteManager.Builder igniteBuilder;
    private IotIgniteManager iotContext;
    private TimeoutTimer igniteTimer;
    private WifiNodeManager wifiNodeManager;
    private boolean isIgniteConnected;

    public static WifiNodeService getInstance() {
        return serviceInstance;
    }

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
        serviceInstance = this;
        igniteTimer = new TimeoutTimer(this);
        igniteBuilder = new IotIgniteManager.Builder().setContext(getApplicationContext())
                .setConnectionListener(this).setLogEnabled(true);
        rebuildIgnite();

    }

    @Override
    public void onConnected() {
        Log.d(TAG, "Ignite connected");
        isIgniteConnected = true;
        igniteTimer.cancelTimer();
        wifiNodeManager = WifiNodeManager.getInstance(getApplicationContext(), iotContext);
        startManagement();
        wifiNodeManager.sendIgniteConnectionChanged(true);
    }

    @Override
    public void onDisconnected() {
        Log.d(TAG, "Ignite disconnected");
        isIgniteConnected = false;
        stopManagement();
        igniteTimer.startTimer(IGNITE_RESTART_INTERVAL);
        if (wifiNodeManager != null) {
            wifiNodeManager.sendIgniteConnectionChanged(false);
        }
    }

    @Override
    public void onTimerTimeout() {
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
        igniteTimer.startTimer(IGNITE_RESTART_INTERVAL);
        try {
            iotContext = igniteBuilder.build();
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
        serviceInstance = null;
    }

    public boolean isIgniteConnected() {
        return isIgniteConnected;
    }
}