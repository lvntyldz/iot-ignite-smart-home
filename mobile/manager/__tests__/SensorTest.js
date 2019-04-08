import * as sensor from 'MgrLib/sensor';

it('ReturnEmptyListWhenCallGetListIfFetchResponseIsUndefined', async function () {

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

    const response = await sensor.getList();

    expect(response).toEqual([]);
});

it('ReturnEmptyListWhenCallGetPreDefinedListIfFetchResponseIsUndefined', async function () {

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

    const response = await sensor.getPreDefinedList();

    expect(response).toEqual([]);
});

it('ReturnEmptyListWhenCallListConfigIfFetchResponseIsUndefined', async function () {

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

    const response = await sensor.listConfig();

    expect(response).toEqual([]);
});

it('ReturnEmptyListWhenCallListNodeSensorConfigIfFetchResponseIsUndefined', async function () {

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

    const response = await sensor.listNodeSensorConfig();

    expect(response).toEqual([]);
});

afterAll(() => setTimeout(() => process.exit(), 1000))
