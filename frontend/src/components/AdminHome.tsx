
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { ListItemText } from '@mui/material';
import Badge from '@mui/material/Badge';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InputBase from '@mui/material/InputBase';

import GeneralIcon from "@mui/icons-material/CropSquareRounded";
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/HelpRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TicketIcon from '@mui/icons-material/LocalActivityRounded';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

import Profile from './Profile/Profile';
import * as React from 'react';
import { useState } from 'react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function AdminHome() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [helpMenuAnchorEl, setHelpMenuAnchorEl] = useState(null);
  
  const handleProfileMenuOpen = () => { 
    setShowProfile(!showProfile);
  };
  
  const openHelpMenu = Boolean(helpMenuAnchorEl);

  const handleHelpMenuOpen = (event:any) => {
    setHelpMenuAnchorEl(event.currentTarget);
  };

  const handleHelpMenuClose = () => {
    setHelpMenuAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 0, gap: 10 }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Typography variant="h6">Admin Page</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 40,
                border: '1px solid #fff',
                borderRadius: '4px',
                paddingLeft: 1,
                paddingRight: 1,
              }}
            >
              <SearchIcon color="inherit" />
              <InputBase
                placeholder="Search Ticket"
                inputProps={{ 'aria-label': 'search' }}
                sx={{
                  ml: 1,
                  color: 'inherit',
                  '& .MuiInputBase-input': {
                    color: 'inherit',
                  },
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '20px' }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{ fontSize: '2rem' }}>
                <Badge color="error">
                  <HelpIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar> */}
        <IconButton
              size="large"
              aria-label="help menu"
              color="inherit"
              onClick={handleHelpMenuOpen}
              sx={{ fontSize: '2rem' }}
            >
              <Badge color="error">
                <HelpIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Popover
          open={openHelpMenu}
          anchorEl={helpMenuAnchorEl}
          onClose={handleHelpMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleHelpMenuClose}>Help Option 1</MenuItem>
          <MenuItem onClick={handleHelpMenuClose}>Help Option 2</MenuItem>
          <MenuItem onClick={handleHelpMenuClose}>Help Option 3</MenuItem>
        </Popover>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader />
          <Divider />
          <List>
            {['Tickets', 'Profile'].map((text, index) => (
              <ListItemButton
                key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => {
                  if (index === 1) {
                    handleProfileMenuOpen();
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    fontSize: 40,
                  }}
                >
                  {index === 0 ? <TicketIcon /> : index === 1 ? <AccountCircleIcon /> : <GeneralIcon />}
                </ListItemIcon>
                {/* <ListItemText primary={text} /> */}
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {showProfile && <Profile />}
        </Box>
      </Box>
    </>
  );
}
