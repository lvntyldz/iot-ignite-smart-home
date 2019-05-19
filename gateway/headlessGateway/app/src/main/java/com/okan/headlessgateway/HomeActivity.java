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
    public void onUnsupportedVersionExceptionReceived(com.ardic.android.iotignite.exceptions.UnsupportedVersionException e) {
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
            return;
        }

        updateTextViewWithUIThread(nodeIDText, getString(R.string.no_active_node));
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

                BaseWifiNodeDevice node = espNodeList.get((int) id);
                activeEsp = node;
                updateTextViewWithUIThread(nodeIDText, getString(R.string.active_node_label) + node.getNode().getNodeID());
            }
        };
    }

}
