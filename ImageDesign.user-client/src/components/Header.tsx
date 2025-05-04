
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
  Container,
  alpha,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Link } from 'react-router-dom';
import userStore from '../stores/userStore';

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

  // const navList = (
    // <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} sx={{ width: 250, direction: 'rtl' }}>
    //   <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    //     <CameraAltIcon sx={{ mr: 1, color: '#FFC107' }} />
    //     <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFC107' }}>
    //       פוטו-קליק
    //     </Typography>
    //   </Box>
    //   <List>
    //     {navItems.map((item) => (
    //       <ListItem button key={item.name} component="a" href={item.path} sx={{ 
    //         borderRadius: 1,
    //         mx: 1,
    //         color: 'white',
    //         '&:hover': {
    //           bgcolor: alpha('#1976D2', 0.1),
    //         }
    //       }}>
    //         <ListItemText primary={item.name} />
    //       </ListItem>
    //     ))}
    //     <ListItem sx={{ mt: 2 }}>
    //       <Button 
    //         fullWidth 
    //         variant="contained" 
    //         sx={{ 
    //           borderRadius: '8px',
    //           py: 1,
    //           fontWeight: 'bold',
    //           bgcolor: '#FFC107', // צהוב
    //           color: 'white',
    //           '&:hover': {
    //             bgcolor: '#FFA000',
    //           }
    //         }}            
    //         component={Link} 
    //         to="/login"
    //       >
    //         התחברות
    //       </Button>
    //     </ListItem>
    //   </List>
    // </Box>
  // );

  return (
    <AppBar 
      position="fixed" 
      elevation={1}
      sx={{ 
        width: '100%',
        bgcolor: '#1976D2', // כחול
        boxShadow: `0 2px 10px ${alpha(theme.palette.common.black, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64 }}>  {/* גודל קבוע */}
          {/* Logo on the left side */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            ml: 'auto', // Push to the left in RTL
            order: 2
          }}>
            <CameraAltIcon sx={{ mr: 1, fontSize: 24, color: '#FFC107' }} />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                color: 'white', // לבן
              }}
            >
              פוטו-קליק
              {/* <img src="/images/logo.jpg" alt="" /> */}
            </Typography>
          </Box>

          {isMobile ? (
            // Mobile view
            <IconButton
              sx={{ 
                mr: 'auto', // Push to the right in RTL
                order: 1,
                color: 'white' // לבן
              }}
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            // Desktop view - navigation on the right
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mr: 'auto', // Push to the right in RTL
              order: 1
            }}>
              <Button 
                variant="outlined" 
                sx={{ 
                  ml: 2, 
                  borderRadius: '8px',
                  px: 2.5,
                  py: 0.5,
                  color: 'white', // לבן
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: alpha('#FFFFFF', 0.8),
                    backgroundColor: alpha('#FFFFFF', 0.1),
                  },
                }} 
                component={Link}
                to="/login"
              >
                התחברות
              </Button>
              {/* {userStore.user && (
                        <Avatar sx={{ bgcolor: '#FFC107', marginLeft: 'auto' }}>
                          
                            {userStore.user?.uesr?.firstName.charAt(0)} 
                        </Avatar>
                    )} */}
              {/* <Box sx={{ display: 'flex' }}>
                {navItems.map((item) => (
                  <Button 
                    key={item.name} 
                    href={item.path} 
                    sx={{ 
                      mx: 1,
                      color: 'white', // לבן
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '0',
                        height: '2px',
                        bottom: 0,
                        left: '50%',
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover:after': {
                        width: '100%',
                        left: '0'
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box> */}
            </Box>
          )}
          
          {/* Mobile drawer */}
          <Drawer 
            anchor="right" 
            open={drawerOpen} 
            onClose={toggleDrawer(false)}
            sx={{
              '& .MuiDrawer-paper': {
                borderRadius: '12px 0 0 12px',
                bgcolor: '#1976D2', // כחול
                color: 'white', // לבן
              }
            }}
          >
            {/* {navList} */}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;