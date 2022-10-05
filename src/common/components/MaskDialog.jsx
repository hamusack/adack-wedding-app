import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import styled from 'styled-components';

const DialogStyle = styled.div
`
  white-space: pre-wrap;
`

function MaskDialog(props) {
  const { onClose, open, title, value } = props;


  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogStyle><div>{value}</div></DialogStyle>
      <Button onClick={onClose}>OK</Button>
    </Dialog>
  );
}

export default MaskDialog;