import {  Button, TextField } from '@mui/material';
import '../styles/Login-Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext, UserDataInterface } from './App';

const Login= ({role}: any) => {
    const { setUser } = useContext(AppContext);
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [loginStatus, setLoginStatus] = useState('');
    const [_, setButtonStatus] = useState('');

    const navigate = useNavigate();

    const [username, setUsername] = useState('');

    const onLogin = async (e: any) => {

        e.preventDefault();
        setLoginStatus('');

        setUsernameError(false);
        setPasswordError(false);

        if (username === '')
            setUsernameError(true);

        if (password === '')
            setPasswordError(true);

        if (username !== '' && password !== '') {
            await axios.post(
                '/users/login',
                {
                    // role: role,
                    email: username,
                    password: password,
                }
            ).then((response: any) => {
                var result = JSON.stringify(response.data);
                var json = JSON.parse(result);
                console.log(json);
                if (json.status == 'OK') {
                    setButtonStatus("Login");
                    axios.get("/users/logged").then((res: any) => {
                        console.log("res: ", res)
                        if (res.data.status === "OK") {
                            setUser && setUser({
                                isLoggedIn: true,
                                first_name: res.data.first_name,
                                last_name: res.data.last_name,
                                phone: res.data.phone,
                                email: res.data.email,
                                address: res.data.address,
                                gender: res.data.gender,
                                dob: res.data.dob,
                                profile_picture: res.data.profile_picture,
                                role: res.data.role,
                            } as UserDataInterface);
                            navigate('/');
                        } else {
                            alert("Error: " + res.data.message);
                        }
                    }, (err: any) => {
                        console.log("error", err);
                        alert("Error: " + err);
                    });
                }
                else {
                    setLoginStatus(json.message);
                    setPasswordError(true);
                    setButtonStatus("Try Again");
                }
            }, ((err) => {
                alert("Error: " + err);
            }));
        }
    }

    return (
        <div className='login-container' >
            <div className='login-title'>
                <div className='login-to'>
                    Login to
                </div>
                <div className='brand'>
                    WANDERLUST.COM
                </div>
            </div>
            <div className="login-body">
                <div className='login-name'>
                    {role == "partner" && "Partner Login" || "Customer Login"}
                </div>
                <form className="login-form">

                    <div className='input-group'>

                        <TextField 
                            label='Username/Email ID' 
                            fullWidth 
                            onChange={(e) => {setUsername(e.target.value)}}
                            error={usernameError}
                            helperText={usernameError ? loginStatus : ""}
                            />
                    </div>

                    <div className='input-group'>
                        <TextField 
                            type='password' 
                            label='Password' 
                            fullWidth 
                            onChange={(e) => {setPassword(e.target.value)}}
                            error={passwordError}
                            helperText={passwordError ? loginStatus : ''}
                            />
                    </div>

                    <Button type="submit" className="login-btn" onClick={onLogin}
                                            sx={{
                                                marginBottom: '1rem',
                                                height: '3rem',
                                                border: 'none',
                                                borderRadius: '5px',
                                                backgroundColor: '#1c39bb' ,
                                                color: 'white',
                                                fontSize: '16px',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease',
                                                "&.Mui-disabled": {
                                                    background: "#F2F2F2",
                                                    color: "black"
                                                },
                                                ":hover": {
                                                    backgroundColor: 'white',
                                                    border: '2px #1c39bb solid',
                                                    color: '#1c39bb',
                                                }
                                            }}
                    >Login</Button>
                </form>


                    <Link to={(role == "partner"? "/customer": "/partner")+'/register'}><div className='login-switch'>Don't have an account? Register now</div></Link>
                    <Link to={(role == "partner"? "/customer": "/partner")+'/login'}><div className='login-switch'>Are you a {role == "partner"? "customer": "partner"}?</div></Link>

            </div>


        </div>
      );
}

export default Login;