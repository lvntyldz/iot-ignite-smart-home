import * as ajax from 'MgrLib/ajax';

export const getList = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/summary", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Api Login Response  : ", r);
                resolve(r);
            });
    });
}

export const getDetail = (token, deviceCode) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/" + deviceCode, {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Api Device Detail Response  : ", r);
                resolve(r);
            });
    });
}

