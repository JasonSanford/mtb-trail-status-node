var _ = require('lodash');

var sources = require('./sources');

var trails = [
  {
    id: 1,
    name: 'Lake Norman State Park',
    slug: 'lake-norman-state-park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.67376,
    longitude: -80.93247,
    geojson_url: 'http://jasonsanford.github.io/mtb-trails/trails/dist/lake_norman_state_park.geojson'
  },
  {
    id: 2,
    name: 'Sherman Branch',
    slug: 'sherman-branch',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.23751,
    longitude: -80.63225
  },
  {
    id: 3,
    name: 'Fisher Farm Park',
    slug: 'fisher-farm-park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.49006,
    longitude: -80.79932
  },
  {
    id: 4,
    name: 'Park Road Park',
    slug: 'park-road-park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.15022,
    longitude: -80.85008
  },
  {
    id: 5,
    name: 'Back Yard Trail',
    display_name: 'Back Yard',
    slug: 'back-yard',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.15778,
    longitude: -80.86292
  },
  {
    id: 6,
    name: 'Col. Francis Beatty Park',
    display_name: 'Colonel Francis Beatty Park',
    slug: 'colonel-francis-beatty-park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.06248,
    longitude: -80.74494
  },
  {
    id: 7,
    name: 'North Mecklenburg Park',
    slug: 'north-mecklenburg-park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.43337,
    longitude: -80.84590
  },
  {
    id: 8,
    name: 'Rocky River Trail',
    display_name: 'Rocky River',
    slug: 'rocky-river',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.31668,
    longitude: -80.53436
  },
  {
    id: 9,
    name: 'Jetton Park',
    slug: 'jetton-park',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.47649,
    longitude: -80.89985
  },
  {
    id: 10,
    name: 'Harrisburg Half',
    slug: 'harrisburg-half',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.31747,
    longitude: -80.65552
  },
  {
    id: 11,
    name: 'USNWC Trails',
    slug: 'us-national-whitewater-center',
    display_name: 'US National Whitewater Center',
    source: sources.TWITTER,
    latitude: 35.272244,
    longitude: -81.0050142
  },
  {
    id: 12,
    name: 'Rocky Branch Trail',
    display_name: 'Rocky Branch',
    slug: 'rocky-branch',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.2449197,
    longitude: -81.0479374
  },
  {
    id: 13,
    name: 'Signal Hill',
    slug: 'signal-hill',
    source: sources.TARHEEL_TRAILBLAZERS,
    latitude: 35.7956417,
    longitude: -80.85445
  }
];

var tarheel = _.filter(trails, function (trail) {
  return trail.source === sources.TARHEEL_TRAILBLAZERS;
});

module.exports = {
  all: trails,
  tarheel: tarheel
};
