package com.okan.headlessgateway;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import com.ardic.android.iot.hwnodeapptemplate.base.BaseWifiNodeDevice;
import com.okan.headlessgateway.service.DiscoveryService;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class MainActivity extends Activity implements FromView, View.OnClickListener {

    private static final String TAG = "HG-MainActivity-";
    private ListView espListView = null;
    private List<BaseWifiNodeDevice> nodeList = new CopyOnWriteArrayList<>();
    private DiscoveryService service;
    private Button startNDSBtnView, hideActivtyBtnView, ledOnBtnView, ledOffBtnVew;
    private String[] values;

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

        //click listener
        startNDSBtnView.setOnClickListener(this);
        hideActivtyBtnView.setOnClickListener(this);
        ledOffBtnVew.setOnClickListener(this);
        ledOnBtnView.setOnClickListener(this);

        //Discovery Service
        service = new DiscoveryService(this);
    }

    private void initComponents() {
        espListView = (ListView) findViewById(R.id.espList);
        startNDSBtnView = (Button) findViewById(R.id.startNDSBtn);
        hideActivtyBtnView = (Button) findViewById(R.id.hideActivtyBtn);
        ledOffBtnVew = (Button) findViewById(R.id.ledOffBtn);
        ledOnBtnView = (Button) findViewById(R.id.ledOnBtn);
    }

    @Override
    public Context getMainContext() {
        return MainActivity.this;
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
    public void startServiceFromActivity(Intent intent) {
        startService(intent);
    }

    @Override
    public void onClick(View view) {

        if (view.equals(hideActivtyBtnView)) {
            Log.i(TAG, "hideActivtyBtnView Clicked");
            service.onHideActivityBtnClick();
            return;
        }

        if (view.equals(startNDSBtnView)) {
            Log.i(TAG, "startNDSBtnView Clicked");
            service.onStartNDSBtnClick();
            return;
        }

        if (view.equals(ledOnBtnView)) {
            Log.i(TAG, "ledOnBtnView Clicked");
            service.ledOnBtnClick();
            return;
        }

        if (view.equals(ledOffBtnVew)) {
            Log.i(TAG, "ledOffBtnVew Clicked");
            service.ledOffBtnClick();
            return;
        }

    }
}
