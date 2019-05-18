package com.okan.headlessgateway;

import android.content.Context;
import android.content.Intent;

import com.ardic.android.iot.hwnodeapptemplate.base.BaseWifiNodeDevice;

import java.util.List;

public interface FromView {

    Context getMainContext();

    void setEspListView(String[] espList);

    void showMessage(int msgId);

    void startServiceFromActivity(Intent intent);

    void addNodeToList(BaseWifiNodeDevice baseWifiNodeDevice);

    List<BaseWifiNodeDevice> getNodeList();
}
