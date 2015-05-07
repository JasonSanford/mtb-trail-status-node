function sanitizePhoneNumber (phone) {
  var sanitized = phone.replace(/-/g, '');
  sanitized = sanitized.replace(/ /g, '');
  sanitized = sanitized.replace(/\./g, '');
  sanitized = sanitized.trim();
  return sanitized;
}

function isAllDigits (val) {
  return (/^[0-9]+$/).test(val);
}

function isValidPhoneNumber (phoneNumber) {
  return phoneNumber.length === 10 && isAllDigits(phoneNumber);
}

module.exports = {
  sanitizePhoneNumber: sanitizePhoneNumber,
  isValidPhoneNumber: isValidPhoneNumber
};
