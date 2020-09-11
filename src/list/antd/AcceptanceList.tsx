import React, { useState, useEffect } from 'react';
// import { ChangeEvent, MouseEvent } from 'react';
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  withStyles,
  Menu,
  MenuItem,
  MenuProps,
} from '@material-ui/core';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import {
  AcceptanceData as rowData,
  headerColumns,
  Status,
} from './AcceptanceData';
import {
  Order,
  IAcceptance,
  IAcceptanceListToolbarProps,
} from './AcceptanceDataInterfaces';
import { useToolbarStyles, useDefaultListStyles } from './AcceptanceListStyles';
import * as api from '../../api/Acceptance';
import { Card, Table } from 'antd';
import 'antd/dist/antd.css';

const AcceptanceListToolbar = (props: IAcceptanceListToolbarProps) => {
  const classes = useToolbarStyles();
  const { onClickRefresh, numSelected } = props;

  /* TODO: 受付削除時のアクション */
  const deleteAcceptances = () => {
    console.log('Delete!!!!!');
    alert('Delete!!');
  };

  /* TODO: 受付更新時のアクション */
  const refreshAcceptances = () => {
    onClickRefresh();
  };

  return (
    <Toolbar
      className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected}個選択
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          受付リスト
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete' onClick={deleteAcceptances}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='refresh list' onClick={refreshAcceptances}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

// const TablePaginationActions = (props: TablePaginationActionsProps) => {
//   const classes = useTablePaginationStyles();
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onChangePage } = props;

//   const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
//     onChangePage(event, 0);
//   };
//   const handlePreviousPageButtonClick = (
//     event: MouseEvent<HTMLButtonElement>
//   ) => {
//     onChangePage(event, page - 1);
//   };
//   const handleNextPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
//     onChangePage(event, page + 1);
//   };
//   const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
//     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <div className={classes.root}>
//       <IconButton
//         disabled={page === 0}
//         aria-label='first page'
//         onClick={handleFirstPageButtonClick}
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         disabled={page === 0}
//         aria-label='previous page'
//         onClick={handlePreviousPageButtonClick}
//       >
//         {theme.direction === 'rtl' ? (
//           <KeyboardArrowRightIcon />
//         ) : (
//           <KeyboardArrowLeftIcon />
//         )}
//       </IconButton>
//       <IconButton
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label='next page'
//         onClick={handleNextPageButtonClick}
//       >
//         {theme.direction === 'rtl' ? (
//           <KeyboardArrowLeftIcon />
//         ) : (
//           <KeyboardArrowRightIcon />
//         )}
//       </IconButton>
//       <IconButton
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label='last page'
//         onClick={handleLastPageButtonClick}
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </div>
//   );
// };

// const AcceptanceListHead = (props: IAcceptanceListProps) => {
//   const {
//     classes,
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler = (property: keyof IAcceptance) => (
//     event: MouseEvent<unknown>
//   ) => {
//     onRequestSort(event, property);
//   };
//   return (
//     <TableHead>
//       <TableRow>
//         <StyledTableCell
//           padding='checkbox'
//           style={{ borderLeft: '1px solid gray', borderTop: '1px solid gray' }}
//         >
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all desserts' }}
//           />
//         </StyledTableCell>
//         {headCells.map((headCell) => (
//           <StyledTableCell
//             key={headCell.id}
//             align='center'
//             padding='none'
//             sortDirection={orderBy === headCell.id ? order : false}
//             style={{
//               borderLeft: '1px solid gray',
//               borderTop: '1px solid gray',
//             }}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </StyledTableCell>
//         ))}
//         <StyledTableCell
//           style={{
//             borderLeft: '1px solid gray',
//             borderTop: '1px solid gray',
//             borderRight: '1px solid gray',
//           }}
//         >
//           会計
//         </StyledTableCell>
//       </TableRow>
//     </TableHead>
//   );
// };

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
let changeStatus = {
  index: -1,
  acceptance_id: '',
  code: -1,
};

const AcceptanceList = () => {
  const classes = useDefaultListStyles();
  const [tableData, setTableData] = useState(rowData);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IAcceptance>('Acceptance_ID');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const [changeStatus, setChangeStatus] = useState({
  //   index: -1,
  //   acceptance_id: '',
  //   code: -1,
  // });

  // const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelecteds = tableData.map((n) => n.Acceptance_ID);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleRequestSort = (
  //   event: MouseEvent<unknown>,
  //   property: keyof IAcceptance
  // ) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleClick = (event: MouseEvent<unknown>, acceptance_id: string) => {
  //   const selectedIndex = selected.indexOf(acceptance_id);
  //   let newSelected: string[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, acceptance_id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  // const handleChangePage = (
  //   event: MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const isSelected = (name: string) => selected.indexOf(name) !== -1;
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  const sortedData = stableSort(tableData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // const handleStatusClick = (
  //   event: MouseEvent<HTMLElement>,
  //   index: number,
  //   acceptance_id: string
  // ) => {
  //   changeStatus.index = index;
  //   changeStatus.acceptance_id = acceptance_id;
  //   // setChangeStatus({
  //   //   index: index,
  //   //   acceptance_id: acceptance_id,
  //   //   code: 0,
  //   // });
  //   console.log('button click    : ', index, acceptance_id, changeStatus);
  //   setAnchorEl(event.currentTarget);
  //   event.stopPropagation();
  // };

  // /* TODO: ステータス変更時のアクション */
  // const handleClickItem = (event: MouseEvent<HTMLElement>, code: number) => {
  //   changeStatus.code = code;
  //   // setChangeStatus({
  //   //   ...changeStatus,
  //   //   code: code,
  //   // });
  //   const data = tableData.filter((row) => {
  //     if (row.Acceptance_ID === changeStatus.acceptance_id) {
  //       row.Status = changeStatus.code.toString();
  //     }
  //     return true;
  //   });
  //   setTableData(data);

  //   handleClose(event);
  // };

  // const handleClose = (event: MouseEvent<HTMLElement>) => {
  //   setAnchorEl(null);
  //   changeStatus = {
  //     index: -1,
  //     acceptance_id: '',
  //     code: -1,
  //   };
  //   // setChangeStatus({
  //   //   index: -1,
  //   //   acceptance_id: '',
  //   //   code: -1,
  //   // });
  //   event.stopPropagation();
  // };

  // const sendReceipt = (event: MouseEvent<HTMLElement>) => {
  //   alert('会計を送信しました。');
  //   event.stopPropagation();
  // };

  const getAcceptancesData = () => {
    api
      .getAcceptances()
      .then((resp) => {
        const data: IAcceptance[] = resp.data;
        setTableData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAcceptancesData();
  }, []);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <AcceptanceListToolbar
          onClickRefresh={getAcceptancesData}
          numSelected={selected.length}
        />
        <Table columns={headerColumns} dataSource={sortedData}></Table>
        {/* <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            size='medium'
            aria-label='受付リスト'
          >
            <AcceptanceListHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {sortedData.map((row, rowIndex) => {
                const isItemsSelected = isSelected(row.Acceptance_ID);
                const labelId = `enhanced-table-checkbox-${rowIndex}`;
                console.log(row);
                return (
                  <StyledTableRow
                    hover
                    role='checkbox'
                    aria-checked={isItemsSelected}
                    tabIndex={-1}
                    key={row.Acceptance_ID}
                    selected={isItemsSelected}
                    onClick={(event) => handleClick(event, row.Acceptance_ID)}
                  >
                    <TableCell
                      padding='checkbox'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      <Checkbox
                        checked={isItemsSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>

                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.Acceptance_ID === ''
                        ? ''
                        : parseInt(row.Acceptance_ID)}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.Acceptance_Time}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      <Button
                        aria-controls='status-select'
                        aria-haspopup='true'
                        variant='contained'
                        style={{
                          backgroundColor: Status[parseInt(row.Status)].color,
                          width: '100px',
                        }}
                        onClick={(event) => {
                          handleStatusClick(event, rowIndex, row.Acceptance_ID);
                        }}
                      >
                        {Status[parseInt(row.Status)].title}▼
                      </Button>
                      <StyledSelect
                        id='status-select'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {Status.map((status, button_index) => (
                          <StyledSelectItem
                            key={button_index}
                            onClick={(event) =>
                              handleClickItem(event, button_index)
                            }
                            style={{ backgroundColor: status.color }}
                          >
                            {status.title}
                          </StyledSelectItem>
                        ))}
                      </StyledSelect>
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.Patient_ID}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.WholeName_inKana}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.WholeName}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.BirthDate}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.Sex}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.InsuranceProvider_WholeName}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.Department_WholeName}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.Physician_WholeName}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.Previouse_Acceptance_Date}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.Patient_Memo}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderLeft: '1px solid gray' }}
                    >
                      {row.Acceptance_Memo}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{
                        borderLeft: '1px solid gray',
                        borderRight: '1px solid gray',
                      }}
                    >
                      <IconButton
                        color='secondary'
                        disabled={parseInt(row.Status) !== 1}
                        onClick={sendReceipt}
                      >
                        <CreditCardIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={6}
                    style={{ borderLeft: '1px solid gray' }}
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, { label: 'すべて', value: -1 }]}
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          component='div'
          ActionsComponent={TablePaginationActions}
        /> */}
      </Card>
    </div>
  );
};

/* Button */
const StyledSelect = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    {...props}
  />
));

const StyledSelectItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default AcceptanceList;
