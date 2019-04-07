import * as ajax from 'MgrLib/ajax';
import {LOG} from 'MgrLib/log';

export const getLast = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/workingset/last", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG("Last Workingset Response    :").response(r);
                resolve(r);
            });
    });
}

export const empty = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/workingset/empty", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post(true)
            .then(r => {
                LOG(" Empty  Workingset Response   :").response(r);
                resolve(r.code);
            });
    });
}

export const addDevice = (token, workingset, device) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/workingset/" + workingset + "/devices/add", [device])
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .put(true)
            .then(r => {
                LOG("  Add Device to  Workingset Response :").response(r);
                resolve(r);
            });
    });
}

export const startRing = (token, workingset) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/workingset/" + workingset + "/control/ringstart", {
            "duration": "",
            "localPath": "",
            "volumeLevel": 5
        })
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post(true)
            .then(r => {
                LOG(" startRing  Workingset Response  :").response(r);
                resolve(r);
            });
    });
}

export const ringstop = (token, workingset) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/workingset/" + workingset + "/control/ringstop", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post(true)
            .then(r => {
                LOG(" ringstop  Workingset Response  :").response(r);
                resolve(r);
            });
    });
}

export const restartDevice = (token, workingset) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/workingset/" + workingset + "/control/reboot", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post(true)
            .then(r => {
                LOG(" ringstop  Workingset Response  :").response(r);
                resolve(r);
            });
    });
}

export const sendMessage = (token, workingset, data) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/workingset/" + workingset + "/control/message", data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post(true)
            .then(r => {
                LOG("send message  Workingset Response    :").response(r);
                resolve(r);
            });
    });
}
