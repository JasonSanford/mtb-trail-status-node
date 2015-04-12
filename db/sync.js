#!/usr/bin/env node

var trails = require('../trails').all;
var models = require('./models');

var sequelize = models.sequelize;

sequelize.sync({force: true}).then(function () {
  trails.forEach(function (trail) {
    models.Trail.create(trail).then(function () {
      console.log('Trail created: ', trail.name);
    }).catch(function (error) {
      throw error;
    });
  });
});
