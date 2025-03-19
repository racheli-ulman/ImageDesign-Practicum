import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  useMediaQuery, 
  useTheme, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton,
  Container 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'תכונות', path: '#features' },
  { name: 'תמחור', path: '#pricing' },
  { name: 'אודות', path: '#about' },
  { name: 'צור קשר', path: '#contact' },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ('key' in event && (event.key === 'Tab' || event.key === 'Shift'))
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navList = (
    <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.name} component="a" href={item.path}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" elevation={0} sx={{ width: '100%' }}>
      <Container maxWidth={false} sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Toolbar disableGutters>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            פוטו-קליק
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {navList}
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', mx: 2 }}>
                {navItems.map((item) => (
                  <Button key={item.name} color="inherit" href={item.path} sx={{ mx: 1 }}>
                    {item.name}
                  </Button>
                ))}
              </Box>
              <Box>
                <Button color="inherit" variant="outlined" sx={{ mx: 1 }}>
                  התחברות
                </Button>
                <Button  color="secondary" variant="contained" sx={{ mx: 1 }}>
                  הרשמה
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;