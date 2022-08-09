import 'jest';
import {Week} from './Week'

// https://www.epochconverter.com/weeks/1989#earlyyears

describe('Week', ()=>{
    // Date constructor
    it('Epoch should be in week zero', ()=>{
        const week = new Week(new Date(Date.UTC(1970,0,1)));
        expect(week.weekSinceEpoch).toBe(0)
    })
    // Date string constructor
    it("29/12/1969 is in week zero", ()=>{
        const week = new Week('1969-12-29');
        expect(week.weekSinceEpoch).toBe(0)
    })
    /* 
    Weeks in the year are indexed from 1, like days in a month, because everyone else does it this way.
    Weeks since the epoch are indexed from 0, like months. 1970 has 53 weeks, (0 - 52 in weeksSinceEpoch)
    */
    // WeekSinceEpoch constructor
    it("Week 53 is the first week of 1971",()=>{
        const week = new Week(53);
        expect( week.year ).toBe(1971);
        expect(week.weekOfYear).toBe(1);
    })
    // Week in year constructor
    it("The first week of 1971 is week 53",()=>{
        const week = new Week(1971,1);
        expect( week.weekSinceEpoch ).toBe(53);
    })
    it("For years starting on a Thursday, week 1 contains the 1st of January",()=>{
        const week = new Week('2015-01-01');
        expect(week.monday.getFullYear()).toBe(week.year - 1);
    })
    
    it("For years starting on a Friday, week 1 doesn't contain the 1st of January",()=>{
        const week = new Week('2016-01-01');
        // monday of week 1 is in the year, the 1st is in week 53 or 54 of the previous year
        expect(week.monday.getFullYear()).toBe(week.year);
    })
    it("Week 4 of 1989 goes from the 23 to 29 January",()=>{
        const week = new Week(1989,4)
        expect(week.monday.getDay()).toBe(1) // monday
        expect(week.monday.getDate()).toBe(23)
        expect(week.sunday.getDate()).toBe(29)
    })
})