import {db} from 'MgrLib/db';

export const listTokens = () => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM token', [], (tx, results) => {
      console.warn("Query completed");

      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        console.warn(`Token  ID: ${row.id}, Val: ${row.acces_token}`);
      }

    });
  });
}

export const addToken = (token) => {
  db.transaction(function(tx) {
    tx.executeSql('INSERT INTO token  (acces_token) VALUES(?)', [token], function(transaction, result) {
      console.log(result.insertId);
    }, function(transaction, error) {
      console.log(error);
    });
  });
}
