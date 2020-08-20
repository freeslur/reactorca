import axiosBase from 'axios';

export const server_url = 'http://192.168.8.94:5000/api';

export const axios_base = () => {
  return axiosBase.create({
    baseURL: server_url,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'text',
  });
};
