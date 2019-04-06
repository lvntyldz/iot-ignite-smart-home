import * as ajax from 'MgrLib/ajax';
import {encodeAuth} from 'MgrLib/crypt';

export const loginToCloud = (username, password) => {

    /*
      ajax.doFetch("https://api.randomuser.me/?nat=tr&results=100")
        .default()
        .json()
        .get()
        .then(r => {
          console.info("Get JSON Response : ", r);
        });

      ajax.doFetch("http://dummy.restapiexample.com/api/v1/create", {
          "name": "test",
          "salary": "123",
          "age": "23"
        })
        .default()
        .json()
        .post()
        .then(r => {
          console.info("Post JSON Response : ", r);
        });
    */

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
                console.info("Api Login Response  : ", r);
                if (r && r.access_token) {
                    resolve(r.access_token);
                }
                reject(r);
            });
    });
}
