import { Box, Tabs, Card} from "@mui/material";
import { useState } from "react";
import Navbar from "../Navbar";
import { LeftTab, TabPanel } from "../common/TabPanel";
import { UserDataInterface } from "../App";
import { ListAPropertyTabPanel } from "./PartnerTabPanels";

interface PartnerHomeProps {
    user: UserDataInterface;
    props?: any;
}

export const PartnerHome = ({user, ...props}: PartnerHomeProps) =>  {

    const [ selectedTab, setSelectedTab ] = useState(0);

    var tabs: string[] = ["List a Property", "My Properties", "Performance"];
    var tabpanels: any = [
        <ListAPropertyTabPanel />,
        <Box>My Properties</Box>,
        <Box>Performance</Box>,
    ];

    return (
        <Box {...props}>
            <Box className="backGradient" paddingBottom={"1rem"}>
                <Navbar />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Card sx={{
                        width: "75rem",
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
                                setSelectedTab(newValue);
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
                                <TabPanel key={index} value={selectedTab} index={index} sx={{
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
