var _ = require('lodash');

var sources = require('./sources');

var trails = [
  {
    id: 1,
    name: 'Lake Norman State Park',
    source: sources.TARHEEL_TRAILBLAZERS
  },
  {
    id: 2,
    name: 'Sherman Branch',
    source: sources.TARHEEL_TRAILBLAZERS
  },
  {
    id: 3,
    name: 'Fisher Farm Park',
    source: sources.TARHEEL_TRAILBLAZERS
  },
  {
    id: 4,
    name: 'Park Road Park',
    source: sources.TARHEEL_TRAILBLAZERS
  },
  {
    id: 5,
    name: 'Back Yard Trail',
    source: sources.TARHEEL_TRAILBLAZERS
  },
  {
    id: 6,
    name: 'Col. Francis Beatty Park',
    source: sources.TARHEEL_TRAILBLAZERS
  },
  {
    id: 7,
    name: 'North Mecklenburg Park',
    source: sources.TARHEEL_TRAILBLAZERS
  },
  {
    id: 8,
    name: 'Rocky River Trail',
    source: sources.TARHEEL_TRAILBLAZERS
  },
  {
    id: 9,
    name: 'Jetton Park',
    source: sources.TARHEEL_TRAILBLAZERS
  },
  {
    id: 10,
    name: 'Harrisburg Half',
    source: sources.TARHEEL_TRAILBLAZERS
  }
];

var tarheel = _.filter(trails, function (trail) {
  return trail.source === sources.TARHEEL_TRAILBLAZERS;
});

module.exports = {
  all: trails,
  tarheel: tarheel
};
