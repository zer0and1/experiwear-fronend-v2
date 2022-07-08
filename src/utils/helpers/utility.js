import _ from 'lodash';

export const isServer = () => typeof window === 'undefined';

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

/**
 * Make form data from ordinary object
 * @param {object} data - source object to make FormData
 * @return {FormData} formdata
 */
export const getFormData = (obj) => {
  return Object.keys(obj).reduce((formData, key) => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((el) => formData.append(`${key}`, el));
    } else {
      formData.append(key, obj[key]);
    }
    return formData;
  }, new FormData());
};

/**
 * Find difference between two objects
 * @param  {object} origObj - Source object to compare newObj against
 * @param  {object} newObj  - New object with potential changes
 * @return {object} differences
 */
export const difference = (origObj, newObj) => {
  const changes = (newObj, origObj) => {
    let arrayIndexCounter = 0;
    return _.transform(newObj, (result, value, key) => {
      if (!_.isEqual(value, origObj[key])) {
        let resultKey = _.isArray(origObj) ? arrayIndexCounter++ : key;
        result[resultKey] =
          _.isObject(value) && _.isObject(origObj[key])
            ? changes(value, origObj[key])
            : value;
      }
    });
  };
  return changes(newObj, origObj);
};

/**
 * Format phone number only with numbers beginning with `+` symbol
 * @param  {string} phone - Phone number string to format
 * @return {string} foramtted phone number string
 */
export const formatPhone = (phone) => {
  return phone && phone.match(/\d+/g).reduce((acc, t) => acc + t, '+');
};

/**
 * Extract host address from url
 * @param  {string} url - url string to extract host address
 * @return {string} host address
 */
export const extractHostAddr = (url) => {
  return url && url.split('://')[1].split('/')[0];
};

/**
 * Navigate to path using location of browser window
 * @param {string} pathname - Pathname to navigate to
 */
export const navigateTo = (pathname) => {
  const { protocol, hostname, port } = window.location;
  window.location.href = `${protocol}//${hostname}${
    port && ':' + port
  }/${pathname}`;
};
