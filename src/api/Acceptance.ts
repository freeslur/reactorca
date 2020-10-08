import { axios_base } from '../api/DefaultCRUD';
import { date_to_string } from '../utils/utils';

// axios.defaults.withCredentials = true;
const client = axios_base();
const pati03 = {
  Patient_ID: '00003',
  Department_Code: '01',
  Physician_Code: '10005',
  HealthInsurance_Information: {
    Certificate_ExpiredDate: '9999-12-31',
    Certificate_StartDate: '2010-01-31',
    HealthInsuredPerson_Number: '６０',
    HealthInsuredPerson_Symbol: '３３３',
    HealthInsuredPerson_WholeName: '事例　十四',
    InsuranceCombination_Rate_Admission: '0.30',
    InsuranceCombination_Rate_Outpatient: '0.30',
    InsuranceProvider_Class: '032',
    InsuranceProvider_Number: '32130213',
    InsuranceProvider_WholeName: '地公',
    Insurance_CheckDate: '2014-04-16',
    Insurance_Combination_Number: '0001',
    Insurance_Nondisplay: 'N',
    RelationToInsuredPerson: '2',
  },
};
const pati07 = {
  Patient_ID: '00007',
  Department_Code: '01',
  Physician_Code: '10005',
  HealthInsurance_Information: {
    InsuranceCombination_Rate_Admission: '0.00',
    InsuranceCombination_Rate_Outpatient: '0.00',
    Insurance_Combination_Number: '0001',
    Insurance_Nondisplay: 'N',
    PublicInsurance_Information: [
      {
        Certificate_CheckDate: '2014-04-04',
        Certificate_ExpiredDate: '9999-12-31',
        Certificate_IssuedDate: '2009-01-10',
        Money_Admission: '0',
        Money_Outpatient: '0',
        PublicInsurance_Class: '012',
        PublicInsurance_Name: '生活保護',
        PublicInsuredPerson_Number: '0045971',
        PublicInsurer_Number: '12132379',
        Rate_Admission: '0.00',
        Rate_Outpatient: '0.00',
      },
    ],
  },
};
const pati08 = {
  Patient_ID: '00008',
  Department_Code: '01',
  Physician_Code: '10006',
  HealthInsurance_Information: {
    Accident_Insurance_Information: {
      Accident_Insurance_WholeName: '自賠責保険',
      Disease_Date: '2016-04-12',
      Disease_Location: '右足関節、右手',
      Liability_Insurance_Office_Name: '○○損害保険',
    },
    Certificate_ExpiredDate: '9999-12-31',
    Certificate_StartDate: '2016-04-12',
    HealthInsuredPerson_Number: '右足関節、右手',
    HealthInsuredPerson_Symbol: '自賠責保険',
    InsuranceCombination_Rate_Admission: '0.00',
    InsuranceCombination_Rate_Outpatient: '0.00',
    InsuranceProvider_Class: '973',
    InsuranceProvider_WholeName: '自賠責保険',
    Insurance_Combination_Number: '0004',
    Insurance_Nondisplay: 'N',
  },
};
const pati10 = {
  Patient_ID: '00010',
  Department_Code: '01',
  Physician_Code: '10005',
  HealthInsurance_Information: {
    Certificate_ExpiredDate: '9999-12-31',
    Certificate_StartDate: '2014-04-25',
    HealthInsuredPerson_Assistance: '1',
    HealthInsuredPerson_Assistance_Name: '課税',
    HealthInsuredPerson_WholeName: '事例　十',
    InsuranceCombination_Rate_Admission: '1.00',
    InsuranceCombination_Rate_Outpatient: '1.00',
    InsuranceProvider_Class: '980',
    InsuranceProvider_WholeName: '自費',
    Insurance_CheckDate: '2014-04-25',
    Insurance_Combination_Number: '0001',
    Insurance_Nondisplay: 'N',
    RelationToInsuredPerson: '1',
  },
};
const medicalInfo = {
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
          Medication_Name: '皮膚、皮下腫瘍摘出術（露出部）（長径２ｃｍ未満）',
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
    medical: medicalInfo,
  };

  return client.post('/acceptances/send', sendData);
};

export const sendReceiptTest = () => {
  const sendData = {
    default: pati08,
    perform: {
      Perform_Date: date_to_string(new Date()),
      Perform_Time: '13:12',
    },
    medical: medicalInfo,
  };
  return client.post('/acceptances/send_test', sendData);
};
