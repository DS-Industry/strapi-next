export function dateToString (data : Date): string {
    const date = new Date(data);
    const dateOptions = {
        day: 'numeric',
        month: 'short',
      };
    
      const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
      };
      const formattedDate = new Intl.DateTimeFormat('ru-RU', {day : 'numeric', month: 'short'}).format(date);
      const formattedTime = new Intl.DateTimeFormat('ru-RU', {hour: 'numeric', minute: 'numeric'}).format(date);
    
      return `${formattedDate}, ${formattedTime}`;
}

export function convertToDateString(inputDate: string): string {
    const [datePart, timePart] = inputDate.split(' ');
    const [day, month, year] = datePart.split('.');
    const dateString = `${month}/${day}/${year} ${timePart}`;

    return dateString;
}

export function convertDateToCurrentDateWithoutTime(inputDate : Date): string {
var dd = String(inputDate.getDate()).padStart(2, '0');
var mm = String(inputDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = inputDate.getFullYear();
return dd + '.' + mm + '.' + yyyy;
} 