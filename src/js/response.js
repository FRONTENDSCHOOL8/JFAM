const END_POINT = 'https://jsonplaceholder.typicode.com/users';

const defaultOptions = {
  method: 'GET',
  body: null,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export const manageData = async (options) => {
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, restOptions);

  if (response.ok) {
    response.data = await response.json();
  }
  return response;
};

manageData.get = (url, options) =>
  manageData({
    url,
    ...options,
  });
manageData.post = (url, body, options) =>
  manageData({
    method: 'POST',
    url,
    body: JSON.stringify(body),
    ...options,
  });
manageData.delete = (url, options) =>
  manageData({
    method: 'DELETE',
    url,
    ...options,
  });
manageData.put = (url, body, options) =>
  manageData({
    method: 'PUT',
    url,
    body: JSON.stringify(body),
    ...options,
  });
export default manageData;
