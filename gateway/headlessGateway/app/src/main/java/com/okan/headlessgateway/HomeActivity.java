package com.okan.headlessgateway;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.ardic.android.iot.hwnodeapptemplate.base.BaseWifiNodeDevice;
import com.ardic.android.iot.hwnodeapptemplate.listener.CompatibilityListener;
import com.ardic.android.iot.hwnodeapptemplate.listener.ThingEventListener;
import com.ardic.android.iot.hwnodeapptemplate.listener.WifiNodeManagerListener;
import com.ardic.android.iot.hwnodeapptemplate.manager.GenericWifiNodeManager;
import com.ardic.android.iot.hwnodeapptemplate.node.GenericWifiNodeDevice;
import com.ardic.android.iotignite.exceptions.UnsupportedVersionException;
import com.ardic.android.iotignite.things.ThingConfiguration;
import com.ardic.android.iotignite.things.ThingData;
import com.okan.headlessgateway.constant.DynamicNodeConstants;
import com.okan.headlessgateway.service.WifiNodeService;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;


public class HomeActivity extends Activity implements View.OnClickListener, WifiNodeManagerListener, CompatibilityListener {

    private static final String TAG = "HG-HomeActivity";
    private List<BaseWifiNodeDevice> espNodeList = new CopyOnWriteArrayList<>();
    private BaseWifiNodeDevice activeEsp;
    private TextView nodeIDText;
    private Button ledOnBtnView;
    private Button ledOffBtnView;
    private Button removeActiveNodeView;
    private Button startNDSBtnView;
    private Button hideActivtyBtnView;
    private ListView espListView = null;

    private GenericWifiNodeManager espManager;


    private ThingEventListener espEventListener = new ThingEventListener() {

        private void handleReceivedData(final ThingData thingData, final String s1) {
            if (activeEsp != null) {
                Log.i(TAG, " Socket : " + activeEsp.getWifiNodeDevice().getNodeSocket());

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        String dataStr = thingData.getDataList().get(0);


                        float data = Float.valueOf(dataStr);
                        int data_int = (int) data;

                        if (DynamicNodeConstants.TEMPERATURE_SENSOR.equals(s1)) {
                            showMessageWithStringPostfix(R.string.temperature_data_detected, dataStr);
                            return;
                        }

                        if (DynamicNodeConstants.HUMIDITY_SENSOR.equals(s1)) {
                            showMessageWithStringPostfix(R.string.humidty_data_detected, dataStr);
                            return;
                        }

                        if (DynamicNodeConstants.MQ6_GAS_SENSOR.equals(s1)) {
                            showMessageWithStringPostfix(R.string.gas_data_detected, dataStr);
                            return;
                        }

                        if (DynamicNodeConstants.FLAME_SENSOR.equals(s1)) {
                            showMessageWithStringPostfix(R.string.flame_data_detected, dataStr);
                            return;
                        }

                        if (DynamicNodeConstants.RAIN_SENSOR.equals(s1)) {
                            showMessageWithStringPostfix(R.string.rain_data_detected, dataStr);
                            return;
                        }
                    }

                });
            }
        }

        @Override
        public void onDataReceived(final String s, final String s1, final ThingData thingData) {
            Log.i(TAG, "onDataReceived [" + s + "][" + s1 + "][" + thingData.getDataList() + "]");
            handleReceivedData(thingData, s1);
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
        public void onConfigReceived(String s, String s1, ThingConfiguration thingConfiguration) {
            Log.i(TAG, "onConfigReceived [" + s + "][" + s1 + "][" + thingConfiguration.getDataReadingFrequency() + "]");
        }

        @Override
        public void onUnknownMessageReceived(String s, String s1) {
            Log.i(TAG, "onUnknownMessageReceived [" + s + "][" + s1 + "]");

            if (activeEsp != null) {
                try {
                    JSONObject json = new JSONObject(s1);
                    if (json.has("ledState")) {
                        int ledState = json.getInt("ledState");
                    }
                } catch (JSONException e) {
                    Log.i(TAG, "JSONException on onUnknownMessageReceived() : " + e);

                }
            }
        }

        @Override
        public void onNodeUnregistered(String s) {
            Log.i(TAG, "onNodeUnregistered [" + s + "]");
            if (activeEsp != null) {
                activeEsp.removeThingEventListener(espEventListener);
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

        initUIComponents();
        initSensorDatas();
        initEspDeviceAndNodeManager();


        espListView.setOnItemClickListener(onNodeListClick());
    }

    @Override
    protected void onDestroy() {
        stopService(new Intent(this, WifiNodeService.class));
        super.onDestroy();
    }

    @Override
    public void onClick(View v) {

        if (v.equals(startNDSBtnView)) {
            startApplicationAsService();
            return;
        }

        if (v.equals(hideActivtyBtnView)) {
            runAsBackgroundService();
            return;
        }

        if (v.equals(ledOnBtnView)) {
            doLedOnAction();
            return;
        }

        if (v.equals(ledOffBtnView)) {
            doLedOffAction();
            return;
        }

        if (v.equals(removeActiveNodeView)) {
            removeActiveNode();
            showMessage(R.string.active_node_deleted);
            return;
        }
    }

    @Override
    public void onWifiNodeDeviceAdded(BaseWifiNodeDevice baseWifiNodeDevice) {
        Log.i(TAG, ">>>>>>>>>> DEVICE ADDED <<<<<<<<<<");
        checkAndUpdateDeviceList(baseWifiNodeDevice);
    }

    @Override
    public void onUnsupportedVersionExceptionReceived(UnsupportedVersionException e) {
        Log.i(TAG, "Ignite onUnsupportedVersionExceptionReceived :  " + e);
    }

    @Override
    public void onIgniteConnectionChanged(boolean b) {
        Log.i(TAG, "Ignite Connection State Changed To -> " + b);
    }

    private void runAsBackgroundService() {

        if (espNodeList.size() < 1) {
            showMessage(R.string.no_active_node);
            return;
        }
        playRingTone();
        PackageManager pm = getPackageManager();
        pm.setComponentEnabledSetting(new ComponentName(this, com.okan.headlessgateway.HomeActivity.class),
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
    }

    private void playRingTone() {
        MediaPlayer player = MediaPlayer.create(this, Settings.System.DEFAULT_NOTIFICATION_URI);
        player.setLooping(true);
        player.start();
    }

    private void initUIComponents() {

        //lists
        espListView = (ListView) findViewById(R.id.espList);

        //buttons
        ledOnBtnView = findViewById(R.id.ledOnBtn);
        ledOffBtnView = findViewById(R.id.ledOffBtn);
        removeActiveNodeView = findViewById(R.id.removeActiveNode);
        startNDSBtnView = findViewById(R.id.startNDSBtn);
        hideActivtyBtnView = findViewById(R.id.hideActivtyBtn);

        //texts
        nodeIDText = (TextView) findViewById(R.id.nodeIDTextView);

        //listenter
        ledOnBtnView.setOnClickListener(this);
        ledOffBtnView.setOnClickListener(this);
        removeActiveNodeView.setOnClickListener(this);
        startNDSBtnView.setOnClickListener(this);
        hideActivtyBtnView.setOnClickListener(this);
    }

    private void removeActiveNode() {
        if (espNodeList.size() < 1) {
            showMessage(R.string.no_active_node);
            return;
        }
        espNodeList.remove(0);
        activeEsp = null;
        updateSelectedNode();
        updateNodeList();
    }

    private void initSensorDatas() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                nodeIDText.setText(R.string.no_available_node);
            }
        });
    }

    private void initEspDeviceAndNodeManager() {
        espManager = GenericWifiNodeManager.getInstance(getApplicationContext());
        espManager.addWifiNodeManagerListener(this);

        for (GenericWifiNodeDevice dvc : espManager.getWifiNodeDeviceList()) {
            checkAndUpdateDeviceList(dvc);
        }

    }

    private void checkAndUpdateDeviceList(BaseWifiNodeDevice device) {
        //already exist remove for update
        if (espNodeList.contains(device)) {

            if (espNodeList.indexOf(device) != -1) {
                espNodeList.remove(espNodeList.indexOf(device));
            }
        }

        espNodeList.add(device);

        updateSelectedNode();
        updateNodeList();
    }

    private void updateNodeList() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {

                String[] nodeIds = new String[espNodeList.size()];
                int i = 0;

                for (BaseWifiNodeDevice nodes : espNodeList) {
                    nodeIds[i] = nodes.getNode().getNodeID();
                    i++;
                }

                ArrayAdapter<String> adapter = new ArrayAdapter<String>(HomeActivity.this, android.R.layout.simple_list_item_1, nodeIds);
                espListView.setAdapter(adapter);

            }
        });
    }

    private void showMessageWithStringPostfix(int msgId, String s) {
        Toast.makeText(HomeActivity.this, getString(msgId) + " : " + s, Toast.LENGTH_SHORT).show();
    }

    private void showMessage(int msgId) {
        Toast.makeText(HomeActivity.this, getString(msgId), Toast.LENGTH_SHORT).show();
    }

    private void doLedOnAction() {

        if (activeEsp == null) {
            showMessage(R.string.no_active_node);
            return;
        }

        new Thread(new Runnable() {
            @Override
            public void run() {
                activeEsp.sendActionMessage(DynamicNodeConstants.ACTUATOR_BLUE_LED, DynamicNodeConstants.LED_ON_ACTION);
            }
        }).start();
    }

    private void doLedOffAction() {

        if (activeEsp == null) {
            showMessage(R.string.no_active_node);
            return;
        }

        new Thread(new Runnable() {
            @Override
            public void run() {
                activeEsp.sendActionMessage(DynamicNodeConstants.ACTUATOR_BLUE_LED, DynamicNodeConstants.LED_OFF_ACTION);
            }
        }).start();
    }

    private void updateSelectedNode() {

        if (espNodeList.size() > 0) {
            updateTextViewWithUIThread(nodeIDText, getString(R.string.active_node_label) + espNodeList.get(0).getNode().getNodeID());
            activeEsp = espNodeList.get(0);
            activeEsp.addThingEventListener(espEventListener);
            return;
        }

        updateTextViewWithUIThread(nodeIDText, getString(R.string.no_active_node));
        activeEsp.removeThingEventListener(espEventListener);
        activeEsp = null;

    }

    private void updateTextViewWithUIThread(final TextView text, final String val) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                text.setText(val);
            }
        });
    }

    private void startApplicationAsService() {
        startService(new Intent(this, WifiNodeService.class));
        WifiNodeService.setCompatibilityListener(this);
        Log.i(TAG, "WifiNodeService started...");
        showMessage(R.string.wifi_discovery_started);
    }

    private AdapterView.OnItemClickListener onNodeListClick() {
        return new AdapterView.OnItemClickListener() {

            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                activeEsp.removeThingEventListener(espEventListener);

                BaseWifiNodeDevice node = espNodeList.get((int) id);
                activeEsp = node;
                activeEsp.addThingEventListener(espEventListener);

                updateTextViewWithUIThread(nodeIDText, getString(R.string.active_node_label) + node.getNode().getNodeID());
            }
        };
    }

}
