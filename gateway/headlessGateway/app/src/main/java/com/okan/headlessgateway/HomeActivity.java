package com.okan.headlessgateway;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;
import com.ardic.android.iotignite.exceptions.UnsupportedVersionExceptionType;
import com.okan.headlessgateway.base.BaseWifiNodeDevice;
import com.okan.headlessgateway.constant.DynamicNodeConstants;
import com.okan.headlessgateway.listener.CompatibilityListener;
import com.okan.headlessgateway.listener.ThingEventListener;
import com.okan.headlessgateway.listener.WifiNodeManagerListener;
import com.okan.headlessgateway.manager.GenericWifiNodeManager;
import com.okan.headlessgateway.node.GenericWifiNodeDevice;
import com.okan.headlessgateway.service.WifiNodeService;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;


public class HomeActivity extends Activity implements View.OnClickListener, WifiNodeManagerListener, CompatibilityListener {


    private List<BaseWifiNodeDevice> espNodeListLvt = new CopyOnWriteArrayList<>();
    private BaseWifiNodeDevice activeEspLvt;
    private TextView nodeIDTextLvt;
    private Button ledOnBtnViewLvt;
    private Button ledOffBtnViewLvt;
    private Button removeActiveNodeViewLvt;


    private static final String TAG = "Dynamic Node App";
    private static final String LED_TEXT_OFF = "OFF";
    private static final String LED_TEXT_ON = "ON";
    private static final String DEGREE = "\u00b0" + "C";
    private static boolean versionError = false;
    private boolean isActiveEspConnected = false;
    private TextView tempText, humText, ledText, nodeIDText;
    private ImageView ledImageView, socketStateImageView, deleteNodeImageView;

    private GenericWifiNodeManager espManager;
    private List<BaseWifiNodeDevice> espNodeList = new CopyOnWriteArrayList<>();
    private BaseWifiNodeDevice activeEsp;
    private ThingEventListener espEventListener = new ThingEventListener() {

        @Override
        public void onDataReceived(final String s, final String s1, final com.ardic.android.iotignite.things.ThingData thingData) {

            Log.i(TAG, "onDataReceived [" + s + "][" + s1 + "][" + thingData.getDataList() + "]");

            if (activeEsp != null) {
                Log.i(TAG, " Socket : " + activeEsp.getWifiNodeDevice().getNodeSocket());

                setConnectionState(true);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        setUINodeId(activeEsp.getWifiNodeDevice().getHolder().getNodeId());
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
            if (activeEsp != null) {
                setConnectionState(b);
            }
        }

        @Override
        public void onActionReceived(String s, String s1, String s2) {
            Log.i(TAG, "onActionReceived [" + s + "][" + s1 + "][" + s2 + "]");
            if (activeEsp != null) {
                setConnectionState(true);
            }
        }

        @Override
        public void onConfigReceived(String s, String s1, com.ardic.android.iotignite.things.ThingConfiguration thingConfiguration) {
            Log.i(TAG, "onConfigReceived [" + s + "][" + s1 + "][" + thingConfiguration.getDataReadingFrequency() + "]");

            if (activeEsp != null) {
                setConnectionState(true);
            }
        }

        @Override
        public void onUnknownMessageReceived(String s, String s1) {
            Log.i(TAG, "onUnknownMessageReceived [" + s + "][" + s1 + "]");

            if (activeEsp != null) {
                setConnectionState(true);
                // receive syncronization message here. Message received here becasue we set a custom message.

                try {
                    JSONObject ledStateJson = new JSONObject(s1);
                    if (ledStateJson.has("ledState")) {
                        int ledState = ledStateJson.getInt("ledState");
                        setLedUI(ledState == 0 ? false : true);
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

                                updateActiveEsp();
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
        versionError = false;
    }

    private void initUIComponents() {

        //buttons
        ledOnBtnViewLvt = findViewById(R.id.ledOnBtn);
        ledOffBtnViewLvt = findViewById(R.id.ledOffBtn);
        removeActiveNodeViewLvt = findViewById(R.id.removeActiveNode);


        // textviews
        nodeIDTextLvt = (TextView) findViewById(R.id.nodeIDTextView);

        tempText = (TextView) findViewById(R.id.temperatureTextView);
        humText = (TextView) findViewById(R.id.humidityTextView);
        ledText = (TextView) findViewById(R.id.ledTextView);

        // image view of led for on/off
        ledImageView = (ImageView) findViewById(R.id.ledImageView);
        socketStateImageView = (ImageView) findViewById(R.id.igniteStatusImgView);
        deleteNodeImageView = (ImageView) findViewById(R.id.deleteNodeImgView);
        deleteNodeImageView.setOnClickListener(this);
        ledImageView.setOnClickListener(this);

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

    public void setLedUI(final boolean state) {

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (state) {
                    ledImageView.setImageResource(R.mipmap.led2_on);
                    ledText.setText(LED_TEXT_ON);
                } else {
                    ledImageView.setImageResource(R.mipmap.led2_off);
                    ledText.setText(LED_TEXT_OFF);
                }
            }
        });

    }

    public void setConnectionState(final boolean state) {

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (state) {
                    socketStateImageView.setImageResource(R.drawable.connected);
                    isActiveEspConnected = true;
                } else {
                    socketStateImageView.setImageResource(R.drawable.disconnected);
                    isActiveEspConnected = false;
                }
            }
        });

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
                updateActiveEsp();
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
                setLedUI(false);
                setConnectionState(false);
                deleteNodeImageView.setVisibility(View.INVISIBLE);
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
        if (!versionError) {
            versionError = true;
            if (UnsupportedVersionExceptionType.UNSUPPORTED_IOTIGNITE_AGENT_VERSION.toString().equals(e.getMessage())) {
                Log.e(TAG, "UNSUPPORTED_IOTIGNITE_AGENT_VERSION");
                showAgentInstallationDialog();
            } else {
                Log.e(TAG, "UNSUPPORTED_IOTIGNITE_SDK_VERSION");
                showAppInstallationDialog();
            }

        }
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


    private void showAgentInstallationDialog() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                new MaterialDialog.Builder(HomeActivity.this)
                        .title("Confirm")
                        .content("Your IoT Ignite Agent version is out of date! Install the latest version?")
                        .positiveText("Agree")
                        .negativeText("Disagree")
                        .onPositive(new MaterialDialog.SingleButtonCallback() {
                            @Override
                            public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                                openUrl("http://iotapp.link/");
                            }
                        })
                        .show();
            }
        });
    }

    private void showAppInstallationDialog() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                new MaterialDialog.Builder(HomeActivity.this)
                        .title("Confirm")
                        .content("Your Demo App is out of date! Install the latest version?")
                        .positiveText("Agree")
                        .negativeText("Disagree")
                        .onPositive(new MaterialDialog.SingleButtonCallback() {
                            @Override
                            public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                                openUrl("https://download.iot-ignite.com/DynamicNodeExample/");
                            }
                        })
                        .show();
            }
        });
    }

    private void openUrl(String url) {
        Intent i = new Intent(Intent.ACTION_VIEW);
        i.setData(Uri.parse(url));
        try {
            startActivity(i);
        } catch (ActivityNotFoundException e) {
            showDialog("Browser could not opened!");
        }
    }

    private void showDialog(String message) {
        new MaterialDialog.Builder(HomeActivity.this)
                .content(message)
                .neutralText("Ok")
                .show();
    }

    private void setUINodeId(final String nodeId) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                nodeIDText.setText(nodeId);
                deleteNodeImageView.setVisibility(View.VISIBLE);
            }
        });
    }

    private void sendResetMessage() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (activeEsp != null) {
                    updateActiveEsp();
                }
            }
        });
    }

    private void showDeleteNodeErrorToast() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(getApplicationContext(), "There is no active esp to delete.", Toast.LENGTH_LONG).show();
            }
        });
    }

    private void updateActiveEsp() {

        /*
        // if only one device found set this device active.
        if (espNodeList.size() > 0) {
            Log.i(TAG, " NODE LIST SIZE :" + espNodeList.size());


            if (espNodeList.size() == 1) {
                activeEsp = espNodeList.get(0);
            }

            if (activeEsp.getNode() != null) {
                activeEsp.addThingEventListener(espEventListener);
                setUINodeId(activeEsp.getNode().getNodeID());
                isActiveEspConnected = activeEsp.getNode().isConnected();
                setConnectionState(isActiveEspConnected);
            } else {
                Log.i(TAG, "ACTIVE NODE IS NULL");
            }
        } else {
            initSensorDatas();
            activeEsp = null;
        }
        */
    }
}
