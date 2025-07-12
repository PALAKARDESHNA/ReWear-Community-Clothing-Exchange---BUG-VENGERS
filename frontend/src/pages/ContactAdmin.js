import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Simulate getting the logged-in user's email (replace with real auth in production)
const getUserEmail = () => {
  return localStorage.getItem('rewear-user-email') || 'palakbheda@gmail.com';
};

const ContactAdmin = () => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [sentData, setSentData] = useState(null); // For demo: show sent message
  const navigate = useNavigate();
  const userEmail = getUserEmail();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      // Simulate sending email
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess(true);
      setSentData({ email: userEmail, message }); // For demo
      setMessage('');
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Contact Admin
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Use this form to send a message directly to the admin. Your email is pre-filled.
        </Typography>
        {success && sentData ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="success.main" gutterBottom>
              Your message has been sent!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              (Demo) The following would be sent to the admin:
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2, background: '#f9fbe7' }}>
              <Typography variant="subtitle2">From:</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>{sentData.email}</Typography>
              <Typography variant="subtitle2">Message:</Typography>
              <Typography variant="body2">{sentData.message}</Typography>
            </Paper>
            <Button variant="contained" color="primary" onClick={() => setSuccess(false)}>
              Send Another Message
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Your Email"
              value={userEmail}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              minRows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, fontWeight: 600 }}
              disabled={sending || !message.trim()}
            >
              {sending ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        )}
      </Paper>
      <Snackbar open={!!error} autoHideDuration={2500} onClose={() => setError('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactAdmin; 