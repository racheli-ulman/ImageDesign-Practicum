import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import userStore from "../stores/userStore";
import { Link } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  InputAdornment, 
  IconButton 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Visibility, 
  VisibilityOff, 
  EmailOutlined, 
  LockOutlined 
} from '@mui/icons-material';

const Login: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const reset = () => {
    setUserEmail("");
    setPassword("");
  };

  const onSend = async () => {
    try {
      const res = await userStore.login(userEmail, password);
      setMsg("Login successful");
      navigate('/userAlbums');
    } catch (error: any) {
      if (userStore.error) {
        setMsg(userStore.error);
      } else {
        setMsg('Login failed, please try again.');
      }
    }
    reset();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid 
      container 
      sx={{ 
        height: "100vh", 
        overflow: "hidden",
        background: 'linear-gradient(135deg, #e6f2ff 0%, #b3d9ff 100%)'
      }}
    >
      {/* Right Column - Image */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          backgroundColor: "#e6f2ff", 
          height: "100%",
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '120%',
            height: '120%',
            backgroundImage: 'url("/images/login.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8) blur(5px)',
            transform: 'rotate(-5deg)',
            zIndex: 1
          }}
        />
        <Box
          sx={{
            zIndex: 2,
            textAlign: 'center',
            color: 'white',
            padding: 4,
            backgroundColor: 'rgba(0,51,102,0.7)',
            borderRadius: 2
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1">
            Reconnect with your creative space
          </Typography>
        </Box>
      </Grid>

      {/* Left Column - Login Form */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "100%",
          backgroundColor: 'white'
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            borderRadius: "20px",
            width: "400px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0, 51, 102, 0.1)",
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
        >
          <Typography 
            variant="h4" 
            fontWeight="700" 
            color="text.primary" 
            sx={{ 
              marginBottom: 3,
              background: 'linear-gradient(45deg, #0052cc 0%, #1a75ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Login to Your Account
          </Typography>
          
          <TextField
            label="Email Address"
            value={userEmail}
            required
            onChange={({ target }) => setUserEmail(target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Button 
            variant="contained" 
            fullWidth 
            size="large" 
            onClick={onSend} 
            sx={{ 
              marginBottom: 2,
              background: 'linear-gradient(45deg, #0052cc 0%, #1a75ff 100%)',
              '&:hover': { 
                background: 'linear-gradient(45deg, #1a75ff 0%, #0052cc 100%)'
              }
            }}
          >
            Sign In
          </Button>
          
          {msg === "user not found!" && (
            <Link 
              to={"/signup"} 
              style={{ 
                textDecoration: 'none', 
                color: '#0052cc',
                fontWeight: 'bold'
              }}
            >
              No account? Register here
            </Link>
          )}
          
          {msg && (
            <Typography 
              color={msg.includes("successful") ? "green" : "error"} 
              sx={{ marginTop: 2 }}
            >
              {msg}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(Login);