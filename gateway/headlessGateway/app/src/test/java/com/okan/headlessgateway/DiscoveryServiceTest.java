package com.okan.headlessgateway;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
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

        service.onStartNDSBtnClick();
        verify(view).showMessage(anyInt());
    }
}