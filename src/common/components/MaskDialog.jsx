import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import 'common/components/MaskDialog.css'

function MaskDialog(props) {
  const { onClose, open, title, value } = props;


  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor:"#030244",
          textAlign: "center",
          border: "solid 7px #fff"
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <div className="dialogContainer">
        <span >{value.split('\n').map((t,index) => (<span key={index}>{t}<br /></span>))}</span>
        <button className="dialogButton" onClick={onClose}>OK</button>
      </div>
    </Dialog>
  );
}

export default MaskDialog;