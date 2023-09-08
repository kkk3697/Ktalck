const countryList = require('country-list'); //국가 관련 코드 
const PhoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil;
const phoneNumberUtil = PhoneNumberUtil.getInstance();
const PNC = require('google-libphonenumber').PhoneNumberType;

function getCountryCodes() {
  const supportedRegions = phoneNumberUtil.getSupportedRegions();
  return supportedRegions.map(region => {
    if (!region || region === 'TA') return null;

    const countryName = countryList.getName(region);
    let callingCode;
    try {
      const exampleNumber = phoneNumberUtil.getExampleNumberForType(region, PNC.MOBILE);
      if (exampleNumber) {
        callingCode = exampleNumber.getCountryCode();
        console.log("getCountryCodes 함수가 호출됨");
        console.log("supportedRegions:", supportedRegions);
      } else {
        callingCode = 'Unknown';
      }
    } catch (error) {
      console.error(`Error fetching calling code for region ${region}: ${error}`);
      callingCode = 'Unknown';
    }

    return { code: region, name: countryName, callingCode: `+${callingCode}` };
  }).filter(item => item !== null);
}

module.exports = {
  getCountryCodes,
};
