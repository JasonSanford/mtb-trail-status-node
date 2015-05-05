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
    display_name: {
      type: DataTypes.STRING
    },
    slug: {
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
    geojson_url: {
      type: DataTypes.STRING
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
        return {
          id: this.id,
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [this.longitude, this.latitude]
          },
          properties: {
            name: this.name,
            display_name: this.displayName(),
            path: this.path(),
            status: this.status,
            status_date_string: this.statusDateFromNow(),
            has_geojson: this.geojson_url ? true : false,
            'marker-symbol': 'bicycle'
          }
        };
      },
      url: function () {
        var baseUrl = constants.development ? 'http://localhost:5000' : 'http://mtbtrailstat.us';
        return baseUrl + this.path();
      },
      path: function () {
        return '/trails/' + this.slug;
      },
      displayName: function () {
        return this.display_name || this.name;
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
                var message = trail.displayName() + ' is now ' + trail.status + '. ' + trail.url();

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
