var express = require('express');
var jade    = require('jade');

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

var port = Number(process.env.PORT || 5000);

var server = app.listen(port, function () {
  console.log('Example app listening on port: ', port);
});
