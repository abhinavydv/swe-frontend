import { Box, Typography, createTheme } from "@mui/material"
import "../styles/Navbar.css"
import "../styles/Footer.css"
import { Link } from "react-router-dom"
import { Grid } from "@mui/material"
import { LocalPhone, Email } from "@mui/icons-material"

export const Footer = () => {
    return (
        <Box className="backGradient">
            <Box sx={{display: "flex", flexDirection: "row", paddingY: "2rem", justifyContent: "center"}}>
                <Grid container width="65rem">
                    <Grid item xs={4} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Box sx={{display: "flex", flexDirection: "column", width: "fit-content"}}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                            >
                                Quick Links
                            </Typography>
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/faqs" className="footer-link">FAQs</Link>
                            <Link to="/about" className="footer-link">About</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Box sx={{display: "flex", flexDirection: "column", width: "fit-content"}}>
                            <div className="footer-company">
                                WANDERLUST.COM
                            </div>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "white",
                                }}
                            >
                                Book | Rest | Enjoy
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Box sx={{display: "flex", flexDirection: "column", width: "fit-content"}}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                            >
                                Contact Us
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <LocalPhone sx={{color: "white", marginRight: "1rem"}}/>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "white",
                                        justifyContent: "center",
                                    }}
                                >
                                    +91 1234567890
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <Email sx={{color: "white", marginRight: "1rem"}}/>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "white",
                                    }}
                                >
                                    wanderlust@iith-ac.in
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}