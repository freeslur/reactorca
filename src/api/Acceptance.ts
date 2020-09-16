import { axios_base } from '../api/DefaultCRUD';

// axios.defaults.withCredentials = true;
const client = axios_base();

const double_digit = (arg: number) => {
  return arg < 10 ? '0' + arg.toString() : arg.toString();
};

export const date_to_string = (date: Date | null) => {
  if (date === null) return '';
  const yyyy = date.getFullYear().toString();
  const MM = double_digit(date.getMonth() + 1);
  const dd = double_digit(date.getDate());
  return yyyy + '-' + MM + '-' + dd;
};

export const getAcceptances = (acc_date: Date | null) => {
  return client.post('/acceptances', {
    acceptance_date: date_to_string(acc_date),
  });
};

export const cancelAcceptance = (
  acc_date: string,
  acc_id: string,
  acc_time: string,
  pati_id: string
) => {
  return client.post('/acceptances/cancel', {
    acc_date: acc_date,
    acc_id: acc_id,
    acc_time: acc_time,
    pati_id: pati_id,
  });
};

export const sendReceipt = (data: any) => {
  const sendData = { default: data, medical: {} };
  return client.post('/acceptances/send', sendData);
};
