export class DateWithoutTime {
  utcMidnightDateObj: Date
  constructor(dateOrYearOrDaysSinceEpoch?: any, month?: number, day?: number) {
    if (!isNaN(dateOrYearOrDaysSinceEpoch)) {
      if (month || month === 0) this.utcMidnightDateObj = new Date(Date.UTC(dateOrYearOrDaysSinceEpoch, month, day))
      else this.utcMidnightDateObj = new Date(dateOrYearOrDaysSinceEpoch * 86_400_000)
    } else {
      // if no date supplied, use Now.
      if (!dateOrYearOrDaysSinceEpoch) dateOrYearOrDaysSinceEpoch = new Date()
      // if initDate specifies a timezone offset, or is already UTC, just keep the date part, reflecting the date _in that timezone_
      if (typeof dateOrYearOrDaysSinceEpoch === "string" && dateOrYearOrDaysSinceEpoch.match(/(-\d\d|(\+|-)\d{2}:\d{2}|Z)$/gm)) {
        this.utcMidnightDateObj = new Date(dateOrYearOrDaysSinceEpoch.substring(0, 10) + "T00:00:00Z")
      } else {
        // if init date is not already a date object, feed it to the date constructor.
        if (!(dateOrYearOrDaysSinceEpoch instanceof Date)) dateOrYearOrDaysSinceEpoch = new Date(dateOrYearOrDaysSinceEpoch)

        // Vital Step! Strip time part. Create UTC midnight dateObj according to local timezone.
        this.utcMidnightDateObj = new Date(Date.UTC(dateOrYearOrDaysSinceEpoch.getFullYear(), dateOrYearOrDaysSinceEpoch.getMonth(), dateOrYearOrDaysSinceEpoch.getDate()))
      }
    }
  }
  toISOString(): string {
    return this.utcMidnightDateObj.toISOString()
  }
  getDate(): number {
    return this.utcMidnightDateObj.getUTCDate()
  }
  getDay(): number {
    return this.utcMidnightDateObj.getUTCDay()
  }
  getFullYear(): number {
    return this.utcMidnightDateObj.getUTCFullYear()
  }
  getMonth(): number {
    return this.utcMidnightDateObj.getUTCMonth()
  }
  getDaysSinceEpoch(): number {
    return this.utcMidnightDateObj.getTime() / 86_400_000
  }
  setDaysSinceEpoch(days:number){
    this.utcMidnightDateObj = new Date(days * 86_400_000)
  }
  setDate(date: number): number {
    return this.utcMidnightDateObj.setUTCDate(date)
  }
  setFullYear(year: number): number {
    return this.utcMidnightDateObj.setUTCFullYear(year)
  }

  setMonth(arg: number): number {
    return this.utcMidnightDateObj.setUTCMonth(arg)
  }
  addDays(days: number): void {
    this.utcMidnightDateObj.setUTCDate(this.utcMidnightDateObj.getUTCDate() + days)
  }
  toString(): string {
    return this.utcMidnightDateObj.toString()
  }
  toLocaleDateString(locale?: string, options?: object): string {
    options = options || {}
    Object.assign(options, { timeZone: "UTC" })
    return this.utcMidnightDateObj.toLocaleDateString(locale, options)
  }
}
