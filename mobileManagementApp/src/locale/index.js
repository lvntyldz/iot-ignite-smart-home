import _ from 'lodash';
import {ENGLISH, TURKISH} from 'MgrEnum/Locale';

import * as en from './en.json';
import * as tr from './tr.json';

export const lang = (lang) => {

    let locales = {};
    locales[ENGLISH] = en;
    locales[TURKISH] = tr;

    return {
        getLabel: (label) => {

            if (!label) {
                return "";
            }

            return _.property(label)(locales[lang]) || label;
        }
    }
}