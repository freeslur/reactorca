import { IAcceptance, IHeadCell } from './AcceptanceDataInterfaces';

function createData(
  Acceptance_ID: string,
  Acceptance_Time: string,
  Status: string,
  Patient_ID: string,
  WholeName_inKana: string,
  WholeName: string,
  BirthDate: string,
  Sex: string,
  InsuranceProvider_WholeName: string,
  Department_WholeName: string,
  Physician_WholeName: string,
  LastVisit_Date: string,
  Patient_Memo: string,
  Acceptance_Memo: string
): IAcceptance {
  return {
    Acceptance_ID,
    Acceptance_Time,
    Status,
    Patient_ID,
    WholeName_inKana,
    WholeName,
    BirthDate,
    Sex,
    InsuranceProvider_WholeName,
    Department_WholeName,
    Physician_WholeName,
    LastVisit_Date,
    Patient_Memo,
    Acceptance_Memo,
  };
}

export const headCells: IHeadCell[] = [
  { id: 'Acceptance_ID', disablePadding: true, label: '番号' },
  { id: 'Acceptance_Time', disablePadding: true, label: '時間' },
  { id: 'Status', disablePadding: true, label: 'ステータス' },
  { id: 'Patient_ID', disablePadding: true, label: '患者番号' },
  { id: 'WholeName_inKana', disablePadding: true, label: 'フリガナ' },
  { id: 'WholeName', disablePadding: true, label: '名前' },
  { id: 'BirthDate', disablePadding: true, label: '年齢' },
  { id: 'Sex', disablePadding: true, label: '性別' },
  { id: 'InsuranceProvider_WholeName', disablePadding: true, label: '保険' },
  { id: 'Department_WholeName', disablePadding: true, label: '診療科' },
  { id: 'Physician_WholeName', disablePadding: true, label: '医師' },
  {
    id: 'LastVisit_Date',
    disablePadding: true,
    label: '前回受付日',
  },
  { id: 'Patient_Memo', disablePadding: true, label: '患者メモ' },
  { id: 'Acceptance_Memo', disablePadding: true, label: '受付メモ' },
];

export const AcceptanceData = [
  createData('', '', '0', '', '', '', '', '', '', '', '', '', '', ''),
];

export default AcceptanceData;
