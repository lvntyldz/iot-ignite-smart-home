package com.okan.headlessgateway;

import java.util.List;

interface FromView {

    List<Object> getEspList();

    void setEspListView(String[] espList);

    void showMessage(int msgId);

}
