export const isServer = () => typeof window === 'undefined';

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const getFormData = (obj) =>
  Object.keys(obj).reduce((formData, key) => {
    formData.append(key, obj[key]);
    return formData;
  }, new FormData());
