var utils = require('./utils');

if ($('body.index').length > 0) {
  var $form = $('.form-phone');
  var $inputPhone = $('.input-phone');

  var map;
  var mapShown = false;

  $form.on('submit', function (event) {
    event.preventDefault();
    var phoneNumber = $inputPhone.val();
    phoneNumber = utils.sanitizePhoneNumber(phoneNumber);

    if (utils.isValidPhoneNumber(phoneNumber)) {
      window.location.href = '/' + phoneNumber;
    } else {
      window.alert('That phone number doesn\'t look right.');
    }
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    if ($(e.target).attr('href') === '#tab-map') {
      if (mapShown) {
        map.invalidateSize();
      } else {
        L.mapbox.accessToken = 'pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6InRJMHZPZFUifQ.F4DMGoNgU3r2AWLY0Eni-w';
        var pointGeojsonLayer = L.geoJson(mtb.trail, {
          pointToLayer: L.mapbox.marker.style
        });
        map = L.mapbox.map('map', 'jcsanford.41fa2f6c', {zoomControl: false});
        map.addLayer(pointGeojsonLayer);
        map.setView(L.latLng(35.228082,-80.8442896), 9);
        mapShown = true;

        var lineGeojsonLayer = L.geoJson(null, {
          pointToLayer: L.mapbox.marker.style,
          onEachFeature: function (feature, layer) {
            var p = feature.properties;
            var popupHtml = [
              '<h2><a href="/trails/' + feature.id + '">' + p.name + '</a></h2>',
              '<h3>' + p.status + ' - ' + p.status_date_string + '</h3>'
            ];
            layer.bindPopup(popupHtml.join(''));
          }
        });
        lineGeojsonLayer.addTo(map);

        $.ajax({
          url: '/trails.geojson',
          success: function (data) {
            lineGeojsonLayer.addData(data);
            map.fitBounds(lineGeojsonLayer.getBounds());
          },
          error: function (jqXHR, status, error) {
            console.log('Error fetching trail GeoJSON: ' + error);
          }
        });
      }
    }
  });
}

if ($('body.trail').length > 0) {
  L.mapbox.accessToken = 'pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6InRJMHZPZFUifQ.F4DMGoNgU3r2AWLY0Eni-w';
  var pointGeojsonLayer = L.geoJson(mtb.trail, {
    pointToLayer: L.mapbox.marker.style
  });
  var map = L.mapbox.map('map', 'jcsanford.41fa2f6c', {zoomControl: false});
  map.addLayer(pointGeojsonLayer);
  map.setView(L.latLng(mtb.trail.geometry.coordinates[1], mtb.trail.geometry.coordinates[0]), 13);

  if (mtb.trail.properties.has_geojson) {
    var lineGeojsonLayer = L.geoJson(null, {
      style: L.mapbox.simplestyle.style
    });
    lineGeojsonLayer.addTo(map);

    $.ajax({
      url: '/trails/' + mtb.trail.id + '.geojson',
      success: function (data) {
        lineGeojsonLayer.addData(data);
        map.fitBounds(lineGeojsonLayer.getBounds());
      },
      error: function (jqXHR, status, error) {
        console.log('Error fetching trail GeoJSON: ' + error);
      }
    });
  }
}
