package com.okan.headlessgateway;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.okan.headlessgateway.base.BaseWifiNodeDevice;
import com.okan.headlessgateway.constant.DynamicNodeConstants;
import com.okan.headlessgateway.listener.CompatibilityListener;
import com.okan.headlessgateway.listener.ThingEventListener;
import com.okan.headlessgateway.listener.WifiNodeManagerListener;
import com.okan.headlessgateway.manager.GenericWifiNodeManager;
import com.okan.headlessgateway.node.GenericWifiNodeDevice;
import com.okan.headlessgateway.service.WifiNodeService;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;


public class HomeActivity extends Activity implements View.OnClickListener, WifiNodeManagerListener, CompatibilityListener {


    private static final String TAG = "HG-HomeActivity";
    private List<BaseWifiNodeDevice> espNodeListLvt = new CopyOnWriteArrayList<>();
    private BaseWifiNodeDevice activeEspLvt;
    private TextView nodeIDTextLvt;
    private Button ledOnBtnViewLvt;
    private Button ledOffBtnViewLvt;
    private Button removeActiveNodeViewLvt;


    private static final String DEGREE = "\u00b0" + "C";
    private TextView tempText, humText;

    private GenericWifiNodeManager espManager;
    private List<BaseWifiNodeDevice> espNodeList = new CopyOnWriteArrayList<>();
    private BaseWifiNodeDevice activeEsp;
    private ThingEventListener espEventListener = new ThingEventListener() {

        @Override
        public void onDataReceived(final String s, final String s1, final com.ardic.android.iotignite.things.ThingData thingData) {

            Log.i(TAG, "onDataReceived [" + s + "][" + s1 + "][" + thingData.getDataList() + "]");

            if (activeEsp != null) {
                Log.i(TAG, " Socket : " + activeEsp.getWifiNodeDevice().getNodeSocket());

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //setUINodeId(activeEsp.getWifiNodeDevice().getHolder().getNodeId());
                        float data = Float.valueOf(thingData.getDataList().get(0));
                        int data_int = (int) data;
                        if (DynamicNodeConstants.TEMPERATURE_SENSOR.equals(s1)) {
                            tempText.setText(data_int + DEGREE);

                        } else if (DynamicNodeConstants.HUMIDITY_SENSOR.equals(s1)) {
                            humText.setText(data_int + "%");
                        }

                    }

                });
            }

        }

        @Override
        public void onConnectionStateChanged(final String s, final boolean b) {
            Log.i(TAG, "onConnectionStateChanged [" + s + "][" + b + "]");
        }

        @Override
        public void onActionReceived(String s, String s1, String s2) {
            Log.i(TAG, "onActionReceived [" + s + "][" + s1 + "][" + s2 + "]");
        }

        @Override
        public void onConfigReceived(String s, String s1, com.ardic.android.iotignite.things.ThingConfiguration thingConfiguration) {
            Log.i(TAG, "onConfigReceived [" + s + "][" + s1 + "][" + thingConfiguration.getDataReadingFrequency() + "]");
        }

        @Override
        public void onUnknownMessageReceived(String s, String s1) {
            Log.i(TAG, "onUnknownMessageReceived [" + s + "][" + s1 + "]");
        }

        @Override
        public void onNodeUnregistered(String s) {
            Log.i(TAG, "onNodeUnregistered [" + s + "]");
            if (activeEsp != null) {
                // sendResetMessage();
                activeEsp.removeThingEventListener(espEventListener);

                for (BaseWifiNodeDevice dvc : espNodeList) {
                    if (dvc.getNode().getNodeID() != null && s.equals(dvc.getNode().getNodeID())) {
                        Log.i(TAG, "Removing [" + s + "]");

                        if (espNodeList.indexOf(dvc) != -1) {
                            espNodeList.remove(espNodeList.indexOf(dvc));
                            // remove from list. Update UI.
                            if (s.equals(activeEsp.getNode().getNodeID())) {
                                Log.i(TAG, "Updating... [" + s + "]");

                                //updateActiveEsp();
                            }

                            break;
                        } else {
                            Log.i(TAG, "Fail to remove : [" + s + "]");
                        }
                    }
                }
            }
        }

        @Override
        public void onThingUnregistered(String s, String s1) {
            Log.i(TAG, "onThingUnregistered [" + s + "][" + s1 + "]");
        }
    };


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        startService(new Intent(this, WifiNodeService.class));
        WifiNodeService.setCompatibilityListener(this);
        Log.i(TAG, "Dynamic Node Application started...");
        initUIComponents();
        initSensorDatas();
        initEspDeviceAndNodeManager();

    }

    @Override
    protected void onDestroy() {
        stopService(new Intent(this, WifiNodeService.class));
        super.onDestroy();
    }

    private void initUIComponents() {

        //buttons
        ledOnBtnViewLvt = findViewById(R.id.ledOnBtn);
        ledOffBtnViewLvt = findViewById(R.id.ledOffBtn);
        removeActiveNodeViewLvt = findViewById(R.id.removeActiveNode);

        //texts
        nodeIDTextLvt = (TextView) findViewById(R.id.nodeIDTextView);

        tempText = (TextView) findViewById(R.id.temperatureTextView);
        humText = (TextView) findViewById(R.id.humidityTextView);

        //listenter
        ledOnBtnViewLvt.setOnClickListener(this);
        ledOffBtnViewLvt.setOnClickListener(this);
        removeActiveNodeViewLvt.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {

        if (v.equals(ledOnBtnViewLvt)) {
            doLedOnAction();
            return;
        }

        if (v.equals(ledOffBtnViewLvt)) {
            doLedOffAction();
            return;
        }

        if (v.equals(removeActiveNodeViewLvt)) {
            removeActiveNode();
            showMessage(R.string.active_node_deleted);
            return;
        }
    }

    private void removeActiveNode() {
        if (espNodeListLvt.size() < 1) {
            showMessage(R.string.no_active_node);
            return;
        }
        espNodeListLvt.remove(0);
        activeEspLvt = null;
        updateSelectedNode();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {

        menu.clear();
        getMenuInflater().inflate(R.menu.main_menu, menu);

        for (GenericWifiNodeDevice dvc : espManager.getWifiNodeDeviceList()) {
            checkAndUpdateDeviceList(dvc);
        }

        if (!espNodeList.isEmpty()) {
            Log.i(TAG, "EspNode List Size : " + espNodeList.size());
            for (BaseWifiNodeDevice esp : espNodeList) {
                Log.i(TAG, "Esp : " + esp.getWifiNodeDevice().getHolder().getNodeId());
                if (esp.getWifiNodeDevice().getHolder().getNodeId() != null && !TextUtils.isEmpty(esp.getWifiNodeDevice().getHolder().getNodeId())) {
                    menu.add(Menu.NONE, Menu.NONE, Menu.NONE, esp.getWifiNodeDevice().getHolder().getNodeId());
                }
            }
        } else {
            Log.i(TAG, "EspNode List EMPTY");

        }
        return super.onPrepareOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        for (BaseWifiNodeDevice e : espNodeList) {
            if (!TextUtils.isEmpty(item.getTitle()) && e.getNode() != null && !TextUtils.isEmpty(e.getNode().getNodeID()) && item.getTitle().equals(e.getNode().getNodeID())) {
                activeEsp.removeThingEventListener(espEventListener);
                activeEsp = e;
                //updateActiveEsp();
                break;
            }
        }
        return super.onOptionsItemSelected(item);
    }


    private void initSensorDatas() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                tempText.setText(DEGREE);
                humText.setText("%");
                nodeIDTextLvt.setText(R.string.no_available_node);
            }
        });
    }

    @Override
    public void onWifiNodeDeviceAdded(BaseWifiNodeDevice baseWifiNodeDevice) {
        Log.i(TAG, ">>>>>>>>>> DEVICE ADDED <<<<<<<<<<");
        checkAndUpdateDeviceList(baseWifiNodeDevice);
    }

    @Override
    public void onUnsupportedVersionExceptionReceived(com.ardic.android.iotignite.exceptions.UnsupportedVersionException e) {
        Log.i(TAG, "Ignite onUnsupportedVersionExceptionReceived :  " + e);
    }

    @Override
    public void onIgniteConnectionChanged(boolean b) {
        Log.i(TAG, "Ignite Connection State Changed To -> " + b);
    }


    private void initEspDeviceAndNodeManager() {
        espManager = GenericWifiNodeManager.getInstance(getApplicationContext());
        espManager.addWifiNodeManagerListener(this);

        for (GenericWifiNodeDevice dvc : espManager.getWifiNodeDeviceList()) {
            checkAndUpdateDeviceList(dvc);
        }

    }

    private void checkAndUpdateDeviceList(BaseWifiNodeDevice device) {
        /*
        if (DynamicNodeConstants.TYPE.equals(device.getWifiNodeDevice().getNodeType())) {

            if (!espNodeList.contains(device)) {
                Log.i(TAG, "New node found adding to list.");
                espNodeList.add(device);
            } else {
                Log.i(TAG, "New node already in list.Updating...");
                if (espNodeList.indexOf(device) != -1) {
                    Log.i(TAG, "New node already in list.Removing...");
                    espNodeList.remove(espNodeList.indexOf(device));
                }
                espNodeList.add(device);
            }
        }
        */

        //already exist remove for update
        if (espNodeListLvt.contains(device)) {

            if (espNodeListLvt.indexOf(device) != -1) {
                espNodeListLvt.remove(espNodeListLvt.indexOf(device));
            }
        }

        espNodeListLvt.add(device);

        updateSelectedNode();
        //updateActiveEsp();
    }

    private void showMessage(int msgId) {
        Toast.makeText(HomeActivity.this, getString(msgId), Toast.LENGTH_SHORT).show();
    }

    private void doLedOnAction() {

        if (activeEspLvt == null) {
            showMessage(R.string.no_active_node);
            return;
        }

        new Thread(new Runnable() {
            @Override
            public void run() {
                activeEspLvt.sendActionMessage(DynamicNodeConstants.ACTUATOR_BLUE_LED, DynamicNodeConstants.LED_ON_ACTION);
            }
        }).start();
    }

    private void doLedOffAction() {

        if (activeEspLvt == null) {
            showMessage(R.string.no_active_node);
            return;
        }

        new Thread(new Runnable() {
            @Override
            public void run() {
                activeEspLvt.sendActionMessage(DynamicNodeConstants.ACTUATOR_BLUE_LED, DynamicNodeConstants.LED_OFF_ACTION);
            }
        }).start();
    }

    private void updateSelectedNode() {

        if (espNodeListLvt.size() > 0) {
            updateTextViewWithUIThread(nodeIDTextLvt, espNodeListLvt.get(0).getNode().getNodeID());
            activeEspLvt = espNodeListLvt.get(0);
            return;
        }

        updateTextViewWithUIThread(nodeIDTextLvt, getString(R.string.no_active_node));
        activeEspLvt = null;

    }

    private void updateTextViewWithUIThread(final TextView text, final String val) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                text.setText(val);
            }
        });
    }


}
