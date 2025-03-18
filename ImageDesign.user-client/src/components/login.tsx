// import { useContext, useState } from "react";
// import { useUser } from "../context/userContext";
// import axios from "axios";
// import { Link, Navigate } from "react-router";
// import { TextField, Button, Typography, Box, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const { saveUser } = useUser(); // גישה לפונקציה ששומרת את המשתמש
//   const navigate = useNavigate();

//   const reset = () => {
//     setUsername("");
//     setPassword("");
//   };

//   const onSend = async () => {
//     try {
//       const res = await axios.post("http://localhost:8080/api/user/login", { UserName: username, Password: password });
//       setMsg("Login successful");
      
//       // setMsg(`hi ${username}!`);
//       saveUser(res.data);
//       navigate("/recipes");
//     } catch (error: any) {
//       // בודקים אם יש תגובה מהשרת
//       if (error.response && error.response.data) {
//         console.error("Server error:", error.response.data);
//         setMsg(error.response.data); // כאן מציגים את הודעת השגיאה שמגיעה מהשרת
//       } else {
//         console.error("Error:", error);
//         setMsg('Login failed, please try again.');
//       }
//     }
//     reset();
//   };

//   return (
//     <>
//     <Box
//       sx={{
//         position: "fixed", // קיבוע ה-Box למסך
//         top: 0,
//         left: 0,
//         height: "100vh", // כיסוי מלא של הגובה
//         width: "100vw", // כיסוי מלא של הרוחב
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#ffffff", // רקע לבן נקי
//         overflow: "hidden", // מניעת גלילה
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           padding: 5,
//           borderRadius: "12px",
//           backgroundColor: "rgba(255, 255, 255, 0.8)", // מסגרת לבנה אלגנטית עם שקיפות
//           width: "400px",
//           textAlign: "center",
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // צל עדין למראה מקצועי
//         }}
//       >
//         <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
//           התחברות
//         </Typography>
//         <TextField
//           label="Username"
//           value={username}
//           required
//           onChange={({ target }) => setUsername(target.value)}
//           fullWidth
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           required
//           value={password}
//           onChange={({ target }) => setPassword(target.value)}
//           fullWidth
//           sx={{ marginBottom: 2 }}
//         />
//         <Button variant="contained" size="large" onClick={onSend} sx={{ backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}>
//           כניסה
//         </Button>
//         {msg === "user not found!" && <Link to={"/logup"}>להרשמה הקליקו כאן👇</Link>}
//         {msg && <div>{msg}</div>}
//       </Paper>
//     </Box>
//     </>
//     );
// };

// export default Login;

import { useContext, useState } from "react";
import { useUser } from "../context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { saveUser } = useUser(); // גישה לפונקציה ששומרת את המשתמש
  const navigate = useNavigate();

  const reset = () => {
    setUsername("");
    setPassword("");
  };

  const onSend = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/user/login", { UserName: username, Password: password });
      setMsg("Login successful");
      
      // setMsg(`hi ${username}!`);
      saveUser(res.data);
      navigate("/recipes");
    } catch (error: any) {
      // בודקים אם יש תגובה מהשרת
      if (error.response && error.response.data) {
        console.error("Server error:", error.response.data);
        setMsg(error.response.data); // כאן מציגים את הודעת השגיאה שמגיעה מהשרת
      } else {
        console.error("Error:", error);
        setMsg('Login failed, please try again.');
      }
    }
    reset();
  };

  return (
    <>
    <Box
      sx={{
        position: "fixed", // קיבוע ה-Box למסך
        top: 0,
        left: 0,
        height: "100vh", // כיסוי מלא של הגובה
        width: "100vw", // כיסוי מלא של הרוחב
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)", // רקע שקוף למחצה כדי לא להסתיר את תמונת הרקע
        overflow: "hidden", // מניעת גלילה
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 5,
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // מסגרת לבנה אלגנטית עם שקיפות
          width: "400px",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // צל עדין למראה מקצועי
        }}
      >
        <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
          התחברות
        </Typography>
        <TextField
          label="Username"
          value={username}
          required
          onChange={({ target }) => setUsername(target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" size="large" onClick={onSend} sx={{ backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}>
          כניסה
        </Button>
        {msg === "user not found!" && <Link to={"/logup"}>להרשמה הקליקו כאן👇</Link>}
        {msg && <div>{msg}</div>}
      </Paper>
    </Box>
    </>
  );
};

export default Login;