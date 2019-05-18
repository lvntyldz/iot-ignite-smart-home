package com.okan.headlessgateway;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements FromView, View.OnClickListener {

    private ListView espListView = null;
    private DiscoveryService service;
    private Button startNDSBtnView, hideActivtyBtnView;
    private String[] values;

    private static final String TAG = "HG-MainActivity-";

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
        espListView = (ListView) findViewById(R.id.espList);
        startNDSBtnView = (Button) findViewById(R.id.startNDSBtn);
        hideActivtyBtnView = (Button) findViewById(R.id.hideActivtyBtn);
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
        Log.i(TAG, "onClick");
    }
}
