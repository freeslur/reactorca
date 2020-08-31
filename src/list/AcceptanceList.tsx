import React, { useState, ChangeEvent, MouseEvent } from 'react';
import {
  TableContainer,
  Paper,
  TableRow,
  TableBody,
  Table,
  TableCell,
  createStyles,
  makeStyles,
  Theme,
  lighten,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {},
  })
);

interface IPatient {
  Patient_ID: string;
  WholeName: string;
  WholeName_inKana: string;
  BirthDate: string;
  Sex: string;
}

function createData(
  Patient_ID: string,
  WholeName: string,
  WholeName_inKana: string,
  BirthDate: string,
  Sex: string
): IPatient {
  return { Patient_ID, WholeName, WholeName_inKana, BirthDate, Sex };
}

const rows = [
  createData('Cupcake', '305', '3.7', '67', '4.3'),
  createData('Donut', '452', '25.0', '51', '4.9'),
  createData('Eclair', '262', '16.0', '24', '6.0'),
  createData('Frozen yoghurt', '159', '6.0', '24', '4.0'),
  createData('Gingerbread', '356', '16.0', '49', '3.9'),
  createData('Honeycomb', '408', '3.2', '87', '6.5'),
  createData('Ice cream sandwich', '237', '9.0', '37', '4.3'),
  createData('Jelly Bean', '375', '0.0', '94', '0.0'),
  createData('KitKat', '518', '26.0', '65', '7.0'),
  createData('Lollipop', '392', '0.2', '98', '0.0'),
  createData('Marshmallow', '318', '0', '81', '2.0'),
  createData('Nougat', '360', '19.0', '9', '37.0'),
  createData('Oreo', '437', '18.0', '63', '4.0'),
];

type Order = 'asc' | 'desc';

interface AcceptanceListProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof IPatient) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const AcceptanceListHead = (props: AcceptanceListProps) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof IPatient) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };
  return <></>;
};

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  })
);

interface AcceptanceListToolbarProps {
  numSelected: number;
}

const AcceptanceListToolbar = (props: AcceptanceListToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  return (
    <Toolbar>
      <Typography>受付リスト</Typography>
      <Tooltip title='Delete'>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const AcceptanceList = () => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IPatient>('Patient_ID');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.Patient_ID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof IPatient
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <AcceptanceListToolbar numSelected={selected.length} />
        <TableContainer>
          <Table className={classes.table} size='small' aria-label='受付リスト'>
            <AcceptanceListHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.Patient_ID}>
                  <TableCell component='th' scope='row'>
                    {row.Patient_ID}
                  </TableCell>
                  <TableCell>{row.WholeName}</TableCell>
                  <TableCell>{row.WholeName_inKana}</TableCell>
                  <TableCell>{row.BirthDate}</TableCell>
                  <TableCell>{row.Sex}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AcceptanceList;
