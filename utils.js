function dateTimeStringToDate (dateTimeString) {
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

    //
    // Don't waste any time trying to parse the billion different ways the
    // time could be formatted, just use the date
    //
    return new Date(year, month, day);
  } else {
    //
    // Sometimes the date can be parsed: "03/24/15 08:30", "03/21/15 12:40 pm"
    //
    return date;
  }
}

module.exports = {
  dateTimeStringToDate: dateTimeStringToDate
};
