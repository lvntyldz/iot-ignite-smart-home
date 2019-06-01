import {db} from 'MgrLib/db';

export const getLastRemembered = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM user  ORDER BY id  DESC LIMIT 1', [], (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                    let row = results.rows.item(0);
                    resolve(row);
                }
                resolve(null);
            });
        });
    });
}

export const updateLoginUser = (email, password) => {
    db.transaction(function (tx) {
        tx.executeSql('INSERT OR REPLACE INTO user  (email,password) VALUES(?,?)', [email, password], function (transaction, result) {
            resolve(result.insertId);
        }, function (transaction, error) {
            console.log(error);
        });
    });
}
