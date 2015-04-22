$(function () {
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
    var geojsonLayer = L.geoJson(mtb.trail, {
      pointToLayer: L.mapbox.marker.style,
      style: L.mapbox.simplestyle.style
    });
    var map = L.mapbox.map('map-container', 'jcsanford.41fa2f6c');
    map.addLayer(geojsonLayer);

    if (mtb.trail.type === 'FeatureCollection') {
      map.fitBounds(geojsonLayer.getBounds());
    } else {
      map.setView(L.latLng(mtb.trail.geometry.coordinates[1], mtb.trail.geometry.coordinates[0]), 13);
    }
  }
});
