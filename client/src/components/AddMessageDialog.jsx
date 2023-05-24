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
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { green } from '@mui/material/colors';
import axios from 'axios';
import moment from 'moment';

export default function AddMessageDialog({callback}) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false)

  const handleChange = async (e) => {
    setMessage(e.target.value);
  }

  const handlePublish = async (e) => {
    const data = {
      question: message,
      insertDate: moment().format("MM/DD/yyyy")
    }
    setLoading(true);
    try {
      await axios.post("/microapi2", data);
      await callback();
    } catch(err) {
      alert(err);
    }
    setLoading(false)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
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
        <DialogTitle>Questions About Black Knight?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask a question about Black Knight and the answer will amaze you.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ask A Question"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={message}
          />
        </DialogContent>
        <DialogActions>
        <Box sx={{ m: 1, position: 'relative' }}>
            <Button variant="contained" disabled={loading} onClick={handleClose} style={{marginRight: "10px"}}>Cancel</Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
          )}
          </Box>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button variant="contained" onClick={handlePublish} disabled={loading}>Publish</Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
          )}
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}