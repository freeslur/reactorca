import { axios_base } from '../api/DefaultCRUD';
import { date_to_string } from '../utils/utils';

// axios.defaults.withCredentials = true;
const client = axios_base();

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

export const setAccDate = (acc_date: string) => {
  return client.post('/acc_date/' + acc_date);
};

export const sendReceipt = (data: any) => {
  const u_time = Date.parse(
    data['Acceptance_Date'] + 'T' + data['Acceptance_Time']
  );
  const performTime = new Date(u_time + 3600000);
  const sendData = {
    default: data,
    perform: {
      Perform_Date: data['Acceptance_Date'],
      Perform_Time: performTime.toLocaleTimeString(),
    },
    medical: {
      Medical_Information: [
        {
          Medical_Class: '120',
          Medical_Class_Name: '再診',
          Medical_Class_Number: '1',
          Medication_info: [
            {
              Medication_Code: '112007410',
              Medication_Name: '再診',
              Medication_Number: '1',
              Medication_Generic_Flg: '',
            },
          ],
        },
        {
          Medical_Class: '210',
          Medical_Class_Name: '内服薬剤',
          Medical_Class_Number: '1',
          Medication_info: [
            {
              Medication_Code: '620001402',
              Medication_Name: 'グリセリン',
              Medication_Number: '2',
              Medication_Generic_Flg: 'yes',
            },
          ],
        },
        {
          Medical_Class: '500',
          Medical_Class_Name: '手術',
          Medical_Class_Number: '1',
          Medication_info: [
            {
              Medication_Code: '150003110',
              Medication_Name:
                '皮膚、皮下腫瘍摘出術（露出部）（長径２ｃｍ未満）',
              Medication_Number: '1',
              Medication_Generic_Flg: '',
            },
            {
              Medication_Code: '641210099',
              Medication_Name: 'キシロカイン注射液１％',
              Medication_Number: '3',
              Medication_Generic_Flg: '',
            },
            {
              Medication_Code: '840000042',
              Medication_Name: '手術○日',
              Medication_Number: '15',
              Medication_Generic_Flg: '',
            },
          ],
        },
      ],
      Disease_Information: [
        {
          Disease_Code: '8830052',
          Disease_Name: 'ＡＣバイパス術後機械的合併症',
          Disease_SuspectedFlag: 'S',
          Disease_StartDate: '2020-08-23',
          Disease_EndDate: '2020-08-24',
          Disease_OutCome: 'D',
        },
        {
          Disease_InOut: '0',
          Disease_Single: [
            { Disease_Single_Code: '830417', Disease_Single_Name: '' },
            { Disease_Single_Code: 'ZZZ8002', Disease_Single_Name: 'の疑い' },
          ],
          Disease_StartDate: '2020-07-23',
          Disease_EndDate: '2020-07-24',
          Disease_OutCome: 'D',
        },
      ],
    },
  };
  return client.post('/acceptances/send', sendData);
};
