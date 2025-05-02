import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import ChatWindow from './components/ChatWindow';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a66c2',
    },
    background: {
      default: '#f3f2ef',
    },
  },
});

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [filter, setFilter] = useState('all');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar />
          <MessageList 
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            filter={filter}
            setFilter={setFilter}
          />
          <ChatWindow 
            selectedChat={selectedChat}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App; 