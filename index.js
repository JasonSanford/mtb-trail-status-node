var fs = require('fs');

var cheerio = require('cheerio');
var _ = require('lodash');

var tarheelTrails = require('./trails').tarheel;
var tarheelTrailNames = tarheelTrails.map(function (tarheelTrail) {
  return tarheelTrail.name;
});

var html = fs.readFileSync('test.html');
var $ = cheerio.load(html);
var $strongs = $('strong');

var openOrClosedElements = [];

var openTrails   = [];
var closedTrails = [];

$strongs.each(function (i, elem) {
  var hasOpenOrClosed = ['Open', 'Closed'].indexOf(elem.children[0].data) > -1;

  if (hasOpenOrClosed) {
    elem.openOrClosed = elem.children[0].data;
    openOrClosedElements.push(elem);
  }
});

openOrClosedElements.forEach(function (elem) {
  var name = $(elem.parent.parent.parent.parent.parent.parent).prev('tr').find('td > b').text();
  //                font   td     tr     table  td     tr

  var isInWhiteList = tarheelTrailNames.indexOf(name) > -1;

  if (isInWhiteList) {
    var dateTimeString = $(elem.parent.parent).find('em').text();

    var trail = {
      name:           name,
      dateTimeString: dateTimeString
    };

    if (elem.openOrClosed === 'Open') {
      openTrails.push(trail);
    } else {
      closedTrails.push(trail);
    }
  }
});

console.log('Open: ');
openTrails.forEach(function (open) {
  console.log(open.name);
});

console.log('Closed: ');
closedTrails.forEach(function (open) {
  console.log(open.name);
});