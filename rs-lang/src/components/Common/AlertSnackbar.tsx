import { Alert, Snackbar } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { setSomethingWrong } from '../../store/userSlice';

type AlertSnackbarProps = {
  msg: string;
}

export const AlertSnackbar: React.FC<AlertSnackbarProps> = ({msg}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(Boolean(msg));
  }, [msg]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    dispatch(setSomethingWrong(''));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
      {msg}
      </Alert>
    </Snackbar>
  </Stack>
  );
};

export default AlertSnackbar;
