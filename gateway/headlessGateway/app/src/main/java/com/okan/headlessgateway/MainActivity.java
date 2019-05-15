package com.okan.headlessgateway;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import com.ardic.android.iot.hwnodeapptemplate.base.BaseWifiNodeDevice;
import com.ardic.android.iot.hwnodeapptemplate.listener.CompatibilityListener;
import com.ardic.android.iot.hwnodeapptemplate.listener.WifiNodeManagerListener;
import com.ardic.android.iotignite.exceptions.UnsupportedVersionException;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements FromView, View.OnClickListener, WifiNodeManagerListener, CompatibilityListener {

    private ListView espListView = null;
    private DiscoveryService service;
    private Button startNDSBtnView, hideActivtyBtnView;
    String[] values;

    private static final String TAG = "Headless GateWay - ";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initComponents();

        values = new String[]{"Ubuntu1", "Android2", "iPhone3",
                "Windows", "Ubuntu", "Android", "iPhone", "Windows", "Ubuntu", "Android", "iPhone",
                "Windows", "Ubuntu", "Android", "iPhone", "Windows", "Ubuntu", "Android", "iPhone",
                "Windows", "Ubuntu", "Android", "iPhone", "Windows"};

        setEspListView(values);

        startNDSBtnView.setOnClickListener(onStartNDSBtnClickListener());
        hideActivtyBtnView.setOnClickListener(onHideActivityBtnClickListener());

        service = new DiscoveryService(this);
    }

    private View.OnClickListener onHideActivityBtnClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                service.onHideActivityBtnClick();
            }
        };
    }

    private View.OnClickListener onStartNDSBtnClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                service.onStartNDSBtnClick();
            }
        };
    }

    private void initComponents() {
        espListView = findViewById(R.id.espList);
        startNDSBtnView = findViewById(R.id.startNDSBtn);
        hideActivtyBtnView = findViewById(R.id.hideActivtyBtn);
    }

    @Override
    public List<Object> getEspList() {

        List<Object> objectList = new ArrayList<>();

        for (int i = 0; i < espListView.getAdapter().getCount(); i++) {
            Object item = espListView.getAdapter().getItem(i);
            objectList.add(item);
        }

        return objectList;
    }

    @Override
    public void setEspListView(String[] data) {
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, data);

        espListView.setAdapter(adapter);
    }

    @Override
    public void showMessage(int msgId) {
        Toast.makeText(MainActivity.this, getString(msgId), Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onClick(View view) {
        Log.i(TAG, "onClick");
    }

    @Override
    public void onUnsupportedVersionExceptionReceived(UnsupportedVersionException e) {
        Log.i(TAG, "onUnsupportedVersionExceptionReceived");
    }

    @Override
    public void onWifiNodeDeviceAdded(BaseWifiNodeDevice baseWifiNodeDevice) {
        Log.i(TAG, "onWifiNodeDeviceAdded");
    }

    @Override
    public void onIgniteConnectionChanged(boolean b) {
        Log.i(TAG, "onIgniteConnectionChanged");
    }
}
