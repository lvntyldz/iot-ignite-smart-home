import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase("managerApp.db", "1.0", "SmartHome Manager App Database", 200000, openCB, errorCB);

export const sampleCRUD = () => {

db.transaction(function (tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS TOKEN (id unique, acces_token)');
   tx.executeSql('INSERT INTO TOKEN (id, acces_token) VALUES (1, "abc-def-ghj-klm-nop")');
   tx.executeSql('INSERT INTO TOKEN (id, acces_token) VALUES (2, "123-234-345-456-567")');
});

  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM TOKEN', [], (tx, results) => {
        console.warn("Query completed");

        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.warn(`Token  ID: ${row.id}, Val: ${row.acces_token}`);
        }

      });
  });
}

export const errorCB = (err) => {
  console.log("SQL Error: " + err);
}

export const successCB = () => {
  console.log("SQL executed fine");
}

export const openCB = () => {
  console.log("Database OPENED");
}
