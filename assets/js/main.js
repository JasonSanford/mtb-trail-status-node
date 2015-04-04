$(function () {
  $('.input-phone').on('keyup', updatePhoneLink);

  function updatePhoneLink (event) {
    var $target = $(event.target);
    var phone = $target.val();
    var phone = sanitizePhoneNumber(phone);
    var phoneFormUrl = '/' + phone;
    $('.link-phone').attr('href', phoneFormUrl);
  }

  function sanitizePhoneNumber (phone) {
    var sanitized = phone.replace(/-/g, '');
    sanitized = sanitized.replace(/ /g, '');
    sanitized = sanitized.replace(/\./g, '');
    return sanitized;
  }
});
