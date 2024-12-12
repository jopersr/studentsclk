import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, Box, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderMenuProps {
  onCreateStudent?: () => void;
  onCreateClass?: () => void;
  onManageClasses?: () => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ onCreateStudent, onCreateClass, onManageClasses }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: 'Create student', onClick: onCreateStudent },
    { label: 'Create class', onClick: onCreateClass },
    { label: 'Manage classes', onClick: onManageClasses },
  ];

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            Student manager
          </Typography>         
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button variant="contained" onClick={onCreateStudent}>
              Create student
            </Button>
            <Button variant="contained" onClick={onCreateClass}>
              Create class
            </Button>
            <Button variant="contained" onClick={onManageClasses}>
              Manage classes
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleDrawerToggle} aria-label="open drawer" edge="end">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {menuItems.map((item) => (
              <ListItemButton key={item.label} onClick={item.onClick}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderMenu;
