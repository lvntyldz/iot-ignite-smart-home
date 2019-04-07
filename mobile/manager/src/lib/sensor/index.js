import * as ajax from 'MgrLib/ajax';
import {LOG} from 'MgrLib/log';

export const getList = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/device/sensor/assignedtypes?pageSize=1000", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG(" Api Sensor Types Response   :").response(r);
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
                LOG("Api Sensor Types Response    :").response(r);
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
                LOG("Api Add Sensor Type Response   :").response(r);
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
                LOG("Api Add Predefined Sensor Type Response   :").response(r);
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
                LOG("Api Remove Sensor Type Response   :").response(r);
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
                LOG("Api Create Sensor Configuration Response    :").response(r);
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
                LOG("Api Create Node Sensor Configuration Response   :").response(r);
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
                LOG("Api Sensor Configurations Response   :").response(r);
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
                LOG(" Api Node Sensor Configurations Response  :").response(r);
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
                LOG("Api Node Inventory Response   :").response(r);
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
                LOG(" Api Remove Sensor Configuration Response  :").response(r);
                resolve(r);
            });
    });
}

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
                LOG(" Api Sensor Hisitory  Response  :").response(r);
                resolve(r.list);
            });
    });
}
