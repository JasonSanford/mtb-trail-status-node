var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var request = require('request');

var models = require('./db/models');

var app = express();
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ cookie: { maxAge: 60000 }, secret: 'whatever'}));
app.use(flash());

function render404 (req, res) {
  res.status(404);
  res.render('404');
}

app.post('/twilio', function (req, res) {
  console.log(JSON.stringify(req.body));
});

app.use('/trails/:slug', function (req, res, next) {
  var slug = req.params.slug;

  if (!slug) {
    render404(req, res);
    return;
  }

  // For some reason /trails/trail-name.geojson gets passed with '.geojson' in the slug
  // TODO: There's probably a better way
  if (slug.indexOf('.') > -1) {
    slug = slug.split('.')[0];
  }

  models.Trail.find({where: {slug: slug}})
    .then(function (trail) {
      if (trail) {
        req.trail = trail;
        next();
      } else {
        render404(req, res);
      }
    });
});

app.get('/trails/:slug.geojson', function (req, res) {
  var githubRequest = request(req.trail.geojson_url);
  req.pipe(githubRequest);
  githubRequest.pipe(res);
});

app.get('/trails/:slug', function (req, res) {
  res.render('trail', {
    trail: req.trail,
    map: true,
    bodyClass: 'fullscreen trail'
  });
});

app.use('/', function (req, res, next) {
  models.Trail.findAll({order: [['status', 'DESC'], ['name', 'ASC']]})
    .then(function (trails) {
      req.trails = trails;
      next();
    });
});

app.get('/', function (req, res) {
  res.render('index', {
    trails: req.trails,
    currentPage: 'home',
    bodyClass: 'index',
    map: true
  });
});

app.get('/trails.geojson', function (req, res) {
  var featureCollection = {
    type: 'FeatureCollection',
    features: req.trails.map (function (trail) {
      var feature = trail.asGeoJSON();
      feature.properties['marker-color'] = trail.status === 'open' ? '#060' : '#900';
      return feature;
    })
  };

  res.json(featureCollection);
});

app.get('/about', function (req, res) {
  res.render('about', {currentPage: 'about'});
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
          models.Trail.all({order: [['name', 'ASC']]})
            .then(function (allTrails) {
              if (req.method === 'GET') {
                var formTrails = allTrails.map(function (allTrail) {
                  if (phoneTrailsIds.indexOf(allTrail.id) > -1) {
                    allTrail.stored = true;
                  }
                  return allTrail;
                });
                res.render('form', {
                  formTrails: formTrails,
                  bodyClass: 'form'
                });
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
