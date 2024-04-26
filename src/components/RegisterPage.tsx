import { Box, FormControl, TextField } from '@mui/material';
import '../styles/Login-Register.css'
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiTelInput } from 'mui-tel-input'
import axios from "axios";
import { AppContext, UserDataInterface } from './App';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Button } from 'rsuite';


const Register = ({role}:any) => {
    const { setUser } = useContext(AppContext);

    const [firstName,setFirstName] = useState('A');
    const [middleName,setMiddleName] = useState('B');
    const [lastName,setLastName] = useState('C');

    const [dob,setDoB] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('+914568123456');

    const [email,setEmailID] = useState('234');
    const [password, setPassword] = useState('12');
    const [confirmPassword, setConfirmPassword] = useState('12');

    // const [DoBError, setDoBError] = useState(false);
    const [FirstNameError, setFirstNameError] = useState(false);
    const [LastNameError, setLastNameError] = useState(false);
    const [PhoneNumberError, setPhoneNumberError] = useState(false);
    const [EmailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [_status, setStatus] = useState(false);

    const navigate = useNavigate();


    const onRegister = async (e: any) => {

        e.preventDefault();

        setStatus(false);
        setFirstNameError(false);
        setLastNameError(false);
        setPhoneNumberError(false);
        setEmailError(false);
        // setDoBError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
        var err = false;

        if (firstName === ''){
            setFirstNameError(true);
            err = true;
        }
        if (lastName === ''){
            setLastNameError(true)
            err = true
        }
        if (password === ''){
            setPasswordError(true);
            err = true
        }

        if (confirmPassword === ''){
            setConfirmPasswordError(true);
            err = true
        }

        if (password !== confirmPassword) {
            setPasswordError(true);
            setConfirmPasswordError(true);
            // setStatus(false)
            alert('Password and Confirm Password do not match')
            err = true
        }

        if (email === ''){
            setEmailError(true)
            err= true
        }

        if (phoneNumber === ''){
            setPhoneNumberError(true)
            err = true
        }

        if (dob === ''){
            // setDoBError(true)
            err = true
            alert("Date of Birth is Empty!")
        }

        if (dob === 'Invalid Date'){

            // setDoBError(true)
            err = true
            alert("Date of Birth is invalid!")
        }

        if (!err ) {

            await axios.post('/users/register', {
                role: role,
                first_name: firstName,
                // middle_name: middleName,
                last_name: lastName,
                dob: dob,
                phone_number: phoneNumber,
                email: email,
                password: password,
                gender: "",
                nationality: "",
                profile_picture: ""
            })
            .then((res: any) => {
                    // console.log(res.data);
                    setStatus(res.data.status);
                    if (res.data.status === "OK"){
                        axios.get("/users/logged").then((res2) => {
                            console.log("data", res2.data);
                            if (res2.data.status === "OK") {
                                setUser && setUser({
                                    isLoggedIn: true,
                                    first_name: res2.data.first_name,
                                    last_name: res2.data.last_name,
                                    phone: res2.data.phone,
                                    email: res2.data.email,
                                    address: res2.data.address,
                                    gender: res2.data.gender,
                                    dob: res2.data.dob,
                                    profile_picture: res2.data.profile_picture,
                                    role: res2.data.role,
                                } as UserDataInterface);
                                navigate('/');
                            }
                        }, (err) => {
                            console.log("error", err);
                            alert("Error: " + err);
                        });
                    }
                    else {
                        // navigate("/partner/register")
                        alert(res.data.message)
                    }
            })
            .catch((err: any) => {
                    alert(err);
            });

        }
        // else{
        //     console.log("Error")
        // }
    }
    return (
        <div className='register-container' >
            <div className='register-title'>
                <div className='register-to'>
                    Welcome to 
                </div>
                <div className='brand'>
                    WANDERLUST.COM
                </div>
            </div>
            <div className="register-body">
                <div className='register-name'>

                {role == "partner" && "Partner Login" || "Customer Login"}
                </div>
                <FormControl className='register-form'>
                
                {/* <form className="register-form"> */}
                    <div className="input-group">
                        <div className='name'>

                            <TextField  
                                label='First name'
                                name="firstname"
                                onChange={(e) => {setFirstName(e.target.value)}}
                                error={FirstNameError}
                                value={firstName}
                                required
                                />
                        </div>
                        <div className='name'>
                           
                            <TextField 
                                label='Middle name'
                                name='middlename'
                                onChange={(e) => {setMiddleName(e.target.value)}}
                                value={middleName}

                                />
                        </div>
                        <div className='name'>

                            <TextField 
                                label='Last name' 
                                name="lastname"
                                onChange={(e) => {setLastName(e.target.value)}}
                                error={LastNameError}
                                value={lastName}
                                required
                                />
                        </div>


                    </div>
                    <div className="input-group">
                        <div className='date-of-birth'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker  
                                    label='Date of Birth' 
                                    name="dob"
                                    onChange={(e) => {e && setDoB(e.format("YYYY-MM-DD"))}}
                                    

                                /> 
                            </LocalizationProvider>
                        </div>
                        <div className='phone-number'>
                            <MuiTelInput 
                                label="Phone Number"  
                                onChange={(e) => {setPhoneNumber(e);}}
                                value={phoneNumber}
                                error={PhoneNumberError}
                                required
                            />
                        </div>
                    </div>

                    <div className='input-group'>

                        <TextField 
                            label='Email ID' 
                            fullWidth 
                            onChange={(e) => {setEmailID(e.target.value)}}
                            error={EmailError}
                            value={email}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <TextField 
                            type='password' 
                            label='Password' 
                            fullWidth 
                            onChange={(e) => {setPassword(e.target.value)}}
                            error={passwordError}
                            value={password}
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <TextField 
                            type='password' 
                            label=' Confirm Password' 
                            fullWidth 
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            error={confirmPasswordError}
                            value={confirmPassword}
                            required
                        />
                    </div>
                    {/* <button type="submit" className="register-btn">Register</button> */}
                    <Button 
                        type="submit"
                        className='register-btn'
                        // variant="contained"
                        onClick={onRegister}
                    >
                        Register
                    </Button>
                {/* </form> */}
                </FormControl>

                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Link to={'/customer/register'}><div className='register-switch'>Are you a {role == "partner"? "customer": "partner"}?</div></Link>
                </Box>

            </div>

        </div>
      );
}

export default Register;