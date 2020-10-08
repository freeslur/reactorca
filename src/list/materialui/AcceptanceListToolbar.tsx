import React, { useState, MouseEvent } from 'react';
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
import { Payment } from '@material-ui/icons';
import * as api from '../../api/Acceptance';

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

  const handleAccountTest = (event: MouseEvent<HTMLElement>) => {
    api
      .sendReceiptTest()
      .then((resp) => {
        const data = resp.data;
        console.log('aaa', data);
        if (data['error'] !== '00') {
          alert(data['error']);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    event.stopPropagation();
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
      <IconButton
        aria-label='payment'
        onClick={(e) => {
          handleAccountTest(e);
        }}
      >
        <Payment />
      </IconButton>

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
