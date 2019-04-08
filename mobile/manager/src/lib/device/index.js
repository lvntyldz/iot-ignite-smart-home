import * as ajax from 'MgrLib/ajax';
import {LOG} from 'MgrLib/log';

export const getList = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/summary", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG(" Api Login Response   :").response(r);
                r = (!r) ? ({}) : (r);
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
                LOG(" Api Device Detail Response   :").response(r);
                r = (!r) ? ({}) : (r);
                resolve(r);
            });
    });
}

export const getDeviceSummary = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/counts?onlineDevice=true&offlineDevice=true&assignedDevice=true&totalDevice=true&activeUser=true&totalUser=true", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG("Api Device Dashboard Response    :").response(r);
                r = (!r) ? ({}) : (r);
                resolve(r);
            });
    });
}

export const getDeviceModels = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/devicemodels/device/group-by-model", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG(" Api Device Models Response  :").response(r);
                r = (!r) ? ([]) : (r);
                resolve(r);
            });
    });
}

export const getDeviceOsList = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/devicemodels/device/group-by-deviceos", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG("  Api Device OS List Response  :").response(r);
                r = (!r) ? ([]) : (r);
                resolve(r);
            });
    });
}

