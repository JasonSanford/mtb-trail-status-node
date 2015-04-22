var _ = require('lodash');

var sources = require('./sources');

var trails = [
  {
    id: 1,
    name: 'Lake Norman State Park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.67376,
    longitude: -80.93247,
    geojson_url: 'https://raw.githubusercontent.com/JasonSanford/mtb-trails/master/trails/dist/lake_norman_state_park.geojson'
  },
  {
    id: 2,
    name: 'Sherman Branch',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.23751,
    longitude: -80.63225
  },
  {
    id: 3,
    name: 'Fisher Farm Park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.49006,
    longitude: -80.79932
  },
  {
    id: 4,
    name: 'Park Road Park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.15022,
    longitude: -80.85008
  },
  {
    id: 5,
    name: 'Back Yard Trail',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.15778,
    longitude: -80.86292
  },
  {
    id: 6,
    name: 'Col. Francis Beatty Park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.06248,
    longitude: -80.74494
  },
  {
    id: 7,
    name: 'North Mecklenburg Park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.43337,
    longitude: -80.84590
  },
  {
    id: 8,
    name: 'Rocky River Trail',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.31668,
    longitude: -80.53436
  },
  {
    id: 9,
    name: 'Jetton Park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.47649,
    longitude: -80.89985
  },
  {
    id: 10,
    name: 'Harrisburg Half',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.31747,
    longitude: -80.65552
  },
  {
    id: 11,
    name: 'USNWC Trails',
    source: sources.TWITTER,
    latitude: 35.272244,
    longitude: -81.0050142
  }
];

var tarheel = _.filter(trails, function (trail) {
  return trail.source === sources.TARHEEL_TRAILBLAZERS;
});

module.exports = {
  all: trails,
  tarheel: tarheel
};
