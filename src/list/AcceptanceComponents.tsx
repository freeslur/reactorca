import React, { useState, MouseEvent } from 'react';
import {
  Button,
  withStyles,
  MenuProps,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Status } from './AcceptanceData';

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

interface IStatusSelect {
  statusCode: number;
}

export const StatusSelect = (props: IStatusSelect) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [buttonTitle, setButtonTitle] = useState(Status[1].title);
  const [buttonColor, setButtonColor] = useState('DEEPSKYBLUE');
  const { statusCode } = props;
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const statusData = Status[statusCode];

  const handleClickItem = (event: MouseEvent<HTMLElement>, index: number) => {
    setButtonTitle(Status[index].title);
    setButtonColor(Status[index].color);
    handleClose(event);
  };

  const handleClose = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  return (
    <div>
      <Button
        aria-controls='status-select'
        aria-haspopup='true'
        variant='contained'
        style={{ backgroundColor: buttonColor }}
        onClick={handleClick}
      >
        {buttonTitle}▼
      </Button>
      <StyledSelect
        id='status-select'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Status.map((status, index) => (
          <StyledSelectItem
            onClick={(event) => handleClickItem(event, index)}
            style={{ backgroundColor: status.color }}
          >
            {status.title}
          </StyledSelectItem>
        ))}
      </StyledSelect>
    </div>
  );
};
