export function convertHoursTo12h(hours: number): number {
  const hours12h = hours % 12;
  return hours12h === 0 ? 12 : hours12h;
}

export function padMinutes(value: string) {
  if (value.length < 2) {
    return `0${value}`;
  } else {
    return value;
  }
}

export function amOrPm(hours: number): string {
  return hours < 12 ? 'am' : 'pm';
}
