export function setDate(time: Date | string) {
  let day: string | number = '';
  let hour: string | number = '';
  let minute: string | number = '';

  time = new Date(time);
  day = String(time.getDay());
  hour = time.getHours();
  hour = String(hour)?.length === 1 ? `0${hour}` : String(hour);
  minute = time.getMinutes();
  minute = String(minute)?.length === 1 ? `0${minute}` : String(hour);

  return {day, hour, minute};
}