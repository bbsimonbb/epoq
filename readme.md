# Epoq

### Epoq is two classes to help tame excess precision in the Date object.

`DateWithoutTime` implements a "whole date", keeping you from having to worry about javascript's implicit
introduction of timezones. Create it however you want, it will not introduce an unwanted timezone or alter the date part...

```
const a = new DateWithoutTime("2022-12-25");
const b = new DateWithoutTime("2022-12-25T23:55:00");
const c = new DateWithoutTime("2022-12-25T23:55:00Z");
const d = new DateWithoutTime(new Date());
const e = new DateWithoutTime(19_180); // days since epoch
```
Use the familiar Date methods to serialize or access parts, you will never get a time or timezone, just the date you expect...
```
  toISOString()
  getDate()
  getDay()
  getFullYear()
  getMonth()
  getDaysSinceEpoch()
  setDate(date: number)
  setFullYear(year: number)
  setMonth(arg: number)
  addDays(days: number)
  toString()
  toLocaleDateString(locale?: string, options?: object): string 
```

`Week` implements the notion of an integer week since the epoch, easily convertible to a Date(), with methods
to convert to and from week of year. Create one however you like...

```
a = new Week(2740);
b = new Week("1970-01-01")
c = new Week(new Date(1970,0,1))
d = new Week(2022,52)
```
Then use get at its parts
weekSinceEpoch: number
weekOfYear: number
year: number
monday: DateWithoutTime
friday: DateWithoutTime
sunday: DateWithoutTime
numberOfWeeksInYear: number
getNumberOfWeeksInYear(year: number): number
toString()
toLocaleStringFull({ locale }: IOptions)
```
As such, days and weeks can be sequential whole numbers in your application and in your database.


