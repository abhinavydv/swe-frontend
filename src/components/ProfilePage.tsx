import { useContext, useEffect } from "react";
import { AppContext } from "./App";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PartnerProfilePage from "./partner/partnerProfilePage";
import CustomerProfilePage from "./customer/customerProfilePage";


const ProfilePage = () => {
    const { user } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isLoggedIn) {
            navigate('/customer/login?redirect=/profile');
        }
    }, [])

    return (
        <Box>
            {
                user && (
                    user?.role === "partner" &&
                    <PartnerProfilePage /> ||
                    <CustomerProfilePage />
                ) || null
            }
        </Box>
    )
}

export default ProfilePage;
