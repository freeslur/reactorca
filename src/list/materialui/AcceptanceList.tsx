import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import {
  TableContainer,
  Paper,
  TableRow,
  TableBody,
  Table,
  TableCell,
  IconButton,
  TablePagination,
  useTheme,
  withStyles,
  Menu,
  MenuItem,
  Button,
  MenuProps,
} from '@material-ui/core';

import 'date-fns';
import jaLocale from 'date-fns/locale/ja';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CreditCardIcon from '@material-ui/icons/CreditCard';

import { AcceptanceData as rowData } from './AcceptanceData';
import { Status, IAcceptance } from './AcceptanceDataInterfaces';
import {
  useTablePaginationStyles,
  useDefaultListStyles,
  StyledTableRow,
} from './AcceptanceListStyles';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import * as api from '../../api/Acceptance';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useAccContext } from '../../contexts/AccContext';
import io from 'socket.io-client';
import AcceptanceListToolbar from './AcceptanceListToolbar';
import AcceptanceListHead from './AcceptanceListHead';
import {
  date_to_string,
  getComparator,
  Order,
  stableSort,
} from '../../utils/utils';

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const classes = useTablePaginationStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };
  const handlePreviousPageButtonClick = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };
  const handleNextPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };
  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        disabled={page === 0}
        aria-label='first page'
        onClick={handleFirstPageButtonClick}
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        disabled={page === 0}
        aria-label='previous page'
        onClick={handlePreviousPageButtonClick}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowLeftIcon />
        )}
      </IconButton>
      <IconButton
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
        onClick={handleNextPageButtonClick}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeftIcon />
        ) : (
          <KeyboardArrowRightIcon />
        )}
      </IconButton>
      <IconButton
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
        onClick={handleLastPageButtonClick}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

const AcceptanceList = () => {
  const classes = useDefaultListStyles();
  const accContext = useAccContext();
  const [tableData, setTableData] = useState(rowData);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IAcceptance>('Acceptance_ID');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  //
  //
  useEffect(() => {
    const socket = io('http://127.0.0.1:5000/accsocket');

    socket.on('accres', function (data: any) {
      if (data['status'] === 'push') {
        setTableData(data['data']);
      }
    });
  }, []);

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n.Acceptance_ID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof IAcceptance
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: MouseEvent<unknown>, acceptance_id: string) => {
    const selectedIndex = selected.indexOf(acceptance_id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, acceptance_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  const sortedData = stableSort(tableData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleStatusClick = (
    event: MouseEvent<HTMLElement>,
    index: number,
    acceptance_id: string,
    acceptance_date: string,
    acceptance_time: string,
    patient_id: string
  ) => {
    accContext.state.changeStatus = {
      index: index,
      acc_id: acceptance_id,
      acc_date: acceptance_date,
      acc_time: acceptance_time,
      pati_id: patient_id,
    };
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  /* TODO: ステータス変更時のアクション */
  const handleClickItem = (event: MouseEvent<HTMLElement>, code: number) => {
    accContext.state.changeStatus.code = code;
    tableData.filter((row) => {
      if (
        row.Acceptance_ID === accContext.state.changeStatus.acc_id &&
        row.Patient_ID === accContext.state.changeStatus.pati_id &&
        row.Acceptance_Time === accContext.state.changeStatus.acc_time
      ) {
        if (accContext.state.changeStatus.code !== undefined) {
          row.Status = accContext.state.changeStatus.code.toString();
        }
      }
      return true;
    });
    if (
      accContext.state.changeStatus.code === 4 &&
      accContext.state.changeStatus.acc_id !== undefined &&
      accContext.state.changeStatus.acc_time !== undefined &&
      accContext.state.changeStatus.pati_id !== undefined
    ) {
      api
        .cancelAcceptance(
          date_to_string(accContext.state.selDate),
          accContext.state.changeStatus.acc_id,
          accContext.state.changeStatus.acc_time,
          accContext.state.changeStatus.pati_id
        )
        .then((resp) => {
          setTableData(resp.data);
        })
        .catch((err) => {
          console.log('calcel error : ', err);
        });
    }

    handleClose(event);
  };

  const handleClose = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    accContext.state.changeStatus = {
      index: -1,
      acc_id: '',
      acc_date: '',
      acc_time: '',
      pati_id: '',
      code: -1,
    };
    event.stopPropagation();
  };

  const sendReceipt = (event: MouseEvent<HTMLElement>, data: any) => {
    console.log('============receipt req data=============');
    console.log(data);
    api
      .sendReceipt(data)
      .then((resp) => {
        console.log('============receipt res data=============');
        console.log(resp);
        console.log('============receipt res data=============');
        // const data: IAcceptance[] = resp.data;
        // setTableData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    event.stopPropagation();
  };

  const getAcceptancesData = (date: Date | null) => {
    api
      .getAcceptances(date)
      .then((resp) => {
        const data: IAcceptance[] = resp.data;
        console.log(data);
        setTableData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAcceptancesData(accContext.state.selDate);
  }, [accContext.state.selDate]);

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date !== null) accContext.actions.setSelDate(date);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <AcceptanceListToolbar
          onClickRefresh={getAcceptancesData}
          numSelected={selected.length}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
          <DatePicker
            disableToolbar
            autoOk
            disableFuture
            variant='inline'
            format='yyyy-MM-dd'
            margin='normal'
            onChange={handleDateChange}
            value={accContext.state.selDate}
          />
        </MuiPickersUtilsProvider>
        <TableContainer className={classes.container}>
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
                return (
                  <StyledTableRow
                    hover
                    aria-checked={isItemsSelected}
                    tabIndex={-1}
                    key={row.Acceptance_ID}
                    selected={isItemsSelected}
                    onClick={(event) => handleClick(event, row.Acceptance_ID)}
                  >
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
                          handleStatusClick(
                            event,
                            rowIndex,
                            row.Acceptance_ID,
                            date_to_string(accContext.state.selDate),
                            row.Acceptance_Time,
                            row.Patient_ID
                          );
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
                      {row.LastVisit_Date}
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
                        onClick={(event) => sendReceipt(event, row)}
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
        />
      </Paper>
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
