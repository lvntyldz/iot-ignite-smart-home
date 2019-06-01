import * as workingset from 'MgrLib/workingset';

const expectedCode = "someCode";

it('ReturnValidResponseWhenCallEmpty', async function () {

    global.fetch = jest.fn().mockImplementation(() => {

        const p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return {code: expectedCode};
                }
            });
        });

        return p;
    })

    const response = await workingset.empty();

    expect(response).toBe(expectedCode);
});


afterAll(() => setTimeout(() => process.exit(), 1000))
