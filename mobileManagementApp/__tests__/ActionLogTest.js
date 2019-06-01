import * as actionLog from 'MgrLib/actionLog';

const expectedSummaryResponse = {
    "links": [{"rel": "next", "href": "http:**"}, {"rel": "self", "href": "http://**"}],
    "content": [{
        "code": "someCode",
        "deviceId": "someDeviceId",
        "deviceSerial": null,
        "command": "sendProductProfile",
        "deviceCode": "someDeviceCode",
        "parameters": "[]",
        "label": null,
        "responseId": "someResponseId",
        "startDate": null,
        "endDate": null,
        "sentStatus": true,
        "errorMessage": null,
        "createdBy": "user@mail.com",
        "userMail": "dev@iot-ignite.com",
        "links": [],
        "sendToDeviceStatus": {
            "status": null,
            "tryCount": null,
            "body": null,
            "sentDate": "2019-04-07T17:53:24.219+03:00"
        },
        "deliveryFromDeviceStatus": null,
        "executionInDeviceStatus": null,
        "sentDate": "2019-04-07T17:53:24.219+03:00"
    }],
    "page": {"size": 10, "totalElements": 160, "totalPages": 16, "number": 0}
};

const expectedLogDetailResponse = {
    "links": [],
    "code": "someCode",
    "deviceId": "someDeviceId",
    "deviceSerial": "someDeviceSerial",
    "command": "ringStop",
    "deviceCode": null,
    "parameters": null,
    "label": null,
    "responseId": "someResponseId",
    "startDate": null,
    "endDate": null,
    "sentStatus": true,
    "errorMessage": null,
    "createdBy": null,
    "userMail": null,
    "sendToDeviceStatus": {
        "status": "100",
        "tryCount": "1",
        "body": "[]",
        "sentDate": "2019-04-07T17:51:42.700+03:00"
    },
    "deliveryFromDeviceStatus": {
        "desc": "SUCCESSFUL",
        "deliveredDate": "2019-04-07T17:51:43.397+03:00"
    },
    "executionInDeviceStatus": {
        "result": "{}"
    },
    "sentDate": "2019-04-07T17:51:42.677+03:00"
}

it('ReturnValidResponseWhenCallGetSummary', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return expectedSummaryResponse;
                }
            });
        });

        return p;
    })

    const response = await actionLog.getSummary();

    expect(response.content[0].code).toBe("someCode");
    expect(response.content[0].deviceId).toBe("someDeviceId");
    expect(response.content[0].command).toBe("sendProductProfile");
});

it('ReturnEmptyObjectResponseWhenCallGetSummaryIfResponseUndefined', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return undefined;
                }
            });
        });

        return p;
    })

    const response = await actionLog.getSummary();
    expect(response).toEqual({});
});

it('ReturnValidResponseWhenCallGetLogDetail', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return expectedLogDetailResponse;
                }
            });
        });

        return p;
    })

    const response = await actionLog.getDetail();

    expect(response.deviceId).toBe("someDeviceId");
    expect(response.deviceSerial).toBe("someDeviceSerial");
    expect(response.responseId).toBe("someResponseId");
});

it('ReturnEmptyObjectResponseWhenCallGetLogDetailIfFetchResponseIsUndefined', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return undefined;
                }
            });
        });

        return p;
    })

    const response = await actionLog.getDetail();

    expect(response).toEqual({});
});

afterAll(() => setTimeout(() => process.exit(), 1000))
