import { Box, Typography, IconButton, Paper} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const Listing = ({hotel, onDelete}: any) => {
    const navigate = useNavigate();
    //console.log(hotel)

    const today = new Date().toISOString().split("T")[0];

    return <Box marginY="1rem">
        <Paper elevation={3}>
            <Box marginX="1rem" sx={{display: "flex"}}>
                <Box>
                    <Typography
                        fontSize={32}
                    >
                        {hotel.hotel_name}
                    </Typography>
                    <Typography
                        fontSize={16}
                    >
                        {hotel.address}
                    </Typography>
                </Box>
                <Box flexGrow={1} />
                <Box sx={{display: "flex", justifySelf: "right"}}>
                    <IconButton
                        onClick={() => {
                            navigate(`/hotels?hotel_id=${hotel.hotel_id}&dates=${today}__${today}`)
                        }}
                    >
                        <RemoveRedEye />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            navigate(`/partner?tab=0&hotel_id=${hotel.hotel_id}`)
                        }}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        onClick={async () => {
                            const res = await axios.post("/hotels/delete_hotel", {
                                hotel_id: hotel.hotel_id
                            })
                            if (res.data.status == "OK") {
                                onDelete(hotel.hotel_id)
                            } else {
                                alert("Error: " + res.data.message);
                            }
                        }}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    </Box>
}

export const ViewListings = () => {
    const [listings, setListings] = useState<any[]>([]);

    useEffect(() => {
        axios.get("/hotels/view_listings").then((response: any) => {
            setListings(response.data.listings.reverse());
        })
    }, [])

    return <Box>
        {
            listings.map((listing, index) => {
                return <Listing key={index} hotel={listing} onDelete={(_hotel_id: number) => {
                    axios.get("/hotels/view_listings").then((response: any) => {
                        setListings(response.data.listings.reverse());
                    })
                }} />
            })
        }
    </Box>
}
