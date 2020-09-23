import axiosBase from 'axios';

export const server_url = 'http://127.0.0.1:5000/api';
// export const server_url = 'http://192.168.0.102:5000/api';
// export const server_url = 'http://192.168.8.84:5000/api';

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
