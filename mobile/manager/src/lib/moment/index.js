import moment from 'moment';

export const getMonthOfYear = (value) => {
    return moment(value).format("MM");
}

export const getHumanDate = (value) => {
    return moment(value).format("DD-MM-YYYY h:mm:ss");
}

export const currTime = () => {
    return moment().toDate().getTime();
}

export const lastDay = () => {
    return moment().subtract(1, 'days').toDate().getTime();
}

export const lastWeek = () => {
    return moment().subtract(1, 'weeks').toDate().getTime();
}

export const lastMonth = () => {
    return moment().subtract(1, 'month').toDate().getTime();
}

export const lastYear = () => {
    return moment().subtract(1, 'year').toDate().getTime();
}