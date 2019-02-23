import * as ajax from 'MgrLib/ajax';

export const getData = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Get Profile Response   : ", r);
                resolve(r);
            });
    });
}

export const getPolicy = (token, modeCode) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + modeCode, {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Get Policy of Mode Response   : ", r);
                resolve(r);
            });
    });
}

export const sendMode = (token, workingset, mode, data) => {

    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + mode + "/push/" + workingset, data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post(true)
            .then(r => {
                console.log("Send Mode to  Workingset Response   : ", r);
                resolve(r);
            });
    });
}
