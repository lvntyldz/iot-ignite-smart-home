import * as ajax from 'MgrLib/ajax';
import {LOG} from 'MgrLib/log';

export const getList = (token) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/cep/flow?size=1000&enabled=true", {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .get()
            .then(r => {
                LOG(" Api CEP List Response   :").response(r);

                r = (!r || !r.extras || !r.extras.list) ? ([]) : (r.extras.list);
                resolve(r);
            });
    });
}

export const remove = (token, flowId) => {
    return new Promise((resolve, reject) => {
        ajax.doFetch("/cep/flow/" + flowId, {})
            .header({
                'Authorization': 'Bearer ' + token
            })
            .json()
            .delete()
            .then(r => {
                LOG("Api Remove CEP Response   :").response(r);
                resolve(r);
            });
    });
}
