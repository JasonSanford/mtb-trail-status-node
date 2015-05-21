#!/usr/bin/env node

var request = require('request');
var _ = require('lodash');

var trails = require('../trails').all;
var models = require('./models');

var sequelize = models.sequelize;

sequelize.sync().then(function () {
  trails.forEach(function (trail) {
    var where = {
      id: trail.id
    };

    var defaults = _.clone(trail);
    delete defaults.id;

    models.Trail.findOrCreate({where: where, defaults: defaults}).spread(function (foundOrCreatedTrail, created) {
      if (created) {
        console.log('Trail created: ', trail.name);
      } else {
        console.log('Trail found: ', trail.name);
      }
    }).catch(function (error) {
      throw error;
    });
  });
});
