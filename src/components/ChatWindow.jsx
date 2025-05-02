import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { Send as SendIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { setReminder, getReminders } from '../utils/messageUtils';

function ChatWindow({ selectedChat }) {
  const [message, setMessage] = useState('');
  const [reminderDialog, setReminderDialog] = useState(false);
  const [reminderTime, setReminderTime] = useState('1h');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real app, this would send the message to an API
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleSetReminder = async () => {
    const time = new Date();
    switch (reminderTime) {
      case '1h':
        time.setHours(time.getHours() + 1);
        break;
      case '3h':
        time.setHours(time.getHours() + 3);
        break;
      case '1d':
        time.setDate(time.getDate() + 1);
        break;
    }

    const success = await setReminder(
      selectedChat.id,
      time,
      `Follow up with ${selectedChat.sender}`
    );

    setReminderDialog(false);
    
    setSnackbar({
      open: true,
      message: success 
        ? 'Reminder set successfully' 
        : 'Failed to set reminder. Please try again.',
      severity: success ? 'success' : 'error'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (!selectedChat) {
    return (
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Typography color="text.secondary">
          Select a conversation to start messaging
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Avatar src={selectedChat.avatar} />
        <Typography variant="h6">{selectedChat.sender}</Typography>
        <IconButton 
          sx={{ ml: 'auto' }}
          onClick={() => setReminderDialog(true)}
        >
          <AccessTimeIcon />
        </IconButton>
      </Box>

      {/* Chat Messages */}
      <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white', maxWidth: '80%', ml: 'auto', mb: 2 }}>
          <Typography>Last message: {selectedChat.lastMessage}</Typography>
        </Paper>
      </Box>

      {/* Message Input */}
      <Box 
        component="form" 
        onSubmit={handleSendMessage}
        sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          display: 'flex',
          gap: 1
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          size="small"
        />
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </Box>

      {/* Reminder Dialog */}
      <Dialog open={reminderDialog} onClose={() => setReminderDialog(false)}>
        <DialogTitle>Set Follow-up Reminder</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            margin="dense"
          >
            <MenuItem value="1h">In 1 hour</MenuItem>
            <MenuItem value="3h">In 3 hours</MenuItem>
            <MenuItem value="1d">Tomorrow</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReminderDialog(false)}>Cancel</Button>
          <Button onClick={handleSetReminder} variant="contained">
            Set Reminder
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ChatWindow; 