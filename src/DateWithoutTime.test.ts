import "jest";
import { DateWithoutTime } from "./DateWithoutTime";

describe("DateWithoutTime", () => {
  // Date constructor
  it("yyyy-MM-dd should be a midnight UTC date object", () => {
    const myDate = new DateWithoutTime("1963-11-22");
    expect(myDate.getDate()).toBe(22);
    expect(myDate.getMonth()).toBe(10);
    expect(myDate.getFullYear()).toBe(1963);
  });

  it("ISO midnight without timezone should be a midnight UTC date object", () => {
    const myDate = new DateWithoutTime("1963-11-22T00:00:00");
    expect(myDate.getDate()).toBe(22);
    expect(myDate.getMonth()).toBe(10);
    expect(myDate.getFullYear()).toBe(1963);
  });

  it("ISO string without timezone: a time close to midnight in America, after midnight in Greenwich, should take the local day", () => {
    const myDate = new DateWithoutTime("2022-08-09T23:00:00");
    expect(myDate.getDate()).toBe(9);
    expect(myDate.getMonth()).toBe(7);
    expect(myDate.getFullYear()).toBe(2022);
  });
  it("Date from integers: a time close to midnight in America, after midnight in Greenwich, should take the local day", () => {
    const myDate = new DateWithoutTime(2022, 7, 9);
    expect(myDate.getDate()).toBe(9);
    expect(myDate.getMonth()).toBe(7);
    expect(myDate.getFullYear()).toBe(2022);
  });

  it("Date from integers: a january date", () => {
    const myDate = new DateWithoutTime(2024, 0, 9);
    expect(myDate.getDate()).toBe(9);
    expect(myDate.getMonth()).toBe(0);
    expect(myDate.getFullYear()).toBe(2024);
  });
});
