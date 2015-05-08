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
              '<h2><a href="' + feature.properties.path + '">' + p.display_name + '</a></h2>',
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

  var defaultTrailStyle = {
    color: '#0b6121',
    weight: 4,
    opacity: 0.7
  };

  var selectedStyle = {
    color: '#f00'
  };

  if (mtb.trail.properties.has_geojson) {
    map.on('click', function () {
      setLoopSelected();
    });

    $('.meta').on('click', 'a.back', function (event) {
      event.preventDefault();
      setLoopSelected();
    });

    var geojsonLayer = L.geoJson(null, {
      style: $.extend({}, defaultTrailStyle),
      onEachFeature: function (feature, layer) {
        layer.on('click', function (event) {
          setLoopSelected(feature, layer);
        });
      }
    });
    geojsonLayer.addTo(map);

    var setLoopSelected = function (feature, layer) {
      geojsonLayer.eachLayer(function (layer) {
        layer.setStyle($.extend({}, defaultTrailStyle));
      });
      if (feature && layer) {
        layer.setStyle($.extend({}, selectedStyle));
        map.fitBounds(layer.getBounds());

        var loopHtml = '<a class="back" href="#back"><i class="glyphicon glyphicon-chevron-left"></i></a>';
        loopHtml += feature.properties.name;
        if (feature.properties.distance_miles) {
          loopHtml += '<small>&nbsp;' + feature.properties.distance_miles + ' mi.</small>';
        }

        $('.meta').find('.trail').hide();
        $('.meta').find('.loop').show().find('.name').html(loopHtml).show();
      } else {
        $('.meta').find('.loop').hide();
        $('.meta').find('.trail').show();
      }
    };

    $.ajax({
      url: mtb.trail.properties.path + '.geojson',
      success: function (data) {
        geojsonLayer.addData(data);
        map.fitBounds(geojsonLayer.getBounds());
      },
      error: function (jqXHR, status, error) {
        console.log('Error fetching trail GeoJSON: ' + error);
      }
    });
  }
}
