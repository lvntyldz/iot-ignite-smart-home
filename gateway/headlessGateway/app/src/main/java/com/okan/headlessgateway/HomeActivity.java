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
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.okan.headlessgateway.base.BaseWifiNodeDevice;
import com.okan.headlessgateway.constant.DynamicNodeConstants;
import com.okan.headlessgateway.listener.CompatibilityListener;
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
    private Button startNDSBtnView;
    private Button hideActivtyBtnView;
    private ListView espListView = null;

    private GenericWifiNodeManager espManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        initUIComponents();
        initSensorDatas();
        initEspDeviceAndNodeManager();
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

    private void runAsBackgroundService() {

        if (espNodeListLvt.size() < 1) {
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
        ledOnBtnViewLvt = findViewById(R.id.ledOnBtn);
        ledOffBtnViewLvt = findViewById(R.id.ledOffBtn);
        removeActiveNodeViewLvt = findViewById(R.id.removeActiveNode);
        startNDSBtnView = findViewById(R.id.startNDSBtn);
        hideActivtyBtnView = findViewById(R.id.hideActivtyBtn);

        //texts
        nodeIDTextLvt = (TextView) findViewById(R.id.nodeIDTextView);

        //listenter
        ledOnBtnViewLvt.setOnClickListener(this);
        ledOffBtnViewLvt.setOnClickListener(this);
        removeActiveNodeViewLvt.setOnClickListener(this);
        startNDSBtnView.setOnClickListener(this);
        hideActivtyBtnView.setOnClickListener(this);
    }

    private void removeActiveNode() {
        if (espNodeListLvt.size() < 1) {
            showMessage(R.string.no_active_node);
            return;
        }
        espNodeListLvt.remove(0);
        activeEspLvt = null;
        updateSelectedNode();
        updateNodeList();
    }

    private void initSensorDatas() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                nodeIDTextLvt.setText(R.string.no_available_node);
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
        if (espNodeListLvt.contains(device)) {

            if (espNodeListLvt.indexOf(device) != -1) {
                espNodeListLvt.remove(espNodeListLvt.indexOf(device));
            }
        }

        espNodeListLvt.add(device);

        updateSelectedNode();
        updateNodeList();
    }

    private void updateNodeList() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {

                String[] nodeIds = new String[espNodeListLvt.size()];
                int i = 0;

                for (BaseWifiNodeDevice nodes : espNodeListLvt) {
                    nodeIds[i] = nodes.getNode().getNodeID();
                    i++;
                }

                ArrayAdapter<String> adapter = new ArrayAdapter<String>(HomeActivity.this, android.R.layout.simple_list_item_1, nodeIds);
                espListView.setAdapter(adapter);

            }
        });
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
            updateTextViewWithUIThread(nodeIDTextLvt, getString(R.string.active_node_label) + espNodeListLvt.get(0).getNode().getNodeID());
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

    private void startApplicationAsService() {
        startService(new Intent(this, WifiNodeService.class));
        WifiNodeService.setCompatibilityListener(this);
        Log.i(TAG, "WifiNodeService started...");
        showMessage(R.string.wifi_discovery_started);
    }

}
