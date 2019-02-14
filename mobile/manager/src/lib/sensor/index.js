import * as ajax from 'MgrLib/ajax';

export const getList = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/sensor/assignedtypes?pageSize=1000", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Api Sensor Types Response  : ", r);
                resolve(r);
            });
    });
}
