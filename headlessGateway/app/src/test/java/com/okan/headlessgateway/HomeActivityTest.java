package com.okan.headlessgateway;

import android.content.Context;
import android.widget.Button;
import android.widget.Toast;

import com.ardic.android.iot.hwnodeapptemplate.base.BaseWifiNodeDevice;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class HomeActivityTest {

    private HomeActivity activity;

    @Mock
    Context context;

    @Mock
    Toast toast;

    @Mock
    BaseWifiNodeDevice activeEsp;

    @Before
    public void setUp() throws Exception {
        activity = new HomeActivity();
    }

    @Test
    public void shouldThrowNullExceptionWhenActiveEspNull() {

        Button ledOnBtnView = new Button(context);
        activity.setLedOnBtnView(ledOnBtnView);

        try {
            activity.onClick(ledOnBtnView);
            Assert.fail();
        } catch (Exception e) {
            e.printStackTrace();
        }


    }


}