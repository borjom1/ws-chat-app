export function getTime(date) {
  return `${date.getHours()}:${Math.floor(date.getMinutes() / 10)}${date.getMinutes() % 10}`;
}