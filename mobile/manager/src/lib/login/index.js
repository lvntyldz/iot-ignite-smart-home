import * as ajax from 'MgrLib/ajax';
import {encodeAuth} from 'MgrLib/crypt';
import {LOG} from 'MgrLib/log';

export const loginToCloud = (username, password) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/login/oauth", {
            grant_type: "password",
            username: username,
            password: password
        })
            .header({
                'Authorization': 'Basic ' + encodeAuth(username, password)
            })
            .formData()
            .then(r => {
                LOG("Api Login Response ").info(r);
                if (r && r.access_token) {
                    resolve(r.access_token);
                }
                reject(r);
            });
    });
}
