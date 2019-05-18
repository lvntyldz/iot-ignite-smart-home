package com.okan.headlessgateway;

import android.content.Context;
import android.content.Intent;

import java.util.List;

public interface FromView {

    Context getMainContext();

    void setEspListView(String[] espList);

    void showMessage(int msgId);

    void startServiceFromActivity(Intent intent);
}
