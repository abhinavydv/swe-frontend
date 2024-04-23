import { Box, Typography, TextField, IconButton, Button, Divider, Select, MenuItem} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { UserDataInterface } from "../App";
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from "dayjs";
import axios from "axios";
import defaultProfilePic from "../../assets/defaultProfilePic.png"


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
                        <Box component="img" src={profilePicture} width="15rem" height="15rem"
                            sx={{
                                borderRadius: "50%",
                            }}
                            onError={(e) => {
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


export const AccountTabPanel = ({...props}: any) => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                <Button variant="contained" onClick={() => {}}>Update Password</Button>
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
                <Button color="error" variant="contained" onClick={() => {}}>Delete Account</Button>
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

    useEffect(() => {
        axios.get("/users/get_kyp").then((res) => {
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

    const uploadFile = (file: File, url: string) => {
        const formData = new FormData();
        formData.append("file", file);
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.data.status === "OK"){
                alert("File Uploaded Successfully");
            }
            else {
                alert("Failed to upload file. Please try again. " + res.data.message)
            }
        }, (err) => {
            alert("Failed to upload file. Please try again.\n"+err)
        })
    }

    const updateKYP = (_e: any) => {
        axios.post("/users/kyp", {
            pan_number: panNo,
            // aadhar_photo_path: aadharNo,
            // hotelling_license: hotellingLicense,
            aadhar_number: aadharNo,
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
                        <Button variant="contained" href={aadharPdfPath} target="_blank">View Aadhar</Button>
                    </Box> :
                    <Box sx={{display: "flex",}}>
                        <TextField type="file"
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                uploadFile(target.files![0], "/users/upload_aadhar");
                            }}
                        />
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
                        <Button variant="contained" href={hotellingLicensePath} target="_blank">View License</Button>
                    </Box> :
                    <Box sx={{display: "flex",}}>
                        <TextField type="file"
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                uploadFile(target.files![0], "/users/upload_hotelling_license");
                            }}
                        />
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


export const PreviousBookingsTabPanel = ({...props}: any) => {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        axios.get("/bookings/past_bookings").then((res) => {
            if (res.data.status === "OK"){
                setBookings(res.data.bookings);
                console.log(res.data.bookings);
            }
        }, (err) => {
            console.log(err);
        })
    }, [])

    return <Box {...props} sx={{marginTop: "2rem"}}>
        Previous Bookings
        {
            bookings.map((_booking, i) => (
                <Box key={i}>
                    Booking ID: {i}
                </Box>
            ))
        }
    </Box>
}
