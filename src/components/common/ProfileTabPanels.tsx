import { Box, Typography, TextField, IconButton, Button, Divider, Select, MenuItem, FormControl, Paper} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { AppContext, UserDataInterface } from "../App";
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from "dayjs";
import axios from "axios";
import defaultProfilePic from "../../assets/defaultProfilePic.png"
import { FileHandler, upload_files } from "./FileHandler";
import { useNavigate } from "react-router-dom";

interface ProfileTabPanelProps {
    user?: UserDataInterface;
    props?: any;
}

export const ProfileTabPanel = ({user, ...props}: ProfileTabPanelProps) => {

    const [firstName, setFirstName] = useState(user?.first_name);
    const [lastName, setLastName] = useState(user?.last_name);
    const [email, setEmail] = useState(user?.email || "");
    const [profilePicture, setProfilePicture] = useState(user?.profile_picture || "");
    const [phone, setPhone] = useState(user?.phone);
    const [dob, setDob] = useState(dayjs(user?.dob || ""));
    const [gender, setGender] = useState(user?.gender || "");
    const [nationality, setNationality] = useState(user?.nationality || "");
    const [countries, setCountries] = useState([user?.nationality]);

    useEffect(() => {
        axios.get("https://api.first.org/data/v1/countries", {withCredentials: false}).then((res) => {
            var c = [];
            for (var i in res.data.data){
                c.push(res.data.data[i].country);
            }
            setCountries(c);
        }).catch((err) => {
            alert(err);
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
        console.log({
            first_name: firstName,
            last_name: lastName,
            email: email,
            dob: dob.format("YYYY-MM-DD"),
            phone_number: phone,
            gender: gender,
            nationality: nationality,
            profile_img: profilePicture || "",
        })
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

    const profilePicInput = document.createElement("input");
    profilePicInput.type = "file";
    profilePicInput.accept = "image/*";
    profilePicInput.multiple = false;
    profilePicInput.onchange = async (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files){
            const urls = await upload_files(Array.from(target.files));
            setProfilePicture(urls[0]);
        }
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
                        <Box component="img" src={profilePicture} width="15rem" height="15rem"
                            sx={{
                                borderRadius: "50%",
                            }}
                            onError={(e) => {
                                console.log("Error", e);
                                const target = e.target as HTMLImageElement;
                                target.src = defaultProfilePic;
                            }}
                        />
                    </Button>
                    <Box
                        sx={{display: "flex", justifyContent: "flex-end"}}
                    >
                        <IconButton 
                            sx={{
                                border: "1px solid grey",
                            }}
                            onClick={() => profilePicInput.click()}
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


export const AccountTabPanel = ({...props}: any) => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { setUser } = useContext(AppContext);

    const navigate = useNavigate();

    return <Box {...props} sx={{display: "flex", flexDirection: "column", marginTop: "2rem"}}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            marginRight: {xs: "0", sm: "10rem", md: "2rem", lg: "2rem", xl: "2rem"},
            maxWidth: "25rem"
        }}>
            <Typography variant="h5">
                Change Password
            </Typography>
            <Box sx={{marginTop: "1rem"}}>
                <Typography variant="h6">Old Password</Typography>
                <TextField value={oldPassword} fullWidth onChange={(e) => {
                    setOldPassword(e.target.value);
                }}/>
            </Box>
            <Box sx={{marginTop: "1rem"}}>
                <Typography variant="h6">New Password</Typography>
                <TextField value={newPassword}  fullWidth
                    onChange={(e) => {
                        setNewPassword(e.target.value);
                    }}
                />
            </Box>
            <Box sx={{marginTop: "1rem"}}>
                <Typography variant="h6">Confirm Password</Typography>
                <TextField value={confirmPassword} fullWidth onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}/>
            </Box>
            <Box sx={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "flex-end",
            }}>
                <Button variant="contained" onClick={() => {
                    if (newPassword !== confirmPassword){
                        alert("Passwords do not match");
                        return;
                    }
                    axios.post("/users/change_password", {
                        old_password: oldPassword,
                        new_password: newPassword,
                    }).then(res => {
                        if (res.data.status == "OK"){
                            alert("Password Updated Successfully");
                        }
                        else {
                            alert("Failed to update password. Please try again.")
                        }
                    }, (err) => {
                        alert("Failed to update password. Please try again.\n"+err)
                    })
                }}>Update Password</Button>
            </Box>
        </Box>
        <Divider sx={{
            marginY: "2rem",
        }}/>
        <Box>
            <Typography variant="h5">
                Dangerous Section
            </Typography>
            <Box sx={{
                marginTop: "2rem",
                display: "flex",
                maxWidth: "25rem"
            }}>
                <Button color="error" variant="contained" onClick={async () => {
                    await axios.get("/users/logout");
                    window.location.href = "/";
                }}>Logout</Button>
            </Box>
            <Box sx={{
                marginTop: "2rem",
                display: "flex",
                maxWidth: "25rem"
            }}>
                <Button color="error" variant="contained" onClick={() => {
                    axios.get("/users/delete_account").then(res => {
                        if (res.data.status == "OK"){
                            alert("Account Deleted Successfully");
                            setUser
                            navigate("/");
                        }
                        else {
                            alert("Failed to delete account. Please try again.")
                        }
                    }, (err) => {
                        alert("Failed to delete account. Please try again.\n"+err)
                    })
                }}>Delete Account</Button>
            </Box>
        </Box>
    </Box>
}


export const KYPTabPanel = ({...props}: any) => {
    const [panNo, setPanNo] = useState("");
    const [aadharNo, setAadharNo] = useState("");
    const [aadharPdfPath, setAadharPdfPath] = useState("");
    const [hotellingLicensePath, setHotellingLicensePath] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [isAadharUploading, setIsAadharUploading] = useState(false);
    const [isHotellingLicenseUploading, setIsHotellingLicenseUploading] = useState(false);

    useEffect(() => {
        axios.get("/users/get_kyp").then((res) => {
            console.log("kyp", res.data);
            if (res.data.status === "OK"){
                setPanNo(res.data.kyp.pan_number);
                setAadharNo(res.data.kyp.aadhar_number);
                setAadharPdfPath(res.data.kyp.aadhar_photo_path);
                setHotellingLicensePath(res.data.kyp.hotelling_license);
                setAccountNo(res.data.kyp.account_number);
                setIfscCode(res.data.kyp.ifsc_code);
            }
        })
    }, [])

    const updateKYP = (_e: any) => {
        axios.post("/users/kyp_other_data", {
            pan_number: panNo,
            aadhar_number: aadharNo,
            aadhar_photo_path: aadharPdfPath,
            hotelling_license: hotellingLicensePath,
            account_number: accountNo,
            ifsc_code: ifscCode,
        }).then(res => {
            if (res.data.status == "OK"){
                alert("KYP Updated Successfully");
            }
            else {
                alert("Failed to update KYP. Please try again.")
            }
        }, (err) => {
            alert("Failed to update KYP. Please try again.\n"+err)
        })
    }

    return <Box {...props} sx={{marginTop: "2rem"}}>
        <Box sx={{maxWidth: "25rem"}}>
            <Box>
                <Typography variant="h6">
                    PAN Number
                </Typography>
                <TextField value={panNo} onChange={(e) => setPanNo(e.target.value)} fullWidth />
            </Box>
            <Box sx={{marginTop: "1rem"}}>
                <Typography variant="h6">
                    Aadhar Number
                </Typography>
                <TextField value={aadharNo} onChange={(e) => setAadharNo(e.target.value)} fullWidth />
            </Box>
            <Box sx={{marginTop: "1rem"}}>
                <Typography variant="h6">
                    Aadhar
                </Typography>
                {
                    aadharPdfPath !== "" ?
                    <Box>
                        <Button variant="outlined" href={aadharPdfPath} target="_blank">View Aadhar</Button>
                        <IconButton onClick={async () => {
                            await axios.post("/misc/delete_file", {file_id: aadharPdfPath});
                            setAadharPdfPath("");
                        }}>
                            <Delete />
                        </IconButton>
                    </Box> :
                    <Box sx={{display: "flex",}}>
                        <FileHandler type="pdf" text="Upload Aadhar" isUploading={isAadharUploading} onChange={async (files) => {
                            setIsAadharUploading(true);
                            const urls = await upload_files(Array.from(files));
                            setAadharPdfPath(urls[0]);
                            setIsAadharUploading(false);
                        }}/>
                    </Box>
                }
            </Box>
            <Box sx={{marginTop: "1rem"}}>
                <Typography variant="h6">
                    Hotelling License
                </Typography>
                {
                    hotellingLicensePath !== "" ?
                    <Box>
                        <Button variant="outlined" href={hotellingLicensePath} target="_blank">View License</Button>
                        <IconButton onClick={async () => {
                            await axios.post("/misc/delete_file", {file_id: hotellingLicensePath});
                            setHotellingLicensePath("");
                        }}>
                            <Delete />
                        </IconButton>
                    </Box> :
                    <Box sx={{display: "flex",}}>
                        <FileHandler type="pdf" text="Upload Hotelling License" isUploading={isHotellingLicenseUploading} onChange={async (files) => {
                            setIsHotellingLicenseUploading(true);
                            const urls = await upload_files(Array.from(files));
                            setHotellingLicensePath(urls[0]);
                            setIsHotellingLicenseUploading(false);
                        }}/>
                    </Box>
                }
            </Box>
            <Box sx={{marginTop: "1rem"}}>
                <Typography variant="h6">
                    Account Number
                </Typography>
                <TextField value={accountNo} onChange={(e) => setAccountNo(e.target.value)} fullWidth />
            </Box>
            <Box sx={{marginTop: "1rem"}}>
                <Typography variant="h6">
                    IFSC Code
                </Typography>
                <TextField value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} fullWidth />
            </Box>
        </Box>
        <Box sx={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "flex-end",
            maxWidth: "25rem"
        }}>
            <Button variant="contained" onClick={updateKYP}>Update KYP</Button>
        </Box>
    </Box>
}


export const PerformanceTabPanel = ({...props}: any) => {
    return <Box {...props}>
        Performance
    </Box>
}


export const AboutTabPanel = ({...props}: any) => {
    return <Box {...props} sx={{marginTop: "2rem"}}>
        <Typography>
            Welcome to our hotel booking system, where we strive to transform your travel aspirations
            into unforgettable experiences. At Wanderlust, we understand that every journey is unique,
            and we're committed to simplifying the process of finding your perfect accommodation.
            Whether you're planning a luxurious getaway, a family vacation, or a business trip, our
            platform offers a seamless and intuitive booking experience tailored to your needs.
            Our extensive database features a diverse selection of hotels, resorts, and vacation rentals
            worldwide, ensuring that you can find the ideal accommodation no matter where your travels
            take you. From cozy boutique hotels to lavish five-star resorts, we provide options to suit
            every preference and budget. With user-friendly search filters and detailed property
            descriptions, you can easily narrow down your options and make informed decisions. Our
            secure booking platform guarantees peace of mind, allowing you to focus on enjoying your
            trip without worrying about the logistics. At Wanderlust, we prioritize customer satisfaction
            above all else. Our dedicated support team is available around the clock to assist you with
            any inquiries or concerns, ensuring a hassle-free booking experience from start to finish.
            Whether you're embarking on a spontaneous adventure or planning a meticulously orchestrated
            itinerary, let Wanderlust be your trusted companion in the journey of exploration and
            discovery. Book with us today and unlock a world of possibilities.
        </Typography>
    </Box>
}


// export const PreviousBookingsTabPanel = ({...props}: any) => {
//     const [bookings, setBookings] = useState<any[]>([]);

//     useEffect(() => {
//         axios.get("/bookings/past_bookings").then((res) => {
//             if (res.data.status === "OK"){
//                 setBookings(res.data.bookings);
//             }
//         }, (err) => {
//             console.log(err);
//         })
//     }, [])

//     return <Box {...props} sx={{marginTop: "2rem"}}>
//         Previous Bookings
//         {
//             bookings.map((_booking, i) => (
//                 <Box key={i}>
//                     Booking ID: {i}
//                 </Box>
//             ))
//         }
//     </Box>
// }

type Guest = {
    guest_id: number,
    guest_name: string,
    gender: string,
    age: string,
    user_id: number
}


export  const GuestProfiles = ({...props}: any) => {
    const [Name,setName] = useState('')
    const [NameError,setNameError] = useState(false)
    const [guests,setGuests] = useState<Guest[]>([]);

    const [age,setAge] = useState('')
    const [ageError,setAgeError] = useState(false)

    const [gender,setGender] = useState('')
    const [genderError,setGenderError] = useState(false)
    const genders = [
        "Male",
        "Female",
        "Other",
    ]

    useEffect(() => {

        axios.get("/bookings/get_guests").then(res => {

            if (res.data.status == "OK"){
    
                setGuests(res.data.guests)
            }
        })
    }, [])

    const AddGuest = (e: any) => {
        var err = false;
        e.preventDefault()
        setNameError(false)
        setAgeError(false)
        setGenderError(false)


        if (Name == ''){
            setNameError(true)
            err = true
        }
        if (age == ''){
            setAgeError(true)
            err = true
        }
        if (gender == ''){
            setGenderError(true)
            err = true
        }
        if (!err){
            axios.post("/bookings/add_guest",{
                guest_name:Name,
                age:age,
                gender:gender
            }).then(res => {
                
                if (res.data.status == "OK"){
    
                    axios.get("/bookings/get_guests").then(res => {
    
                        if (res.data.status == "OK"){
                    
                            setGuests(res.data.guests)
                        }
                        else{
                            if (res.data.alert){
                                alert(res.data.message)
                            }
                        }
                    })
    
                }
            })
        }
        
    }

    const DeleteGuest = (guest_id: number) => {

        axios.post("/bookings/delete_guest",{
            guest_id: guest_id
        }).then(res => {
            
            if (res.data.status == "OK"){
                setGuests(guests.filter((x) => x.guest_id != guest_id))
            }
        })
    }


    return <Box {...props} sx={{marginTop: "2rem"}}>
        <FormControl>
        <Box
            sx={{
                display:"flex",
                justifyContent:"space-between",

            }}
            >
            <Box
                sx={{
                    margin: "0 1rem",
                }}
                >
                <Typography variant="h6">Name</Typography>
                <TextField  
                    name="name"
                    onChange={(e) => {setName(e.target.value)}}
                    error={NameError}
                    value={Name}
                    required
                    />
            </Box>
            <Box
                sx={{
                    margin: "0 1rem",
                }}
            >
            <Typography variant="h6">Age</Typography>
                <TextField  
                    type="number"
                    name="age"
                    onChange={(e) => {setAge(e.target.value)}}
                    error={ageError}
                    value={age}
                    required
                    sx={{
                        width: "9rem"
                    }}
                    />
            </Box>
            <Box sx={{
                    margin: "0 1rem",
                }}>
                    <Typography variant="h6">Gender</Typography>
                    <Select
                        sx={{minWidth: "10rem"}}
                        error={genderError}
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
                        required
                    </Select>
                </Box>

                    <Button
                    sx={{
                        marginTop: "2rem",
                        marginLeft: "2rem",
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
                    onClick={AddGuest}
                    >
                        +Add
                    </Button>
                
        </Box>
        </FormControl>
        
        {guests.map((guest,index) => {
            return <Paper key={index} elevation={2} sx={{
                width: '100%',
                padding: '1.6rem 1.2rem',
                margin: '1rem 0',
                }}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Box sx={{
                            fontStyle: 'Hind',
                            fontWeight: '500',
                            fontSize: '1.2rem',
                        }}>
                            {guest.guest_name} ● {guest.gender} ● {guest.age}
                        </Box>
                        <Box sx={{
                            flexGrow: 1,
                        }}></Box>

                    <IconButton

                        onClick={() => {
                            setName(guest.guest_name);
                            setAge(guest.age);
                            setGender(guest.gender);
                            DeleteGuest(guest.guest_id)
                        }}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton

                        onClick={() => {
                            DeleteGuest(guest.guest_id)
                        }}
                    >
                        <Delete />
                    </IconButton>
                    </Box>



            </Paper>
        })}
    </Box>
}

