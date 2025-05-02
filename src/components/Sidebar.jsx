import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import {
  Message as MessageIcon,
  People as PeopleIcon,
  Bookmark as BookmarkIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

function Sidebar() {
  return (
    <Box sx={{ width: 240, borderRight: 1, borderColor: 'divider' }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton selected>
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messaging" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Connections" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Saved" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar; 