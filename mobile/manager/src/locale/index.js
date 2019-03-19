import _ from 'lodash';

import * as en from './en.json';
import * as tr from './tr.json';

export const locales = {
    tr: tr,
    en: en
}

export const lang = (lang) => {

    if (!lang) {
        return "";
    }

    return {
        getLabel: (label) => {

            if (!label) {
                return "";
            }

            return _.property(label)(locales[lang]);
        }
    }
}