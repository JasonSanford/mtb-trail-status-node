var express = require('express');
var flash = require('express-flash');
var session = require('express-session');

var models = require('./db/models');

var app = express();
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ cookie: { maxAge: 60000 }, secret: 'whatever'}));
app.use(flash());

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
              if (req.method === 'GET') {
                var formTrails = allTrails.map(function (allTrail) {
                  if (phoneTrailsIds.indexOf(allTrail.id) > -1) {
                    allTrail.stored = true;
                  }
                  return allTrail;
                });
                res.render('form', {formTrails: formTrails});
              } else {
                var checkedIds = Object.keys(req.body).map(function (stringId) {
                  return parseInt(stringId, 10);
                });
                updatePhoneTrails(phone, phoneTrails, checkedIds, function (error) {
                  if (error) {
                    res.send('Error: ' + error);
                  } else {
                    req.flash('success', 'Your trail message alert settings were updated.');
                    res.redirect('/' + req.params.phone_number);
                  }
                });
              }
            })
            .catch(function (error) {
              res.send('Error: ' + error);
            });
        })
        .catch(function (error) {
          res.send('Error: ' + error);
        });
    })
    .catch(function (error) {
      res.send('Error: ' + error);
    });
}

function updatePhoneTrails(phone, phoneTrails, checkedIds, callback) {
  // Delete current PhoneTrails that aren't checked
  phoneTrails.forEach(function (phoneTrail) {
    if (checkedIds.indexOf(phoneTrail.id) < 0) {
      phone.removeTrail(phoneTrail);
    }
  });

  // Add new PhoneTrails if they don't already exist
  checkedIds.forEach(function (checkedId) {
    phone.hasTrail(checkedId)
      .then(function (hasTrail) {
        if (!hasTrail) {
          phone.addTrail(checkedId);
        }
      });
  });
  callback(null);
}

var port = Number(process.env.PORT || 5000);

var server = app.listen(port, function () {
  console.log('Example app listening on port: ', port);
});
