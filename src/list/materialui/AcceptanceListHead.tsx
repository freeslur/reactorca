import React, { MouseEvent } from 'react';
import { TableRow, TableHead, TableSortLabel } from '@material-ui/core';

import 'date-fns';

import { headCells } from './AcceptanceData';
import { IAcceptanceListProps, IAcceptance } from './AcceptanceDataInterfaces';
import { StyledTableCell } from './AcceptanceListStyles';

const AcceptanceListHead = (props: IAcceptanceListProps) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof IAcceptance) => (
    event: MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align='center'
            padding='none'
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              borderLeft: '1px solid gray',
              borderTop: '1px solid gray',
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell
          style={{
            borderLeft: '1px solid gray',
            borderTop: '1px solid gray',
            borderRight: '1px solid gray',
          }}
        >
          会計
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default AcceptanceListHead;
