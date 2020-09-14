import React from 'react';
import { IAcceptance } from './AcceptanceDataInterfaces';
import { Button, Dropdown, Menu } from 'antd';

export const Status = [
  { title: '診療待', color: 'DEEPSKYBLUE', textColor: 'black' },
  { title: '送信待', color: 'VIOLET', textColor: 'black' },
  { title: '送信済', color: 'LIME', textColor: 'black' },
  { title: '取り消し', color: 'RED', textColor: 'white' },
];

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
  Previouse_Acceptance_Date: string,
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
    Previouse_Acceptance_Date,
    Patient_Memo,
    Acceptance_Memo,
  };
}

const statusMenu = (
  <div></div>
  // <Menu>
  //   <Menu.Item>
  //     <Button>aaaa</Button>
  //   </Menu.Item>
  //   {/* {Status.map((s) => (
  //     <Menu.Item>
  //       <Button>{s.title}</Button>
  //     </Menu.Item>
  //   ))} */}
  // </Menu>
);

export const headerColumns = [
  { dataIndex: 'Acceptance_ID', key: 'Acceptance_ID', title: '番号' },
  { dataIndex: 'Acceptance_Time', key: 'Acceptance_Time', title: '時間' },
  {
    dataIndex: 'Status',
    key: 'Status',
    title: 'ステータス',
    render: (text: any, record: any) => (
      <Dropdown overlay={statusMenu} placement='bottomLeft' arrow>
        a
      </Dropdown>
      // <Button color={Status[text].color}>{Status[text].title}</Button>
    ),
  },
  { dataIndex: 'Patient_ID', key: 'Patient_ID', title: '患者番号' },
  { dataIndex: 'WholeName_inKana', key: 'WholeName_inKana', title: 'フリガナ' },
  { dataIndex: 'WholeName', key: 'WholeName', title: '名前' },
  { dataIndex: 'BirthDate', key: 'BirthDate', title: '年齢' },
  { dataIndex: 'Sex', key: 'InsuranceProvider_WholeName', title: '性別' },
  {
    dataIndex: 'InsuranceProvider_WholeName',
    key: 'InsuranceProvider_WholeName',
    title: '保険',
  },
  {
    dataIndex: 'Department_WholeName',
    key: 'Department_WholeName',
    title: '診療科',
  },
  {
    dataIndex: 'Physician_WholeName',
    key: 'Physician_WholeName',
    title: '医師',
  },
  {
    dataIndex: 'Previouse_Acceptance_Date',
    key: 'Previouse_Acceptance_Date',
    title: '前回受付日',
  },
  { dataIndex: 'Patient_Memo', key: 'Patient_Memo', title: '患者メモ' },
  { dataIndex: 'Acceptance_Memo', key: 'Acceptance_Memo', title: '受付メモ' },
];

// export const headCells: IHeadCell[] = [
//   { id: 'Acceptance_ID', disablePadding: true, label: '番号' },
//   { id: 'Acceptance_Time', disablePadding: true, label: '時間' },
//   { id: 'Status', disablePadding: true, label: 'ステータス' },
//   { id: 'Patient_ID', disablePadding: true, label: '患者番号' },
//   { id: 'WholeName_inKana', disablePadding: true, label: 'フリガナ' },
//   { id: 'WholeName', disablePadding: true, label: '名前' },
//   { id: 'BirthDate', disablePadding: true, label: '年齢' },
//   { id: 'Sex', disablePadding: true, label: '性別' },
//   { id: 'InsuranceProvider_WholeName', disablePadding: true, label: '保険' },
//   { id: 'Department_WholeName', disablePadding: true, label: '診療科' },
//   { id: 'Physician_WholeName', disablePadding: true, label: '医師' },
//   {
//     id: 'Previouse_Acceptance_Date',
//     disablePadding: true,
//     label: '前回受付日',
//   },
//   { id: 'Patient_Memo', disablePadding: true, label: '患者メモ' },
//   { id: 'Acceptance_Memo', disablePadding: true, label: '受付メモ' },
// ];

export const AcceptanceData = [
  createData(
    ' ',
    ' ',
    '0',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' '
  ),
];

export default AcceptanceData;
