import React, { useState } from 'react';
import { Box, Container, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRole, ROLE_ADMIN, ROLE_USER, ROLE_GUEST } from '../contexts/RoleContext';

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [userAction, setUserAction] = useState('login'); // for user: login or signup
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleContinue = () => {
    setRole(selectedRole);
    if (selectedRole === ROLE_ADMIN) {
      navigate('/login');
    } else if (selectedRole === ROLE_USER) {
      navigate(userAction === 'login' ? '/login' : '/signup');
    } else if (selectedRole === ROLE_GUEST) {
      navigate('/browse');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Select Your Role
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Please choose how you want to use ReWear.
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            label="Role"
          >
            <MenuItem value={ROLE_ADMIN}>Admin (Login only)</MenuItem>
            <MenuItem value={ROLE_USER}>User (Login & Sign Up)</MenuItem>
            <MenuItem value={ROLE_GUEST}>Guest (View only)</MenuItem>
          </Select>
        </FormControl>
        {selectedRole === ROLE_USER && (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Action</InputLabel>
            <Select
              value={userAction}
              onChange={e => setUserAction(e.target.value)}
              label="Action"
            >
              <MenuItem value="login">Login</MenuItem>
              <MenuItem value="signup">Sign Up</MenuItem>
            </Select>
          </FormControl>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 600, py: 1.5, fontSize: 18 }}
          disabled={!selectedRole}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Paper>
    </Container>
  );
};

export default SelectRole; 