import {db} from 'MgrLib/db';

export const deleteAllSensorData = () => {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM  sensorData ', [], function (transaction, result) {
            resolve(result.insertId);
        }, function (transaction, error) {
            console.log(error);
        });
    });
}

export const addSensorData = (deviceId, nodeId, sensorId, sensorCreateDate, data, formattedSensorCreateDate) => {
    db.transaction(function (tx) {
        tx.executeSql('INSERT OR REPLACE INTO sensorData  (deviceId,nodeId,sensorId,sensorCreateDate,data,formattedSensorCreateDate) VALUES(?,?,?,?,?,?)', [deviceId, nodeId, sensorId, sensorCreateDate, data, formattedSensorCreateDate], function (transaction, result) {
            resolve(result.insertId);
        }, function (transaction, error) {
            console.log(error);
        });
    });
}

export const getDailyAverageBySensorType = (deviceId, nodeId, sensorId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {

            let sqlQuery = `SELECT
                             (T.total / T.count) as average,
                             T.formattedDate
                           FROM (
                                  SELECT
                                    strftime('%Y-%m-%d', formattedSensorCreateDate) as formattedDate,
                                    count(*)                                        as count,
                                    sum(data)                                       as total
                                  FROM sensorData
                                  WHERE formattedDate is not null
                                        AND deviceId = ?
                                        AND nodeId = ?
                                        AND sensorId = ?
                                  GROUP BY formattedDate
                                ) as T
                           ORDER BY T.formattedDate
                             ASC`

            tx.executeSql(sqlQuery, [deviceId, nodeId, sensorId], (tx, results) => {

                let len = results.rows.length;

                if (len > 0) {
                    let listRes = []

                    for (let i = 0; i < len; i++) {
                        listRes.push(results.rows.item(i));
                    }

                    resolve(listRes);
                }

                resolve(null);

            });
        });
    });
}


export const getWeeklyAverageBySensorType = (deviceId, nodeId, sensorId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {

            let sqlQuery = `SELECT
                             (T.total / T.count) as average,
                             T.formattedDate
                           FROM (
                                  SELECT
                                    strftime('%Y-%m-%d', formattedSensorCreateDate) as formattedDate,
                                    count(*)                                        as count,
                                    sum(data)                                       as total
                                  FROM sensorData
                                  WHERE formattedDate is not null
                                        AND deviceId = ?
                                        AND nodeId = ?
                                        AND sensorId = ?
                                  GROUP BY formattedDate
                                ) as T
                           ORDER BY T.formattedDate
                             ASC`

            tx.executeSql(sqlQuery, [deviceId, nodeId, sensorId], (tx, results) => {

                let len = results.rows.length;

                if (len > 0) {
                    let listRes = []

                    for (let i = 0; i < len; i++) {
                        listRes.push(results.rows.item(i));
                    }

                    resolve(listRes);
                }

                resolve(null);

            });
        });
    });
}

export const getMonthlyAverageBySensorType = (deviceId, nodeId, sensorId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {

            let sqlQuery = `SELECT
                             (T.total / T.count) as average,
                             T.formattedDate
                           FROM (
                                  SELECT
                                    strftime('%Y-%m-%d', formattedSensorCreateDate) as formattedDate,
                                    count(*)                                        as count,
                                    sum(data)                                       as total
                                  FROM sensorData
                                  WHERE formattedDate is not null
                                        AND deviceId = ?
                                        AND nodeId = ?
                                        AND sensorId = ?
                                  GROUP BY formattedDate
                                ) as T
                           ORDER BY T.formattedDate
                             ASC`

            tx.executeSql(sqlQuery, [deviceId, nodeId, sensorId], (tx, results) => {

                let len = results.rows.length;

                if (len > 0) {
                    let listRes = []

                    for (let i = 0; i < len; i++) {
                        listRes.push(results.rows.item(i));
                    }

                    resolve(listRes);
                }

                resolve(null);

            });
        });
    });
}


export const getYearlyAverageBySensorType = (deviceId, nodeId, sensorId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {

            let sqlQuery = `SELECT
                             (T.total / T.count) as average,
                             T.formattedDate
                           FROM (
                                  SELECT
                                    strftime('%Y-%m-%d', formattedSensorCreateDate) as formattedDate,
                                    count(*)                                        as count,
                                    sum(data)                                       as total
                                  FROM sensorData
                                  WHERE formattedDate is not null
                                        AND deviceId = ?
                                        AND nodeId = ?
                                        AND sensorId = ?
                                  GROUP BY formattedDate
                                ) as T
                           ORDER BY T.formattedDate
                             ASC`

            tx.executeSql(sqlQuery, [deviceId, nodeId, sensorId], (tx, results) => {

                let len = results.rows.length;

                if (len > 0) {
                    let listRes = []

                    for (let i = 0; i < len; i++) {
                        listRes.push(results.rows.item(i));
                    }

                    resolve(listRes);
                }

                resolve(null);

            });
        });
    });
}

