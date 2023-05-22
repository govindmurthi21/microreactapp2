import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCommentIcon from '@mui/icons-material/AddComment';
import axios from 'axios';
import moment from 'moment';

export default function AddMessageDialog({callback}) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleChange = async (e) => {
    setMessage(e.target.value);
  }

  const handlePublish = async (e) => {
    const data = {
      message,
      insertDate: moment().format("MM/DD/yyyy")
    }
    await axios.post("/microapi2", data);
    await callback()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Tooltip title="Add New Message">
          <IconButton onClick={handleClickOpen}>
            <AddCommentIcon />
          </IconButton>
        </Tooltip>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
       Add A Message To Queue
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Publish Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Submit any message to predict if the message could be a spam or not.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add Message"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePublish}>Publish</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}