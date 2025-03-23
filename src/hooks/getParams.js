const getQueryParams = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
};

export const getParams = () => {
  const param = getQueryParams(window.location.search);
  return param;
};
