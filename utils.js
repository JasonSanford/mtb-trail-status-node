//  03/30/15 5:30pm

function dateTimeStringToDate (dateTimeString) {
  try {
    //
    // Given a string like "03/24/15 08:30", "03/21/15 12:40 pm" or "03/21/15 1pm"
    // return a Date
    //
    var date = new Date(dateTimeString);

    if (date.toString() === 'Invalid Date') {
      //
      // "03/21/15 1pm", "03/22/15 6:00am"
      var dateTimeStringParts = dateTimeString.split(' ');
      var dateString          = dateTimeStringParts[0];
      var dateStringParts     = dateString.split('/');

      var month = parseInt(dateStringParts[0], 10) - 1;  // JavaScript uses a 0-based index for months
      var day   = parseInt(dateStringParts[1], 10);
      var year  = 2000 + parseInt(dateStringParts[2], 10);

      if (dateTimeStringParts.length === 2) {
        var timeString = dateTimeStringParts[1];
        var amParts    = timeString.split('am');
        var pmParts    = timeString.split('pm');

        var timeParts;
        if (amParts.length === 2) {
          if (amParts[0].indexOf(':') > -1) {
            timeParts = amParts[0].split(':');
            return new Date(year, month, day, timeParts[0], timeParts[1]);
          } else {
            return new Date(year, month, day, amParts[0]);
          }
        } else if (pmParts.length === 2) {
          var hours;
          if (pmParts[0].indexOf(':') > -1) {
            timeParts = pmParts[0].split(':');
            hours = parseInt(timeParts[0], 10) + 12;
            return new Date(year, month, day, hours, timeParts[1]);
          } else {
            hours = pmParts[0] + 12;
            return new Date(year, month, day, hours);
          }
        } else {
          return new Date(year, month, day);
        }
      } else {
        //
        // Don't waste any time trying to parse the billion different ways the
        // time could be formatted, just use the date
        //
        return new Date(year, month, day);
      }
    } else {
      //
      // Sometimes the date can be parsed: "03/24/15 08:30", "03/21/15 12:40 pm"
      //
      return date;
    }
  } catch (ex) {
    //
    // Never fail. Return now() at least.
    //
    return new Date();
  }
}

module.exports = {
  dateTimeStringToDate: dateTimeStringToDate
};
