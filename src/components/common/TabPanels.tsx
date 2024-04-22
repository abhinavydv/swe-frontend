import { Box, Typography, TextField, IconButton, Button, Divider, Select, MenuItem } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { UserDataInterface } from "../App";
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from "dayjs";
import axios from "axios";


interface ProfileTabPanelProps {
    user?: UserDataInterface;
    props?: any;
}

export const ProfileTabPanel = ({user, ...props}: ProfileTabPanelProps) => {

    const [firstName, setFirstName] = useState(user?.first_name);
    const [lastName, setLastName] = useState(user?.last_name);
    const [email, setEmail] = useState(user?.email);
    const [profilePicture, _setProfilePicture] = useState(user?.profile_picture);
    const [phone, setPhone] = useState(user?.phone);
    const [dob, setDob] = useState(dayjs(user?.dob));
    const [gender, setGender] = useState(user?.gender);
    const [nationality, setNationality] = useState(user?.nationality);
    const [countries, setCountries] = useState([user?.nationality]);

    useEffect(() => {
        axios.get("https://api.first.org/data/v1/countries", {withCredentials: false}).then((res) => {
            var c = [];
            for (var i in res.data.data){
                c.push(res.data.data[i].country);
            }
            setCountries(c);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const genders = [
        "Male",
        "Female",
        "Other",
    ]

    const saveChanges = (e: any) => {
        e.preventDefault();

        if (firstName == ""){
            alert("First Name cannot be empty");
            return;
        }
        if (lastName == ""){
            alert("Last Name cannot be empty");
            return;
        }
        if (phone == ""){
            alert("Phone cannot be empty");
            return;
        }
        const phoneRe = /^(\+\d{2})?\d{10}$/;
        if (!phoneRe.test(phone as string)){
            alert("Invalid Phone Number");
            return;
        }
        if (dob.format("YYYY-MM-DD") == "Invalid Date"){
            alert("Date of Birth is invalid");
            return;
        }
        if (gender == ""){
            alert("Gender cannot be empty");
            return;
        }
        if (nationality == ""){
            alert("Nationality cannot be empty");
            return;
        }

        axios.post("/users/edit_profile", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            dob: dob.format("YYYY-MM-DD"),
            phone_number: phone,
            gender: gender,
            nationality: nationality,
            profile_img: profilePicture || "",
        }).then(res => {
            if (res.data.status == "OK"){
                alert("Changes Saved Successfully");
            }
            else {
                alert("Failed to save changes. Please try again.")
            }
        }, (err) => {
            alert("Failed to save changes. Please try again.\n"+err)
        })
    }

    return (
        <Box {...props} sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{display: "flex", flexDirection: "row", marginRight: {xs: "0", sm: "1rem", md: "2rem", lg: "2rem", xl: "2rem"},}}>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "2rem", padding: "1rem"}} >
                    <Button
                        sx={{
                            color: "white",
                            borderRadius: "50%",
                            padding: "0",
                        }}
                    >
                        <Box component="img" src={profilePicture} width="15rem" height="15rem" sx={{
                            borderRadius: "50%",
                        }} />
                    </Button>
                    <Box 
                        sx={{display: "flex", justifyContent: "flex-end"}}
                    >
                        <IconButton 
                            sx={{
                                border: "1px solid grey",
                                // display: editButtonVisible ? "inherit" : "none",
                                // marginTop: "-5rem",
                                // marginBottom: "5rem",
                            }}
                        >
                            <Edit />
                        </IconButton>
                    </Box>
                </Box>
                <Box marginLeft="2rem" sx={{
                    width: "100%",
                    minWidth: "15rem",
                }}>
                    <Box sx={{
                        marginTop: "1rem",
                    }}>
                        <Typography variant="h6">First Name</Typography>
                        <TextField
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{
                        marginTop: "1rem",
                    }}>
                        <Typography variant="h6">Last Name</Typography>
                        <TextField
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{
                        marginTop: "1rem",
                    }}>
                        <Typography variant="h6">Phone</Typography>
                        <TextField
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            fullWidth
                        />
                    </Box>
                </Box>
            </Box>
            <Divider sx={{marginTop: "2rem", marginRight: {xs: "0", sm: "10rem", md: "2rem", lg: "2rem", xl: "2rem"},}} />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                marginRight: {xs: "0", sm: "10rem", md: "2rem", lg: "2rem", xl: "2rem"},
                minWidth: "15rem",
                marginBottom: "2rem",
            }}>
                <Box sx={{
                    marginTop: "1rem",
                }}>
                    <Typography variant="h6">Email</Typography>
                    <TextField
                        disabled
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box sx={{
                    marginTop: "1rem",
                }}>
                    <Typography variant="h6">Date of Birth</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                            sx={{minWidth: "50%"}}
                            label='Date of Birth'
                            name="dob"
                            value={dob}
                            onChange={(e) => {e && setDob(e);}}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{
                    marginTop: "1rem",
                }}>
                    <Typography variant="h6">Gender</Typography>
                    <Select
                        sx={{minWidth: "50%"}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Age"
                        onChange={(e: any) => {
                            setGender(e.target.value);
                        }}
                    >
                        {genders.map((g, i) => 
                            <MenuItem key={i} value={g}>{g}</MenuItem>
                        )}
                    </Select>
                </Box>
                <Box sx={{
                    marginTop: "1rem",
                }}>
                    <Typography variant="h6">Nationality</Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={nationality}
                        label="Age"
                        onChange={(e: any) => {
                            setNationality(e.target.value);
                        }}
                        sx={{minWidth: "50%"}}
                    >
                        {countries.map((country, i) => 
                            <MenuItem key={i} value={country}>{country}</MenuItem>
                        )}
                    </Select>
                </Box>
                <Box sx={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <Button variant="contained" onClick={saveChanges}>Save Changes</Button>
                </Box>
            </Box>
        </Box>
    )
}



