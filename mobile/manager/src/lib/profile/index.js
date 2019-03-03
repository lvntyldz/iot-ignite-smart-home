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
