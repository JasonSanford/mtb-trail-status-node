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

module.exports = {
  sanitizePhoneNumber: sanitizePhoneNumber,
  isValidPhoneNumber: isValidPhoneNumber
};
