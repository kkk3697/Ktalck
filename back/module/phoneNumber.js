const PhoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil;
const PNF = require('google-libphonenumber').PhoneNumberFormat;

const phoneNumberUtil = PhoneNumberUtil.getInstance();

function formatPhoneNumber(phoneNumber, countryCode) {
  try {
    const parsed = phoneNumberUtil.parse(phoneNumber, countryCode);
    if (phoneNumberUtil.isValidNumber(parsed)) {
      return phoneNumberUtil.format(parsed, PNF.INTERNATIONAL);
    }
  } catch (error) {
    console.error(`전화번호 형식 오류: ${error}`);
    return null;
  }
  return null;
}

module.exports = {
  formatPhoneNumber,
};
