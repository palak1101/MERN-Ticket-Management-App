import * as React from "react";
import { useState } from "react";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  alpha,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/HomeRounded";
import TicketIcon from "@mui/icons-material/LocalActivityRounded";
import ContactsIcon from "@mui/icons-material/PermContactCalendarRounded";
import ReportsIcon from "@mui/icons-material/AssessmentRounded";
import GeneralIcon from "@mui/icons-material/CropSquareRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftRounded";
import MenuIcon from "@mui/icons-material/MenuRounded";
import ArrowDown from "@mui/icons-material/ArrowDropDown";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/HelpRounded";
import MoreIcon from "@mui/icons-material/MoreVert";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = () => {
    setAnchorEl(null); // Close mobile menu when opening profile menu
    navigate('/profile');
  };

  const handleCreateButtonClick = () => {
    setAnchorEl(null); // Close mobile menu when creating ticket
    navigate("/createTicket");
  };

  const handleHelpIcon = () => {
    // Implement help icon functionality if needed
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        const response = await fetch(`http://localhost:5000/api/tickets/${searchQuery}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Handle data received (e.g., update UI with search results)
        console.log(data); // Log for demonstration, update your UI as per data structure
      } catch (error) {
        console.error('Error searching ticket:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => navigate('/faq')}>
          <Badge color="error">
            <HelpIcon onClick={handleHelpIcon} />
          </Badge>
        </IconButton>
        <p>Help</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit" onClick={() => navigate('/contactus')}>
          <Badge color="error">
            <PhoneIcon />
          </Badge>
        </IconButton>
        <p>Contact Us</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleProfileMenuOpen}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">My Dashboard</Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: { xs: 2, md: 4 }, // Adjust margins for responsiveness
              border: "1px solid #fff",
              borderRadius: "4px",
              paddingLeft: 1,
              paddingRight: 1,
              flexGrow: 1, // Ensure search bar takes remaining space
              maxWidth: 400, // Limit maximum width for larger screens
            }}
          >
            <SearchIcon color="inherit" />
            <InputBase
              placeholder="Search"
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              inputProps={{ "aria-label": "search" }}
              sx={{
                ml: 1,
                color: "inherit",
                "& .MuiInputBase-input": {
                  color: "inherit",
                },
              }}
            />
          </Box>

          {/* Create Button */}
          <Button
            variant="outlined"
            endIcon={<ArrowDown />}
            sx={{
              borderColor: "#fff",
              color: "#fff",
              marginLeft: { xs: 1, md: 2 }, // Adjust margins for responsiveness
              marginRight: { xs: 1, md: 2 },
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#e5e5e5",
                color: "#000",
              },
            }}
            onClick={handleCreateButtonClick}
          >
            Create
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {/* Icon Buttons */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // Hide on smaller screens, flex on medium and up
              gap: "20px",
            }}
          >
            <IconButton
              size="large"
              aria-label="show FAQ"
              color="inherit"
              onClick={() => navigate('/faq')}
            >
              <HelpIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => navigate('/contactus')}
            >
              <PhoneIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* More Icon Button (for mobile) */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Tickets", "Contacts", "Reports"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                switch (text) {
                  case "Home":
                    navigate("/");
                    break;
                  case "Tickets":
                    navigate("/ticket");
                    break;
                  case "Contacts":
                    navigate("/contact");
                    break;
                  case "Reports":
                    navigate("/report");
                    break;
                  default:
                    break;
                }
              }}
            >
              <ListItemIcon
                sx={{
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  fontSize: 40,
                }}
              >
                {index === 0 ? (
                  <HomeIcon />
                ) : index === 1 ? (
                  <TicketIcon />
                ) : index === 2 ? (
                  <ContactsIcon />
                ) : index === 3 ? (
                  <ReportsIcon />
                ) : (
                  <GeneralIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Your main content goes here */}
      </Box>

      {/* Mobile Menu */}
      {renderMobileMenu}
      {/* Menu for larger screens */}
      {renderMenu}
    </Box>
  );
}
