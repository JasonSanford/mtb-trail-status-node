var fs = require('fs');

var cheerio = require('cheerio');
var _       = require('lodash');
var request = require('request');

var tarheelTrails = require('./trails').tarheel;
var models        = require('./db/models');
var utils         = require('./utils');

var tarheelTrailNames = tarheelTrails.map(function (tarheelTrail) {
  return tarheelTrail.name;
});

var tarheelUrl = 'http://www.tarheeltrailblazers.com/';

request(tarheelUrl, function(error, response, body) {
  if (error) { throw error; }
  parsePage(body);
});

function parsePage(pageHtml) {
  //pageHtml = fs.readFileSync('test.html');
  var $        = cheerio.load(pageHtml);
  var $strongs = $('strong');

  var openOrClosedElements = [];

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
      var dateTimeString = $(elem.parent.parent).find('em').text().trim();

      var statusDate = utils.dateTimeStringToDate(dateTimeString);

      // Just double check that we got a valid date. Lots of things can go wrong here.
      if (statusDate.toString() === 'Invalid Date') {
        statusDate = new Date();
      }

      var openOrClosedTrail = {
        name: name,
        status_date: statusDate,
        status: elem.openOrClosed.toLowerCase()
      };

      models.Trail.find({where: {name: openOrClosedTrail.name}})
        .then(function (trail) {
          if (trail.status !== openOrClosedTrail.status) {
            trail.updateAttributes({status: openOrClosedTrail.status, status_date: openOrClosedTrail.status_date})
              .then(function () {
                console.log('Updated trail: ', trail.name);
              });
          }
        });
    }
  });
}
