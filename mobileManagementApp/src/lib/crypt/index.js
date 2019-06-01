import {Base64} from 'js-base64';

export const b64 = (d) => {

    return {
        encode: () => {
            return Base64.encode(d);
        },
        decode: () => {
            return Base64.decode(d);
        }
    }
}

export const encodeAuth = (username, password) => {
    console.info("enocoding with given username and password");
    console.info("username : ", username);
    console.info("password : ", password);
    return b64(username + ':' + password).encode();
}
