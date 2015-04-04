var express = require('express');

var models = require('./db/models');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static('assets'));

app.get('/', function (req, res) {
  models.Trail.findAll({order: [['status', 'DESC']]})
    .then(function (trails) {
      res.render('index', {trails: trails});
    });
});

var phoneNumberUrl = '/:phone_number(\\d{10})/';

app.get(phoneNumberUrl, handlePhoneFormRequest);

app.post(phoneNumberUrl, handlePhoneFormRequest);

function handlePhoneFormRequest (req, res) {
  models.Phone
    .findOrCreate({where: {number: req.params.phone_number}})
    .spread(function (phone, created) {
      phone.getTrails()
        .then(function (phoneTrails) {
          var phoneTrailsIds = phoneTrails.map(function (phoneTrail) {
            return phoneTrail.id;
          });
          models.Trail.all()
            .then(function (allTrails) {
              var formTrails = allTrails.map(function (allTrail) {
                if (phoneTrailsIds.indexOf(allTrail.id) > -1) {
                  allTrail.stored = true;
                }
                return allTrail;
              });
              res.render('form', {created: created, formTrails: formTrails});
            })
        })
        .catch(function (error) {
          res.send('Error: ' + error);
        });
    })
    .catch(function (error) {
      res.send('Error: ' + error);
    });
}

var port = Number(process.env.PORT || 5000);

var server = app.listen(port, function () {
  console.log('Example app listening on port: ', port);
});
