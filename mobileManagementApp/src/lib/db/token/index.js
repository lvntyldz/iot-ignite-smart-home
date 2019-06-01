import {db} from 'MgrLib/db';

export const listTokens = () => {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM token', [], (tx, results) => {
            console.info("Query completed");

            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.info(`Token  ID: ${row.id}, Val: ${row.acces_token}`);
            }

        });
    });
}

export const addToken = (token) => {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO token  (acces_token) VALUES(?)', [token], function (transaction, result) {
            console.log(result.insertId);
        }, function (transaction, error) {
            console.log(error);
        });
    });
}
