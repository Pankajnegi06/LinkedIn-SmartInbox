import { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Typography, 
  ButtonGroup, 
  Button,
  Chip
} from '@mui/material';
import { categorizeMessage } from '../utils/messageUtils';

// Sample data - in a real app, this would come from an API
const initialMessages = [
  {
    id: 1,
    sender: 'John Doe',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    lastMessage: 'I have a job opportunity for you',
    timestamp: '2h ago'
  },
  {
    id: 2,
    sender: 'Jane Smith',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    lastMessage: 'Happy birthday! Hope you have a great day',
    timestamp: '3h ago'
  },
  {
    id: 3,
    sender: 'Mike Johnson',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    lastMessage: 'Following up on our last conversation',
    timestamp: '5h ago'
  }
];

function MessageList({ selectedChat, setSelectedChat, filter, setFilter }) {
  const [messages, setMessages] = useState(initialMessages);
  const [filteredMessages, setFilteredMessages] = useState(messages);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(messages.filter(msg => categorizeMessage(msg) === filter));
    }
  }, [filter, messages]);

  return (
    <Box sx={{ width: 360, borderRight: 1, borderColor: 'divider' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Messages</Typography>
        <ButtonGroup variant="outlined" fullWidth>
          <Button 
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'contained' : 'outlined'}
          >
            All
          </Button>
          <Button 
            onClick={() => setFilter('🏢 Job Lead')}
            variant={filter === '🏢 Job Lead' ? 'contained' : 'outlined'}
          >
            Jobs
          </Button>
          <Button 
            onClick={() => setFilter('🎉 Social')}
            variant={filter === '🎉 Social' ? 'contained' : 'outlined'}
          >
            Social
          </Button>
          <Button 
            onClick={() => setFilter('🔁 Follow-Up')}
            variant={filter === '🔁 Follow-Up' ? 'contained' : 'outlined'}
          >
            Follow-Up
          </Button>
        </ButtonGroup>
      </Box>
      
      <List sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 180px)' }}>
        {filteredMessages.map((message) => (
          <ListItem 
            key={message.id}
            button 
            selected={selectedChat?.id === message.id}
            onClick={() => setSelectedChat(message)}
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <ListItemAvatar>
              <Avatar src={message.avatar} />
            </ListItemAvatar>
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2">{message.sender}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {message.timestamp}
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {message.lastMessage}
                  </Typography>
                  <Chip 
                    label={categorizeMessage(message)}
                    size="small"
                    sx={{ ml: 'auto' }}
                  />
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default MessageList; 