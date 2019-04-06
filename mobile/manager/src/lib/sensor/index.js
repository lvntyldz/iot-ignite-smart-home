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

export const createConfig = (token, data) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device-config/type", data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post()
            .then(r => {
                console.log("Api Create Sensor Configuration Response  : ", r);
                resolve(r);
            });
    });
}

export const createNodeSensorConfig = (token, data) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device-config/inventory", data)
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .post()
            .then(r => {
                console.log("Api Create Node Sensor Configuration Response  : ", r);
                resolve(r);
            });
    });
}

export const listConfig = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device-config/type?sensorType=", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Api Sensor Configurations Response  : ", r);
                resolve(r);
            });
    });
}

export const listNodeSensorConfig = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device-config/inventory?nodeId=&sensorId=", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Api Node Sensor Configurations Response  : ", r);
                resolve(r);
            });
    });
}

export const nodeList = (token, deviceId) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/" + deviceId + "/device-node-inventory", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Api Node Inventory Response  : ", r);
                resolve(r.extras.nodes);
            });
    });
}

export const removeConfig = (token, confId) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device-config/type/" + confId, {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .delete(true)
            .then(r => {
                console.log("Api Remove Sensor Configuration Response  : ", r);
                resolve(r);
            });
    });
}


//https://api.ardich.com/api/v3/device/14:1f:78:2e:ae:d8@iotigniteagent/sensor-data-history?nodeId=testNodeId1&sensorId=MQ6+GAS+Sensor&startDate=1530471640000&endDate=1552503640000&pageSize=1000
export const getSensorHistory = (token, deviceId, nodeId, sensorId, startDate, endDate) => {
    const url = "/device/" + deviceId + "/sensor-data-history?nodeId=" + nodeId + "&sensorId=" + sensorId + "&startDate=" + startDate + "&endDate=" + endDate + "&pageSize=10";
    return new Promise((resolve, reject) => {
        ajax.doFetch(url, {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                console.log("Api Sensor Hisitory  Response  : ", r);
                resolve(r.list);
            });
    });
}
