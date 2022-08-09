# Epoq

### Epoq is two classes to help tame excess precision in the Date object.

`DateWithoutTime` implements a "whole date", keeping you from having to worry about javascript's implicit
introduction of timezones.

`Week` implements the notion of an integer week since the epoch, easily convertible to a Date(), with methods
to convert to and from week of year.

As such, days and weeks can be sequential whole numbers in your application and in your database.


