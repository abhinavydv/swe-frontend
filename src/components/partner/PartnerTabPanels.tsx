import { Box, Typography, TextField, IconButton, Button, Divider, Select, MenuItem, Stack} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { FileHandler, upload_files } from "../common/FileHandler";
import { Delete } from "@mui/icons-material";


interface EditPropertyProps {
    isNew?: boolean;
    hotelId?: number;
    props?: any;
}

interface RoomInterface {
    room_type?: number,
    bed_type?: string,
    max_occupancy?: number,
    price?: number,
    number_of_available_rooms?: number,
    total_rooms?: number
    room_amenities?: RoomAmenitiesInterface[],
}

interface RoomAmenitiesInterface {
    amenity: string,
    quality: string,
}

interface PropertyInterface {
    hotel_name?: string,
    property_paper?: string,
    property_images?: string[],
    description?: string,
    pincode?: string,
    locality?: string,
    address?: string,
    city?: string,
    state?: string,
    country?: string,
    amenities?: number,
    tag_list?: string[],
    rooms?: RoomInterface[],
}

export const EditPropertyTabPanel = ({isNew, hotelId, ...props}: EditPropertyProps) => {
    const [property, setProperty] = useState<PropertyInterface>();
    const [rooms, setRooms] = useState<RoomInterface[]>([]);
    const [roomAmenities, setRoomAmenities] = useState<RoomAmenitiesInterface[]>([]);

    useEffect(() => {
        if (!isNew){
            axios.get(`/hotel/${hotelId}`)
            .then((res) => {
                setProperty(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [isNew, hotelId])

    return (
        <Box {...props}>
            <Box>
                <Typography variant="h4">{isNew ? "List a Property" : "Edit Property"}</Typography>
                <Divider sx={{marginY: "1rem"}}/>
            </Box>
            <Box>
                <Box sx={{display: "flex", flexDirection: "column", maxWidth: "25rem", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Hotel Name
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={property?.hotel_name}
                        onChange={(e) => setProperty({...property, hotel_name: e.target.value})}
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", maxWidth: "25rem", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Description
                    </Typography>
                    <TextField
                        multiline
                        variant="outlined"
                        fullWidth
                        value={property?.description}
                        onChange={(e) => setProperty({...property, description: e.target.value})}
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Images
                    </Typography>
                    <FileHandler
                        type="image"
                        onChange={async (files: FileList) => {
                            const urls = await upload_files(Array.from(files), (progress) => {
                                console.log(progress);
                            });
                            setProperty({...property, property_images: urls.concat(property?.property_images || [])})
                            console.log("urls", urls);
                        }}
                        multiple={true}
                        text="Upload Images"
                    />
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {property?.property_images?.map((url, index) => (
                            <Box key={index} position="relative">
                                <Box component="img" src={url} alt="property_image" style={{width: "auto", height: "15rem", maxWidth: "60rem"}}/>
                                <IconButton
                                    onClick={async () => {
                                        const res = await axios.post("/misc/delete_file", {file_id: url});
                                        console.log(res);
                                        setProperty({...property, property_images: property?.property_images?.filter((_, i) => i != index)})
                                    }}
                                    sx={{position: "absolute", top: 0, right: 0}}
                                >
                                    <Delete sx={{color: "red"}}/>
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", maxWidth: "25rem", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Locality
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={property?.locality}
                        onChange={(e) => setProperty({...property, locality: e.target.value})}
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", maxWidth: "25rem", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Address
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={property?.address}
                        onChange={(e) => setProperty({...property, address: e.target.value})}
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", maxWidth: "25rem", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        City
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={property?.city}
                        onChange={(e) => setProperty({...property, city: e.target.value})}
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", maxWidth: "25rem", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        State
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={property?.state}
                        onChange={(e) => setProperty({...property, state: e.target.value})}
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", maxWidth: "25rem", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Country
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={property?.country}
                        onChange={(e) => setProperty({...property, country: e.target.value})}
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", maxWidth: "25rem", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Pin code
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={property?.pincode}
                        onChange={(e) => setProperty({...property, pincode: e.target.value})}
                        type="number"
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", maxWidth: "25rem", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Property Paper
                    </Typography>
                    {property?.property_paper && <Box display="flex" alignItems="center">
                        <Typography sx={{marginRight: "1rem"}}>
                            <a href={property?.property_paper} target="_blank" rel="noreferrer">View Property Paper</a>
                        </Typography>
                        <IconButton onClick={async () => {
                            const res = await axios.post("/misc/delete_file", {file_id: property?.property_paper});
                            console.log(res);
                            setProperty({...property, property_paper: ""})
                        }}>
                            <Delete sx={{color: "red"}} />
                        </IconButton>
                    </Box> || <FileHandler
                        type="pdf"
                        onChange={async (files: FileList) => {
                            const url = await upload_files(Array.from(files), (progress) => {
                                console.log(progress);
                            });
                            if (property?.property_paper && property?.property_paper !== ""){
                                const res = await axios.post("/misc/delete_file", {file_id: property?.property_paper});
                                console.log(res);
                            }
                            setProperty({...property, property_paper: url[0]})
                        }}
                        text="Upload PDF"
                    />}
                </Box>
            </Box>
        </Box>
    )
}


export const ListAPropertyTabPanel = () => {
    return <Box>
        <EditPropertyTabPanel isNew />
    </Box>
}
