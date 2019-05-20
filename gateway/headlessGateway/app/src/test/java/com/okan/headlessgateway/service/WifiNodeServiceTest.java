package com.okan.headlessgateway.service;

import android.app.Application;
import android.app.Service;
import android.content.ContextWrapper;
import android.content.Intent;
import android.os.IBinder;

import com.ardic.android.iotignite.callbacks.ConnectionCallback;
import com.ardic.android.utilitylib.interfaces.TimeoutListener;

import org.hamcrest.CoreMatchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.modules.junit4.PowerMockRunner;

import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyInt;

@RunWith(PowerMockRunner.class)
public class WifiNodeServiceTest {
    
    @InjectMocks
    private WifiNodeService wifiNodeService;

    @Mock
    private ContextWrapper contextWrapper;

    @Mock
    private Service service;

    @Mock
    private ConnectionCallback connectionCallback;

    @Mock
    private TimeoutListener timeoutListener;

    @Before
    public void setUp() throws Exception {
        Mockito.when(contextWrapper.getApplicationContext()).thenReturn(new Application());
    }

    @Test
    public void shouldReturnNullWhenCallOnBınd() {
        IBinder iBinder = wifiNodeService.onBind(any(Intent.class));
        assertNull(iBinder);
    }

    @Test
    public void shouldReturnStartStickyWhenCallOnStartCommand() {
        int result = wifiNodeService.onStartCommand(any(Intent.class), anyInt(), anyInt());
        assertThat(result, CoreMatchers.equalTo(Service.START_STICKY));
    }

    @Test
    public void shouldCallStartManagement() {
        wifiNodeService.startManagement();
    }

}