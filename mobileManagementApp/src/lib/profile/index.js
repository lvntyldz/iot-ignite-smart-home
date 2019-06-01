import * as ajax from 'MgrLib/ajax';
import {LOG} from 'MgrLib/log';

export const getData = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG("Get Profile Response   :").response(r);
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
                LOG("Get Policy of Mode Response  :").response(r);
                resolve(r);
            });
    });
}

export const getDefaultProfile = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile?name=DEMO", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG("Get Default Profile(Mode) Response  :").response(r);
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
                LOG("Send Mode to  Workingset Response    :").response(r);
                resolve(r);
            });
    });
}

export const sendModeByDeviceCode = (token, deviceCode, mode, data) => {

    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + mode + "/pushdevice/" + deviceCode, data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post(true)
            .then(r => {
                LOG("Send Mode to  Workingset Response    :").response(r);
                resolve(r);
            });
    });
}

export const getSensorTypeConfig = (token, modeCode) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + modeCode + "/sensor-type-configurations", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG("Get Sensor Type Configuration of Mode Response    :").response(r);
                resolve(r);
            });
    });
}

export const getModeNodeConfig = (token, modeCode) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + modeCode + "/inventory-configurations", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG("Get Mode Node Configuration of Mode Response   :").response(r);
                r = (!r || r.result == "Error") ? ([]) : (r);
                resolve(r);
            });
    });
}

export const getNotInSensorTypeConfig = (token, modeCode) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + modeCode + "/sensor-type-configurations/notin", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG(" Get Sensor Type Configuration of Mode Response  :").response(r);
                resolve(r);
            });
    });
}

export const getNotInModeNodeConfig = (token, modeCode) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + modeCode + "/inventory-configurations/notin", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG(" Get Mode Node Configuration of Mode Response   :").response(r);
                r = (!r || r.result == "Error") ? ([]) : (r);
                resolve(r);
            });
    });
}

export const getDefaultMode = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG(" Get Profile Response   :").response(r);
                let mode = {};

                r.map((v, k) => {
                    if (v.defaultProfile === true) {
                        mode = {
                            name: v.name,
                            code: v.code
                        }
                    }
                });
                resolve(mode);
            });
    });
}

export const addSensorConfigToMode = (token, sensorConfCode, mode, data) => {

    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + mode + "/sensor-type-configuration/" + sensorConfCode, data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .put(true)
            .then(r => {
                LOG("Add sensor type configuration to Mode Response   :").response(r);
                resolve(r);
            });
    });
}

export const addNodeConfigToMode = (token, sensorConfCode, mode, data) => {

    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + mode + "/inventory-configuration/" + sensorConfCode, data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .put(true)
            .then(r => {
                LOG("Add sensor type configuration to Mode Response   :").response(r);
                resolve(r);
            });
    });
}

export const removeSensorTypeConf = (token, sensorConfCode, mode, data) => {

    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + mode + "/sensor-type-configuration/" + sensorConfCode, data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .delete(true)
            .then(r => {
                LOG("Remove sensor type configuration to Mode Response    :").response(r);
                resolve(r);
            });
    });
}

export const removeModeNodeConf = (token, sensorConfCode, mode, data) => {

    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + mode + "/inventory-configuration/" + sensorConfCode, data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .delete(true)
            .then(r => {
                LOG(" Remove sensor type configuration to Mode Response   :").response(r);
                resolve(r);
            });
    });
}