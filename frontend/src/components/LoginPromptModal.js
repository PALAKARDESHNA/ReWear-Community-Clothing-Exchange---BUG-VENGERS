import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Bounce } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/select-role');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Bounce triggerOnce>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
          Login Required
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            Please log in as a user to perform this action.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleLogin} sx={{ fontWeight: 600, px: 4 }}>
            Login
          </Button>
        </DialogActions>
      </Bounce>
    </Dialog>
  );
};

export default LoginPromptModal; 