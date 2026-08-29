const RFC_3339_DATE_TIME =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{3})?(?:Z|([+-])(\d{2}):(\d{2}))$/;

/** Return whether a value is a real RFC 3339 date-time with an explicit time zone. */
export function isRfc3339DateTime(value: string): boolean {
  const match = RFC_3339_DATE_TIME.exec(value);
  if (!match) return false;
  const [, year, month, day, hour, minute, second, , offsetHour, offsetMinute] = match;
  if (
    Number(month) < 1 ||
    Number(month) > 12 ||
    Number(day) < 1 ||
    Number(hour) > 23 ||
    Number(minute) > 59 ||
    Number(second) > 59 ||
    Number(offsetHour ?? "0") > 23 ||
    Number(offsetMinute ?? "0") > 59
  ) {
    return false;
  }
  const numericYear = Number(year);
  const leap = numericYear % 4 === 0 && (numericYear % 100 !== 0 || numericYear % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return Number(day) <= days[Number(month) - 1];
}
