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

export function divideDateAndTime (inputDate: Date) {
  const [datePart, timePart] = String(inputDate).split('T');
  const [ year, month, day] = datePart.split('-'); 
  const [ hour, minute, second ] = timePart.split(':');
  const dateStrnig = `${day}.${month}.${year}`;
  const timeString = `${hour}:${minute}`
  return [ dateStrnig, timeString];
}

export function convertDateToCurrentDateWithoutTime(inputDate : Date): string {
var dd = String(inputDate.getDate()).padStart(2, '0');
var mm = String(inputDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = inputDate.getFullYear();
return dd + '.' + mm + '.' + yyyy;
} 

export function generateErrorMessage(setError: any, body: any) : boolean {
  let validationError = false;
  const translateObj = {
    'priority' : 'Приоритет',
    'title' : 'Название',
    'department' : 'Отдел',
    'category' : 'Категория',
    'subcategory': 'Подкатегория',
    'asiignees': 'Исполнители'
}
for (let key in body) {
    if (((  
        key === 'title' || 
        key === 'department' || 
        key === 'category' || 
        key === 'subcategory' ) && 
        body[key] === '' ) || 
        (key === 'asiignees' && body[key].length === 0) ||
        (key === 'priority' && body[key] === null)) {
            const translateValue = translateObj[key]
        setError(`Поле ${translateValue} не должно быть пустым.`);
        validationError=true;
    }
  }
  return validationError 
}