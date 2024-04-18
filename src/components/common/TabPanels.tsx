import { Box, Typography, TextField, IconButton, Button, Divider } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { UserDataInterface } from "../App";

interface ProfileTabPanelProps {
    user: UserDataInterface;
    props?: any;
}

export const ProfileTabPanel = ({user, ...props}: ProfileTabPanelProps) => {

    const [firstName, setFirstName] = useState(user?.first_name);
    const [lastName, setLastName] = useState(user?.last_name);
    const [email, setEmail] = useState(user?.email);
    const [profilePicture, _setProfilePicture] = useState(user?.profile_picture);
    const [phone, setPhone] = useState(user?.phone);
    const [dob, setDob] = useState(user?.dob);
    const [gender, setGender] = useState(user?.gender);
    const [nationality, setNationality] = useState(user?.nationality);

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
                    <Box sx={{
                        marginTop: "2rem",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}>
                        <Button variant="contained">Save Changes</Button>
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
                    <TextField
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box sx={{
                    marginTop: "1rem",
                }}>
                    <Typography variant="h6">Gender</Typography>
                    <TextField
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box sx={{
                    marginTop: "1rem",
                }}>
                    <Typography variant="h6">Nationality</Typography>
                    <TextField
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box sx={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <Button variant="contained">Save Changes</Button>
                </Box>
            </Box>
        </Box>
    )
}
