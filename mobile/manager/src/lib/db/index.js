import {openDatabase} from 'react-native-sqlite-storage';

export const db = openDatabase("managerApp.db", "1.0", "SmartHome Manager App Database", 200000, openCB, errorCB);

export const createScripts = () => {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS token (id INTEGER PRIMARY KEY AUTOINCREMENT, acces_token TEXT)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS user( id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)');
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
