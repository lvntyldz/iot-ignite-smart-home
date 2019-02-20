import * as ajax from 'MgrLib/ajax';

export const getSummary = (token, deviceId) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/action?echo=1&page=0&size=10&sort=sentDate%2Cdesc&deviceId=" + encodeURI(deviceId) + "&command=&startDate=0&endDate=0&createdBy=", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Api Action Log Response  : ", r);
                resolve(r);
            });
    });
}

export const getDetail = (token, deviceCode, actionCode) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/" + deviceCode + "/control/" + actionCode, {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Api Action Log Detail Response  : ", r);
                resolve(r);
            });
    });
}
