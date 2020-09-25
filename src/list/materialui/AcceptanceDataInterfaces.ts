import { MouseEvent, ChangeEvent } from 'react';
import { Order } from '../../utils/utils';
import { useDefaultListStyles } from './AcceptanceListStyles';

export const Status = [
  { title: '診療待', color: 'DEEPSKYBLUE', textColor: 'black' },
  { title: '送信待', color: 'VIOLET', textColor: 'black' },
  { title: '会計済', color: 'GRAY', textColor: 'white' },
  { title: '送信済', color: 'LIME', textColor: 'black' },
  { title: '取り消し', color: 'RED', textColor: 'white' },
];

export interface IAcceptance {
  Acceptance_ID: string;
  Patient_ID: string;
  WholeName: string;
  WholeName_inKana: string;
  BirthDate: string;
  Sex: string;
  Acceptance_Time: string;
  Status: string;
  InsuranceProvider_WholeName: string;
  Department_WholeName: string;
  Physician_WholeName: string;
  LastVisit_Date: string;
  Patient_Memo: string;
  Acceptance_Memo: string;
}

export interface IHeadCell {
  disablePadding: boolean;
  id: keyof IAcceptance;
  label: string;
}

export interface IAcceptanceListProps {
  classes: ReturnType<typeof useDefaultListStyles>;
  numSelected: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof IAcceptance
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface IAcceptanceListToolbarProps {
  onClickRefresh: (date: Date | null) => void;
  numSelected: number;
}

export type AcceptanceStatusState = {
  index?: number;
  acceptance_id?: string;
  code?: number;
};

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}
