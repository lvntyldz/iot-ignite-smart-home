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

///profile/B16BB261-3850-4EBA-80C6-2B1746487010/sensor-type-configurations


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


///profile/827577FE-1E05-474E-AEA7-5F0B3A7E2B8D/sensor-type-configuration/9139edad-5dca-4e57-8547-407044b62573
