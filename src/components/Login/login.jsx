//module import start
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import cssModules from "../../styles/login.module.css"
import LoginIcon from '@mui/icons-material/Login';
import { UserContext } from "../../context/user";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { Alert } from "react-bootstrap";
import { API } from "../../config/api";
//module import end


export default function Login() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    username: "",
  });

  const [message, setMessage] = useState(null);
  const { password,username  } = form;

//handle changes values & set data to state
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //handle submit action

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      console.log("dataa", form);

      const response = await API.post("/Login", body, config);

      // Handling response here
      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response.data.data.status === "admin") {
            navigate('/sidebar/dashboard')
        } else {
            navigate('/sidebar/dashboard')
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login Success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          account not found
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });
    return (
        <Box
         flex={6}
        p={5}
        className={cssModules.bodyLog}
      >
        {message&&message}
        <div 
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '1000ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <div className={cssModules.item}>
                <h3> SIGN IN</h3>
         <form onSubmit={(e) => handleSubmit.mutate(e)}>
         <div  className={cssModules.forms} >
          <TextField
            required
            id="username"
            onChange={handleChange}
            value={username}
            name="username"
            label="Required"
            // defaultValue="username"
            className={cssModules.form}
            
            />
          </div>
          <div  className={cssModules.forms}>
          <TextField
          required
          id="password"
          onChange={handleChange}
          name="password"
          value={password}
          label="Password"
          type="password"
          autoComplete="current-password"
          className={cssModules.form}
          />
          </div>
            <Button variant="contained" startIcon={<LoginIcon/>}className={cssModules.button} type='submit'>SIGN IN</Button>
        </form>
          </div>
          </div>

      </Box>
    ); 
}

