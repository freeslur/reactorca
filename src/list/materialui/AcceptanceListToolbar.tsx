import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Modal,
  Backdrop,
  TextField,
  InputAdornment,
} from '@material-ui/core';

import 'date-fns';
import clsx from 'clsx';
import RefreshIcon from '@material-ui/icons/Refresh';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { IAcceptanceListToolbarProps } from './AcceptanceDataInterfaces';
import { useToolbarStyles, useModalStyles } from './AcceptanceListStyles';
import * as papi from '../../api/Patient';
import { useAccContext } from '../../contexts/AccContext';
import Fade from '@material-ui/core/Fade';

const AcceptanceListToolbar = (props: IAcceptanceListToolbarProps) => {
  const classes = useToolbarStyles();
  const modalClasses = useModalStyles();
  const accContext = useAccContext();
  const { onClickRefresh, numSelected } = props;
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [pData, setPData] = useState<{} | null>(null);

  /* TODO: 受付更新時のアクション */
  const refreshAcceptances = () => {
    onClickRefresh(accContext.state.selDate);
  };

  const handlePatientsList = () => {
    setOpen(true);
  };
  const handlePatientsListClose = () => {
    setPData(null);
    setOpen(false);
  };

  const handleSearchPatient = () => {
    papi
      .getPatient(searchValue)
      .then((resp) => {
        const data = resp.data;
        if (data['Api_Result'] === '00') {
          setPData(data['Patient_Information']);
        } else {
          setPData(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Toolbar
      className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
    >
      <Typography
        className={classes.title}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        受付リスト
      </Typography>
      <Tooltip title='Patients'>
        <IconButton aria-label='patients' onClick={handlePatientsList}>
          <PeopleIcon />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby='patients list'
        aria-describedby='patients list description'
        className={modalClasses.modal}
        open={open}
        onClose={handlePatientsListClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <div className={modalClasses.paper}>
            <TextField
              className={modalClasses.inputText}
              id='input-with-icon-search'
              label='患者ID'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
            />
            <IconButton aria-label='search' onClick={handleSearchPatient}>
              <SearchIcon />
            </IconButton>
            {console.log(pData)}
            {pData !== null ? (
              <div className={modalClasses.data}>
                {JSON.stringify(pData, null, '\t')}
              </div>
            ) : (
              <div>データが存在しません。</div>
            )}
          </div>
        </Fade>
      </Modal>
      <Tooltip title='Refresh list'>
        <IconButton aria-label='refresh list' onClick={refreshAcceptances}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default AcceptanceListToolbar;

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
//   const { classes, order, orderBy, onRequestSort } = props;
//   const createSortHandler = (property: keyof IAcceptance) => (
//     event: MouseEvent<unknown>
//   ) => {
//     onRequestSort(event, property);
//   };
//   return (
//     <TableHead>
//       <TableRow>
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

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string }
// ) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const AcceptanceList = () => {
//   const classes = useDefaultListStyles();
//   const accContext = useAccContext();
//   const [tableData, setTableData] = useState(rowData);
//   const [order, setOrder] = useState<Order>('asc');
//   const [orderBy, setOrderBy] = useState<keyof IAcceptance>('Acceptance_ID');
//   const [selected, setSelected] = useState<string[]>([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   //
//   //
//   useEffect(() => {
//     const socket = io('http://127.0.0.1:5000/accsocket');

//     socket.on('accres', function (data: any) {
//       if (data['status'] === 'push') {
//         setTableData(data['data']);
//       }
//     });
//   }, []);

//   const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelecteds = tableData.map((n) => n.Acceptance_ID);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleRequestSort = (
//     event: MouseEvent<unknown>,
//     property: keyof IAcceptance
//   ) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleClick = (event: MouseEvent<unknown>, acceptance_id: string) => {
//     const selectedIndex = selected.indexOf(acceptance_id);
//     let newSelected: string[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, acceptance_id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (
//     event: MouseEvent<HTMLButtonElement> | null,
//     newPage: number
//   ) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (name: string) => selected.indexOf(name) !== -1;
//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

//   const sortedData = stableSort(tableData, getComparator(order, orderBy)).slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleStatusClick = (
//     event: MouseEvent<HTMLElement>,
//     index: number,
//     acceptance_id: string,
//     acceptance_date: string,
//     acceptance_time: string,
//     patient_id: string
//   ) => {
//     accContext.state.changeStatus = {
//       index: index,
//       acc_id: acceptance_id,
//       acc_date: acceptance_date,
//       acc_time: acceptance_time,
//       pati_id: patient_id,
//     };
//     setAnchorEl(event.currentTarget);
//     event.stopPropagation();
//   };

//   /* TODO: ステータス変更時のアクション */
//   const handleClickItem = (event: MouseEvent<HTMLElement>, code: number) => {
//     accContext.state.changeStatus.code = code;
//     tableData.filter((row) => {
//       if (
//         row.Acceptance_ID === accContext.state.changeStatus.acc_id &&
//         row.Patient_ID === accContext.state.changeStatus.pati_id &&
//         row.Acceptance_Time === accContext.state.changeStatus.acc_time
//       ) {
//         if (accContext.state.changeStatus.code !== undefined) {
//           row.Status = accContext.state.changeStatus.code.toString();
//         }
//       }
//       return true;
//     });
//     if (
//       accContext.state.changeStatus.code === 3 &&
//       accContext.state.changeStatus.acc_id !== undefined &&
//       accContext.state.changeStatus.acc_time !== undefined &&
//       accContext.state.changeStatus.pati_id !== undefined
//     ) {
//       api
//         .cancelAcceptance(
//           api.date_to_string(accContext.state.selDate),
//           accContext.state.changeStatus.acc_id,
//           accContext.state.changeStatus.acc_time,
//           accContext.state.changeStatus.pati_id
//         )
//         .then((resp) => {
//           setTableData(resp.data);
//         })
//         .catch((err) => {
//           console.log('calcel error : ', err);
//         });
//     }

//     handleClose(event);
//   };

//   const handleClose = (event: MouseEvent<HTMLElement>) => {
//     setAnchorEl(null);
//     accContext.state.changeStatus = {
//       index: -1,
//       acc_id: '',
//       acc_date: '',
//       acc_time: '',
//       pati_id: '',
//       code: -1,
//     };
//     event.stopPropagation();
//   };

//   const sendReceipt = (event: MouseEvent<HTMLElement>, data: any) => {
//     console.log('============receipt req data=============');
//     console.log(data);
//     api
//       .sendReceipt(data)
//       .then((resp) => {
//         console.log('============receipt res data=============');
//         console.log(resp);
//         console.log('============receipt res data=============');
//         // const data: IAcceptance[] = resp.data;
//         // setTableData(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     event.stopPropagation();
//   };

//   const getAcceptancesData = (date: Date | null) => {
//     api
//       .getAcceptances(date)
//       .then((resp) => {
//         const data: IAcceptance[] = resp.data;
//         console.log(data);
//         setTableData(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     getAcceptancesData(accContext.state.selDate);
//   }, [accContext.state.selDate]);

//   const handleDateChange = (date: MaterialUiPickersDate) => {
//     if (date !== null) accContext.actions.setSelDate(date);
//   };

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <AcceptanceListToolbar
//           onClickRefresh={getAcceptancesData}
//           numSelected={selected.length}
//         />
//         <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
//           <DatePicker
//             disableToolbar
//             autoOk
//             disableFuture
//             variant='inline'
//             format='yyyy-MM-dd'
//             margin='normal'
//             onChange={handleDateChange}
//             value={accContext.state.selDate}
//           />
//         </MuiPickersUtilsProvider>
//         <TableContainer className={classes.container}>
//           <Table
//             stickyHeader
//             className={classes.table}
//             size='medium'
//             aria-label='受付リスト'
//           >
//             <AcceptanceListHead
//               classes={classes}
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={tableData.length}
//             />
//             <TableBody>
//               {sortedData.map((row, rowIndex) => {
//                 const isItemsSelected = isSelected(row.Acceptance_ID);
//                 const labelId = `enhanced-table-checkbox-${rowIndex}`;
//                 return (
//                   <StyledTableRow
//                     hover
//                     aria-checked={isItemsSelected}
//                     tabIndex={-1}
//                     key={row.Acceptance_ID}
//                     selected={isItemsSelected}
//                     onClick={(event) => handleClick(event, row.Acceptance_ID)}
//                   >
//                     <TableCell
//                       component='th'
//                       id={labelId}
//                       scope='row'
//                       padding='none'
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.Acceptance_ID === ''
//                         ? ''
//                         : parseInt(row.Acceptance_ID)}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.Acceptance_Time}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       <Button
//                         aria-controls='status-select'
//                         aria-haspopup='true'
//                         variant='contained'
//                         style={{
//                           backgroundColor: Status[parseInt(row.Status)].color,
//                           width: '100px',
//                         }}
//                         onClick={(event) => {
//                           handleStatusClick(
//                             event,
//                             rowIndex,
//                             row.Acceptance_ID,
//                             api.date_to_string(accContext.state.selDate),
//                             row.Acceptance_Time,
//                             row.Patient_ID
//                           );
//                         }}
//                       >
//                         {Status[parseInt(row.Status)].title}▼
//                       </Button>
//                       <StyledSelect
//                         id='status-select'
//                         anchorEl={anchorEl}
//                         keepMounted
//                         open={Boolean(anchorEl)}
//                         onClose={handleClose}
//                       >
//                         {Status.map((status, button_index) => (
//                           <StyledSelectItem
//                             key={button_index}
//                             onClick={(event) =>
//                               handleClickItem(event, button_index)
//                             }
//                             style={{ backgroundColor: status.color }}
//                           >
//                             {status.title}
//                           </StyledSelectItem>
//                         ))}
//                       </StyledSelect>
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.Patient_ID}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.WholeName_inKana}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.WholeName}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.BirthDate}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.Sex}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.InsuranceProvider_WholeName}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.Department_WholeName}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.Physician_WholeName}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.LastVisit_Date}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.Patient_Memo}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{ borderLeft: '1px solid gray' }}
//                     >
//                       {row.Acceptance_Memo}
//                     </TableCell>
//                     <TableCell
//                       align='center'
//                       style={{
//                         borderLeft: '1px solid gray',
//                         borderRight: '1px solid gray',
//                       }}
//                     >
//                       <IconButton
//                         color='secondary'
//                         disabled={parseInt(row.Status) !== 1}
//                         onClick={(event) => sendReceipt(event, row)}
//                       >
//                         <CreditCardIcon />
//                       </IconButton>
//                     </TableCell>
//                   </StyledTableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: 53 * emptyRows }}>
//                   <TableCell
//                     colSpan={6}
//                     style={{ borderLeft: '1px solid gray' }}
//                   />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, { label: 'すべて', value: -1 }]}
//           count={tableData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//           SelectProps={{
//             inputProps: { 'aria-label': 'rows per page' },
//             native: true,
//           }}
//           component='div'
//           ActionsComponent={TablePaginationActions}
//         />
//       </Paper>
//     </div>
//   );
// };

// /* Button */
// const StyledSelect = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//   },
// })((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//     transformOrigin={{ vertical: 'top', horizontal: 'center' }}
//     {...props}
//   />
// ));

// const StyledSelectItem = withStyles((theme) => ({
//   root: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.white,
//       },
//     },
//   },
// }))(MenuItem);

// export default AcceptanceList;
