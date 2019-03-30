import {isJSON} from 'MgrUtil/Object';

export const LOG = (msg) => {
    return {
        "info": (obj) => {
            printLine(msg, obj, '#006ddb');
        },
        "err": (obj) => {
            printLine(msg, obj, '#ff0000');
        },
        "warn": (obj) => {
            printLine(msg, obj, '#efdc04');
        },
        "succes": (obj) => {
            printLine(msg, obj, '#10ea59');
        }
    }
}

export const generateStringMsg = (msg, obj) => {
    let stringMess = msg;

    if (isJSON(JSON.stringify(obj))) {
        stringMess += " :: " + JSON.stringify(obj);
    } else {
        stringMess += " - - -  (value is not JSON)"
    }

    return stringMess;
}

export const printLine = (msg, obj, color) => {

    if (!msg && !obj) {
        return;
    }

    let stringMess = generateStringMsg(msg, obj);

    console.log('%c' + stringMess, 'color: ' + color + ';font-weight: bold');
}
