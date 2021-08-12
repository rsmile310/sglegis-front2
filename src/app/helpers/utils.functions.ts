import * as moment from "moment";

export function dateFormat(date: any, format: string) {
    if (date) {
        const d = moment(date);
        return d.format(format);            
    } 
    return null;
}