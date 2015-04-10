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
});
