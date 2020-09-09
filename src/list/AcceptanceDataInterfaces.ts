import { MouseEvent, ChangeEvent } from 'react';
import { useDefaultListStyles } from './AcceptanceListStyles';

export type Order = 'asc' | 'desc';

export interface IPatient {
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
  Previouse_Acceptance_Date: string;
  Patient_Memo: string;
  Acceptance_Memo: string;
}

export interface IHeadCell {
  disablePadding: boolean;
  id: keyof IPatient;
  label: string;
}

export interface IAcceptanceListProps {
  classes: ReturnType<typeof useDefaultListStyles>;
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof IPatient) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface IAcceptanceListToolbarProps {
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
