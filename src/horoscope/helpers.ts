import moment = require("moment-timezone");
import { encodeHTML } from "../helpers";

const data = require('../../data/zodiac-signs-dates.json');

function horoscopeSignDates(sign: number): { startMonth: number, startDay: number, endDay: number } {
    return data[sign];
}

export function formatSignDates(sign: number, dateFormat: string, lang: string) {
    const date = horoscopeSignDates(sign);

    const month = date.startMonth - 1;
    const startDate = moment(new Date(2017, month, date.startDay)).locale(lang);
    const endDate = moment(new Date(2017, month + 1, date.endDay)).locale(lang);
    return [startDate.format(dateFormat), endDate.format(dateFormat)].join(' - ');
}

export function encodeReportText(text: string) {
    return text.split(/\n/g).map(line => {
        return '<p>' + encodeHTML(line) + '</p>';
    }).join('');
}