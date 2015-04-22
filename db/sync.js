#!/usr/bin/env node

var request = require('request');

var trails = require('../trails').all;
var models = require('./models');

var sequelize = models.sequelize;

sequelize.sync({force: true}).then(function () {
  trails.forEach(function (trail) {
    models.Trail.create(trail).then(function (createdTrail) {
      console.log('Trail created: ', trail.name);

      if (trail.geojson_url) {
        console.log('Fetching GeoJSON for trail ', trail.name);
        request(trail.geojson_url, function (error, response, body) {
          if (error) throw error;
          createdTrail.geojson = body;
          createdTrail.save();
        });
      }
    }).catch(function (error) {
      throw error;
    });
  });
});
