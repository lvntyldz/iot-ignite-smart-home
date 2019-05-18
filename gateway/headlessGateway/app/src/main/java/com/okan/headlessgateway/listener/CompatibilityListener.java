package com.okan.headlessgateway.listener;

import com.ardic.android.iotignite.exceptions.UnsupportedVersionException;

public interface CompatibilityListener {
    void onUnsupportedVersionExceptionReceived(UnsupportedVersionException exception);
}
