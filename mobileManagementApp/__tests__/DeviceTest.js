import * as device from 'MgrLib/device';

const expectedDeviceDetailResponse = {
    "deviceId": "someDeviceId",
    "imei": "someImei",
    "status": "VALID",
    "osVersion": "8.1.0",
    "model": "someModel",
    "modeAppVersion": "someModeAppVersion",
    "lockStatus": false,
    "mandatoryLockStatus": false,
    "lostStatus": false,
    "createdDate": 1542564650872,
    "lastModifiedDate": 1554751474059,
    "detailLastModifiedDate": 1554749703715,
    "firstPresenceDate": 1542565191974,
    "lastPresenceDate": 1554751473807,
    "presence": {},
    "location": {},
    "battery": {},
    "network": {
        "wifi": {},
        "bluetooth": {}
    },
    "storage": {},
    "osProfile": {},
    "currentUser": {},
    "users": [],
    "adminArea": {},
    "activePolicy": {},
    "links": [],
    "code": "someCode"
};

const expectedListResponse = {
    "links": [
        {
            "rel": "self",
            "href": "http://**"
        }
    ],
    "content": [
        {
            "deviceId": "someDeviceId",
            "imei": "someImei",
            "status": "VALID",
            "model": "someModel",
            "modeAppVersion": "someVersion",
            "lockStatus": false,
            "lostStatus": false,
            "createdDate": 1542564650872,
            "lastPresenceDate": 1554750110866,
            "presence": {
                "state": "OFFLINE",
                "clientIp": "192.168.1.1"
            },
            "network": {
                "telephony": {
                    "networkRoaming": false,
                    "simOperator": null,
                    "networkOperatorName": null,
                    "msisdn": null,
                    "simState": null,
                    "simserialNumber": null
                },
                "wifi": {
                    "leaseDuration": null,
                    "mtu": null,
                    "dns1": null,
                    "dns2": null,
                    "networkType": null,
                    "currentWifiApnSsid": null,
                    "currentWifiApnHiddenSsid": false,
                    "gateway": null,
                    "server": null,
                    "netmask": null,
                    "ip": "1.1.1.1"
                },
                "bluetooth": null
            },
            "osProfile": {
                "hardware": null,
                "host": null,
                "display": "someDisplay",
                "product": null,
                "board": null,
                "model": "8.1.0",
                "device": null,
                "serial": "someSerial"
            },
            "currentUser": {
                "code": null,
                "mail": "SomeMail",
                "firstName": "SomeFirstName",
                "lastName": "SomeLastName",
                "activationCode": null,
                "identityNo": null,
                "phoneNumber": null,
                "enabled": false,
                "activated": false,
                "activationDate": null,
                "profile": {
                    "code": "someProfileCode",
                    "name": "someProfileName",
                    "policy": {
                        "code": "somePolicyCode",
                        "name": "somePolicyName"
                    }
                },
                "current": true
            },
            "groups": [
                {
                    "code": null,
                    "name": null
                }
            ],
            "adminArea": {
                "code": null,
                "name": "someAdminareaName"
            },
            "activePolicy": {
                "code": "someActivePolicyCode",
                "name": "someActivePolicyName"
            },
            "afexMode": "safex",
            "currentPolicy": "DEMO",
            "deviceTimezone": "Europe/Istanbul",
            "deviceCurrentTime": "08.04.2019 04:00",
            "links": [
                {
                    "rel": "self",
                    "href": "**"
                },
                {
                    "rel": "Users",
                    "href": "**"
                }
            ],
            "code": "someCode"
        }
    ],
    "page": {
        "size": 10,
        "totalElements": 2,
        "totalPages": 1,
        "number": 0
    }
};

it('ReturnValidResponseWhenCallGetListList', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return expectedListResponse;
                }
            });
        });

        return p;
    });

    const response = await device.getList();

    expect(response.content[0].code).toBe("someCode");
    expect(response.content[0].deviceId).toBe("someDeviceId");
    expect(response.content[0].model).toBe("someModel");
});

it('ReturnValidResponseWhenCallGetDetail', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return expectedDeviceDetailResponse;
                }
            });
        });

        return p;
    });

    const response = await device.getDetail();

    expect(response.code).toBe("someCode");
    expect(response.deviceId).toBe("someDeviceId");
    expect(response.model).toBe("someModel");
});

it('ReturnEmptyObjectWhenCallGetListListIfFetchResponseIsUndefined', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return undefined;
                }
            });
        });

        return p;
    });

    const response = await device.getList();
    expect(response).toEqual({});
});

it('ReturnEmptyObjectWhenCallGetDetailIfFetchResponseIsUndefined', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return undefined;
                }
            });
        });

        return p;
    });

    const response = await device.getDetail();

    expect(response).toEqual({});
});

it('ReturnEmptyObjectWhenCallGetDeviceModelsIfFetchResponseIsUndefined', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return undefined;
                }
            });
        });

        return p;
    });

    const response = await device.getDeviceModels();

    expect(response).toEqual([]);
});

it('ReturnEmptyObjectWhenCallGetDeviceOsListIfFetchResponseIsUndefined', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return undefined;
                }
            });
        });

        return p;
    });

    const response = await device.getDeviceOsList();

    expect(response).toEqual([]);
});


afterAll(() => setTimeout(() => process.exit(), 1000))
