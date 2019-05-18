package com.okan.headlessgateway;

import android.util.Log;

import com.okan.headlessgateway.service.DiscoveryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Log.class})
public class DiscoveryServiceTest {

    @InjectMocks
    private DiscoveryService service;

    @Mock
    private FromView view;

    private List<Object> esps;

    @Before
    public void setUp() throws Exception {
        esps = new ArrayList<>();
        when(view.getEspList()).thenReturn(esps);

    }

    @Test
    public void should() {

        PowerMockito.mockStatic(Log.class);

        service.onStartNDSBtnClick();
        verify(view).showMessage(anyInt());
    }
}