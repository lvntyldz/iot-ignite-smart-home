package com.okan.headlessgateway;

class DiscoveryService {

    FromView view;

    public DiscoveryService(FromView view) {
        this.view = view;
    }

    public void onHideActivityBtnClick() {
        view.showMessage(R.string.activity_hide_msg);
    }

    public void onStartNDSBtnClick() {
        view.showMessage(R.string.nds_started);

        view.getEspList();
    }
}
