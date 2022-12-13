import { TZDate } from '@toast-ui/calendar';

export function clone(date: any) {
  return new TZDate(date);
}

export function addHours(d: any, step: any) {
  const date = clone(d);
  date.setHours(d.getHours() + step);

  return date;
}

export function addDate(d: any, step: any) {
  const date = clone(d);
  date.setDate(d.getDate() + step);

  return date;
}

export function subtractDate(d: any, steps: any) {
  const date = clone(d);
  date.setDate(d.getDate() - steps);

  return date;
}
