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

export const getSensorTypeConfig = (token, modeCode) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/profile/" + modeCode + "/sensor-type-configurations", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Get Sensor Type Configuration of Mode Response   : ", r);
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
                console.log("Get Mode Node Configuration of Mode Response   : ", r);
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
                console.log("Get Sensor Type Configuration of Mode Response   : ", r);
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
                console.log("Get Mode Node Configuration of Mode Response   : ", r);
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
                console.info("Get Profile Response   : ", r);
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
                console.log("Add sensor type configuration to Mode Response   : ", r);
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
                console.log("Add sensor type configuration to Mode Response   : ", r);
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
                console.log("Remove sensor type configuration to Mode Response   : ", r);
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
                console.log("Remove sensor type configuration to Mode Response   : ", r);
                resolve(r);
            });
    });
}