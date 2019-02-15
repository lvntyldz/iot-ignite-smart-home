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

export const getPreDefinedList = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/sensor/types/?pageSize=1000", {})
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

export const add = (token, data) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/sensor/types", data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post()
            .then(r => {
                console.log("Api Add Sensor Type Response  : ", r);
                resolve(r);
            });
    });
}

export const addPreDefined = (token, data) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/sensor/types/assign", data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post()
            .then(r => {
                console.log("Api Add Predefined Sensor Type Response  : ", r);
                resolve(r);
            });
    });
}

export const remove = (token, sensorId) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/sensor/types/" + sensorId, {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .delete()
            .then(r => {
                console.log("Api Remove Sensor Type Response  : ", r);
                resolve(r);
            });
    });
}
