export function dateToString (data : Date): string {
    const date = new Date(data);
    const result = date.toLocaleString();
    return result;
}

export function convertToDateString(inputDate: string): string {
    const [datePart, timePart] = inputDate.split(' ');
    const [day, month, year] = datePart.split('.');
    const dateString = `${month}/${day}/${year} ${timePart}`;

    return dateString;
}