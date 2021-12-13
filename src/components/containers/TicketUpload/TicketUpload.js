import React, { useCallback, useState } from 'react';
import {
  Box,
  Dialog,
  IconButton,
  LinearProgress,
  makeStyles,
} from '@material-ui/core';
import { FilePicker, TicketTable } from 'components';
import { useDispatch } from 'react-redux';
import { uploadTicketsFromCsv } from 'services/api-tickets';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { setResponseError } from 'redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontFamily: theme.custom.fonts.SFProTextSemibold,
    color: '#1e2022',
    marginBottom: 29,
  },
  progressDialog: {
    width: 460,
    border: 'none !important',
    padding: 34,
    backgroundColor: '#444444',
    borderRadius: '4px !important',
    boxShadow: '0 17px 25px 4px rgba(0, 0, 0, 0.11) !important',
  },
  progress: {
    width: '100%',
    backgroundColor: '#868686',
  },
  fileName: {
    margin: '5px 0 0 0',
    color: '#fff',
    fontSize: 13,
    float: 'left',
  },
  closeButton: {
    margin: '-7px -12px -12px -12px',
    color: '#fff',
    fontSize: 16,
    float: 'right',
  },
}));

const TicketUpload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadingStarted, setUploadingStarted] = useState(false);
  const [file, setFileToUpload] = useState();
  const [uploadedTickets, setUploadedTickets] = useState([]);
  const [cancelToken, setCancelToken] = useState();

  const handleFiles = useCallback(
    async (files) => {
      const file = files[0];
      setFileToUpload(file);
      setUploadingStarted(true);

      const ctoken = axios.CancelToken.source();
      setCancelToken(ctoken);

      try {
        const uploadedTickets = await uploadTicketsFromCsv(
          file,
          (e) => {
            const prog = !e.total ? 0 : Math.floor((100 * e.loaded) / e.total);
            setUploadingProgress(prog);
          },
          ctoken.token
        );
        setUploadedTickets(uploadedTickets);
      } catch (e) {
        dispatch(setResponseError(e));
      }

      setUploadingProgress(0);
      setUploadingStarted(false);
    },
    [dispatch]
  );

  const handleCancelUploading = useCallback(() => {
    cancelToken.cancel();
  }, [cancelToken]);

  return uploadedTickets.length ? (
    <TicketTable tickets={uploadedTickets} />
  ) : (
    <div className={classes.root}>
      <p className={classes.label}>Bulk upload tickets from excel file</p>
      <FilePicker onChange={handleFiles} />
      <Dialog
        open={uploadingStarted}
        classes={{ paper: classes.progressDialog }}
      >
        <LinearProgress
          variant="determinate"
          value={uploadingProgress}
          className={classes.progress}
        />
        <Box>
          <p className={classes.fileName}>{file?.name}</p>
          <IconButton
            className={classes.closeButton}
            onClick={handleCancelUploading}
          >
            <CloseIcon fontSize="inherit" color="inherit" />
          </IconButton>
        </Box>
      </Dialog>
    </div>
  );
};

export default TicketUpload;
