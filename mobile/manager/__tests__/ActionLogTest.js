import * as actionLog from 'MgrLib/actionLog';

it('ActionLog GetSummary Api test', async function () {

    const expectedResponse = { "links": [ { "rel": "next", "href": "http:**" }, { "rel": "self", "href": "http://**" } ], "content": [ { "code": "someCode", "deviceId": "someDeviceId", "deviceSerial": null, "command": "sendProductProfile", "deviceCode": "someDeviceCode", "parameters": "[]", "label": null, "responseId": "someResponseId", "startDate": null, "endDate": null, "sentStatus": true, "errorMessage": null, "createdBy": "user@gmail.com", "userMail": "dev@iot-ignite.com", "links": [], "sendToDeviceStatus": { "status": null, "tryCount": null, "body": null, "sentDate": "2019-04-07T17:53:24.219+03:00" }, "deliveryFromDeviceStatus": null, "executionInDeviceStatus": null, "sentDate": "2019-04-07T17:53:24.219+03:00" } ], "page": { "size": 10, "totalElements": 160, "totalPages": 16, "number": 0 } };

    global.fetch = jest.fn().mockImplementation(() => {

        var p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return expectedResponse;
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

