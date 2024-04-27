import { Box, Tab, Typography, Divider } from "@mui/material";


export const TabPanel = ({title, ...props}: any) => {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {title && <Box>
                        <Typography sx={{
                            marginLeft: "2rem",
                            fontSize: "2rem",
                            marginBottom: "0.5rem"
                        }}>
                            {title}
                        </Typography>
                        <Divider />
                    </Box>}
                    {children}
                </Box>
            )}
        </Box>
    );
}

export const LeftTab = (props: any) => {
    return (
        <Tab {...props} sx={{borderBottom: 1, borderColor: "divider"}} />
    )
}