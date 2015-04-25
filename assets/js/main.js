var $form = $('.form-phone');

var $inputPhone = $('.input-phone');

$form.on('submit', function (event) {
  event.preventDefault();
  var phoneNumber = $inputPhone.val();
  phoneNumber = sanitizePhoneNumber(phoneNumber);

  if (isValidPhoneNumber(phoneNumber)) {
    window.location.href = '/' + phoneNumber;
  } else {
    window.alert('That phone number doesn\'t look right.');
  }
});

function sanitizePhoneNumber (phone) {
  var sanitized = phone.replace(/-/g, '');
  sanitized = sanitized.replace(/ /g, '');
  sanitized = sanitized.replace(/\./g, '');
  sanitized = sanitized.trim();
  return sanitized;
}

function isValidPhoneNumber (phoneNumber) {
  return phoneNumber.length === 10;
}

if (mtb.trail) {
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
