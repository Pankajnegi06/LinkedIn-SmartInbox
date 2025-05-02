import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Box
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Navbar() {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        {/* LinkedIn Logo */}
        <img 
          src="https://www.svgrepo.com/show/157006/linkedin.svg" 
          alt="LinkedIn"
          style={{ height: 34, marginRight: 16 }}
        />

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Icons */}
        <Box sx={{ display: 'flex' }}>
          <IconButton>
            <HomeIcon />
          </IconButton>
          <IconButton>
            <PeopleIcon />
          </IconButton>
          <IconButton>
            <WorkIcon />
          </IconButton>
          <IconButton>
            <Badge badgeContent={2} color="error">
              <MessageIcon />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={5} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton>
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 