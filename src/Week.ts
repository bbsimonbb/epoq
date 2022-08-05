  /* 
  Weeks in the year are indexed from 1, like days in a month, because everyone else does it this way.
  Weeks since the epoch are indexed from 0, like months. 1970 has 53 weeks, (0 - 52 in weeksSinceEpoch)
  */
interface IOptions{
  locale: string
}

export class Week {
  weekSinceEpoch: number
  weekOfYear: number
  year: number
  monday: Date
  friday: Date
  sunday: Date
  numberOfWeeksInYear: number

  constructor(weekNumberOrDateStringOrDateObj: any, year?: number | undefined) {
    if (typeof weekNumberOrDateStringOrDateObj === "string") {
      this.weekSinceEpoch = this.date2WeekSinceEpoch(new Date(weekNumberOrDateStringOrDateObj))
    } else if (typeof weekNumberOrDateStringOrDateObj === "number") {
      //small numbers are weeks, big ones are ticks
      if (weekNumberOrDateStringOrDateObj < 1_000) {
        if (year) {
          // get first Thursday in year
          var start = new Date(Date.UTC(year, 0, 1))
          while (start.getUTCDay() !== 4) start.setUTCDate(start.getUTCDate() + 1)

          // add week - 1 to get Thursday of desired week
          const thursdayOfInputWeek = start.getTime() + (weekNumberOrDateStringOrDateObj - 1) * 604_800_000

          // divide
          this.weekSinceEpoch = thursdayOfInputWeek / 604_800_000
          this.weekOfYear = weekNumberOrDateStringOrDateObj
        } else {
          this.weekSinceEpoch = weekNumberOrDateStringOrDateObj
        }
      } else this.weekSinceEpoch = weekNumberOrDateStringOrDateObj
    } else if (weekNumberOrDateStringOrDateObj.getTime) {
      this.weekSinceEpoch = this.date2WeekSinceEpoch(weekNumberOrDateStringOrDateObj)
    } else {
      throw new Error("Can't create a date from " + weekNumberOrDateStringOrDateObj)
    }
    /* 604 800 000 milliseconds in a week, the epoch was a Thursday*/
    this.monday = new Date(this.weekSinceEpoch * 604_800_000 - 1000 * 60 * 60 * 24 * 3)
    this.friday = new Date(this.weekSinceEpoch * 604_800_000 + 1000 * 60 * 60 * 24 * 1)
    this.sunday = new Date(this.weekSinceEpoch * 604_800_000 + 1000 * 60 * 60 * 24 * 3)
    this.weekOfYear = this.getWeekOfYear(this.monday)
    this.year = this.weekOfYear === 1 ? this.sunday.getFullYear() : this.monday.getFullYear()
    this.numberOfWeeksInYear = this.getNumberOfWeeksInYear(this.year)
  }

  // https://stackoverflow.com/questions/64293190/how-to-get-week-number-since-epoch-like-millis
  date2WeekSinceEpoch(anyOldDate: Date) {
    return Math.floor((anyOldDate.getTime() + 259_200_000) / 604_800_000)
  }

  getWeekOfYear(d: Date): number {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
    // Return array of year and week number
    return weekNo
  }

  getNumberOfWeeksInYear(year: number): number {
    var month = 11,
      day = 31,
      week,
      d

    // Find week that 31 Dec is in. If is first week, reduce date until get previous week.
    do {
      d = new Date(year, month, day--)
      week = this.getWeekOfYear(d)
    } while (week === 1)

    return week
  }

  toString() {
    const weekOfYear = this.getWeekOfYear(this.monday)
    return `sem. ${weekOfYear}`
  }

  toLocaleStringFull({locale}:IOptions) {
    locale = locale || "en-EN"
    return `${this.monday.toLocaleDateString(locale, { timeZone: "UTC" })} - ${this.friday.toLocaleDateString(locale, { timeZone: "UTC" })}`
  }
}
