export const getLastRemembered = () => {
  return new Promise((resolve, reject) => {
    //SELECT * FROM user WHERE REMEMBER_ME=1  ORDER BY LAST_LOGIN_DATE  DESC LIMIT 1
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM user WHERE REMEMBER_ME=1  ORDER BY LAST_LOGIN_DATE  DESC LIMIT 1', [], (tx, results) => {
        var len = results.rows.length;

        if (len > 0) {
          let row = results.rows.item(0);
          console.warn(`Token  ID: ${row.id}, Val: ${row.acces_token}`);
          resolve(row);
        }

        resolve(null);

      });
    });
  });
}
