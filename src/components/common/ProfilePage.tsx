import { Box, Tabs, Card} from "@mui/material";
import { useContext, useState } from "react";
import Topsection from "../Topsection";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { LeftTab, TabPanel } from "./TabPanel";
import { ProfileTabPanel,GuestProfiles, AccountTabPanel, KYPTabPanel, PerformanceTabPanel, AboutTabPanel } from "./ProfileTabPanels";


const ProfilePage = () => {
    const { user, mounted } = useContext(AppContext);

    const navigate = useNavigate();

    const [ selectedTab, setSelectedTab ] = useState(0);

    var tabs: string[] = [];
    var tabpanels: any = [];
    
    if (mounted && !user?.isLoggedIn) {
        navigate('/customer/login?redirect=/profile');
    }

    if (!mounted){
        return <Box>Loading...</Box>
    }

    if (user?.isLoggedIn){
        if (user.role === "customer"){
            tabs = ["Profile", "Account", "Guest Profiles", "About",];
            tabpanels = [
                <ProfileTabPanel user={user}/>,
                <AccountTabPanel />,
                <GuestProfiles/>,
                <AboutTabPanel />

            ]
        }
        if (user.role === "partner"){
            tabs = ["Profile", "Account", "KYP", "Performance", "About"];
            console.log("partner", user)
            tabpanels = [
                <ProfileTabPanel user={user}/>,
                <AccountTabPanel />,
                <KYPTabPanel />,
                <PerformanceTabPanel />,
                <AboutTabPanel />

            ]
        }
    }

    if (window) {
        const tab = window.location.href.split("?").pop()?.split("=").pop();
        if (tab && parseInt(tab) < tabs.length){
            if (selectedTab != parseInt(tab))
                setSelectedTab(parseInt(tab));
        } else {
            if (selectedTab != 0)
                setSelectedTab(0);
        }
    }

    if (!mounted || !user){
        return <Box>Loading...</Box>
    }

    return (
        <Box>
            <Box className="backGradient" paddingBottom={"1rem"}>
                <Topsection />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Card sx={{
                        width: "65rem",
                        maxWidth: "90%",
                        marginY: "3rem",
                        boxShadow: 10,
                        overflowX: {xs: "scroll", sm: "scroll", md: "hidden", lg: "hidden", xl: "hidden"},
                    }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        minHeight: "50rem",
                    }}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={selectedTab}
                            onChange={(_event, newValue) => {
                                navigate(`/profile?tab=${newValue}`);
                            }}
                            sx={{
                                borderRight: 1,
                                borderColor: 'divider',
                                width: '10rem',
                                minWidth: '10rem',
                            }}
                        >
                            {tabs.map((tab, index) => <LeftTab key={index} label={tab} />)}
                        </Tabs>
                        <Box width="100%">
                            {tabpanels.map((tabpanel: any, index: number) =>(
                                <TabPanel title={tabs[index]} key={index} value={selectedTab} index={index} sx={{
                                    padding: "1rem",
                                }}>
                                    {tabpanel}
                                </TabPanel>
                            ))}
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}

export default ProfilePage;
