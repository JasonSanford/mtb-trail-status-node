var Twilio = require('twilio');
var moment = require('moment');

var constants = require('../../constants');

var twilioClient = Twilio(constants.twilio_sid, constants.twilio_token);

module.exports = function(sequelize, DataTypes) {
  var Trail = sequelize.define('Trail', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING
    },
    status_date: {
      type: DataTypes.DATE
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    geojson: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'trails',
    classMethods: {
      associate: function (models) {
        Trail.belongsToMany(models.Phone, {through: 'PhoneTrail', as: 'phones'});
      }
    },
    instanceMethods: {
      statusDateFromNow: function () {
        return moment(this.status_date).fromNow();
      },
      asGeoJSON: function () {
        var featureCollection, inflatedFeatureCollection, geomObj;
        if (this.geojson) {
          featureCollection = JSON.parse(this.geojson);

          return featureCollection;
        } else {
          geomObj = {
            type: 'Point',
            coordinates: [this.longitude, this.latitude]
          };

          return {
            type: 'Feature',
            geometry: geomObj,
            properties: {
              name: this.name,
              'marker-symbol': 'bicycle',
              'marker-size': 'large'
            }
          };
        }
      }
    },
    hooks: {
      beforeUpdate: function (trail) {
        var changedAttrs = trail.changed();
        if (changedAttrs && changedAttrs.indexOf('status') > -1) {
          trail.getPhones()
            .then(function (phones) {
              phones.forEach(function (phone) {
                var to = '+1' + phone.number;
                var message = trail.name + ' is now ' + trail.status + '.';

                twilioClient.sendMessage({
                  to: to,
                  from: constants.twilio_phone_number,
                  body: message
                }, function (error, data) {
                  if (error) {
                    console.log('Error sending message: ' + error);
                  } else {
                    console.log('Successfully send message "' + message + '" to ' + to + '.');
                  }
                });
              });
            });
        }
      }
    }
  });

  return Trail;
};
