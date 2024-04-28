import { Box, Dialog, Grid, Typography, TextField, IconButton, Button, Divider, Checkbox, Stack, DialogTitle, Select, MenuItem, Paper} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { FileHandler, upload_files } from "../common/FileHandler";
import { Clear, Delete, Edit } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";


interface EditPropertyProps {
    isNew?: boolean;
    hotelId?: number;
    props?: any;
}

interface RoomInterface {
    room_type: number,
    bed_type: string,
    max_occupancy: number,
    price: number,
    total_rooms: number
    room_amenities: number,
}

interface PropertyInterface {
    hotel_name: string,
    property_paper_path?: string,
    property_images?: string[],
    description?: string,
    pincode?: string,
    locality?: string,
    address?: string,
    city?: string,
    state?: string,
    country?: string,
    amenities: number,
    tag_list: string,
    rooms?: RoomInterface[],
}

const Room = ({room, onEdit, onDelete}: {room: RoomInterface, onEdit: () => void, onDelete: () => void}) => {
    const allRoomAmenities = [
        "Breakfast",
        "Wifi",
        "TV",
        "AC",
        "Mini Fridge",
        "Iron",
        "Microwave",
        "Sofas",
        "Wardrobe",
        "Bathtub/Shower",
        "Vanity Area",
    ]

    return <Paper sx={{padding: "1rem", width: "100%"}} elevation={3}>
        <Box sx={{display: "flex"}}>
            <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                <Typography variant="h6">
                    Room Type: {allRoomTypes[room.room_type]}
                </Typography>
                <Typography variant="h6">
                    Bed Type: {room.bed_type}
                </Typography>
                <Typography variant="h6">
                    Max Occupancy: {room.max_occupancy}
                </Typography>
                <Typography variant="h6">
                    Price: {room.price}
                </Typography>
                <Typography variant="h6">
                    Total Rooms: {room.total_rooms}
                </Typography>
                <Typography variant="h6">
                    Amenities: {allRoomAmenities.filter((_, index) => (room.room_amenities && Boolean(room.room_amenities & (1 << index)))).join(", ")}
                </Typography>
            </Box>
            <Box sx={{display: "flex", alignItems: "flex-start"}}>
                <IconButton onClick={onEdit}>
                    <Edit />
                </IconButton>
                <IconButton onClick={onDelete}>
                    <Delete />
                </IconButton>
            </Box>
        </Box>
    </Paper>
}

const allRoomAmenities = [
    "Breakfast",
    "Wifi",
    "TV",
    "AC",
    "Mini Fridge",
    "Iron",
    "Microwave",
    "Sofas",
    "Wardrobe",
    "Bathtub/Shower",
    "Vanity Area",
]

const allBedTypes = [
    "Twin",
    "Full",
    "Queen",
    "King",
    "Cali King"
]

const allRoomTypes = [
    "Standard",
    "Executive",
    "Suite",
    "Executive Suite",
]

const RoomDialog = ({room, setRoom, open, onClose}: {room: RoomInterface, setRoom: (room: RoomInterface) => void, open: boolean, onClose: () => void}) => {

    const [roomType, setRoomType] = useState<number>(room?.room_type || 0);
    const [bedType, setBedType] = useState<string>(room?.bed_type || "");
    const [maxOccupancy, setMaxOccupancy] = useState<number>(room?.max_occupancy || 0);
    const [price, setPrice] = useState<number>(room?.price || 0);
    const [amenities, setAmenities] = useState<number>(room?.room_amenities || 0);
    const [totalRooms, setTotalRooms] = useState<number>(room?.total_rooms || 0);

    return <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
        <DialogTitle>
            <Typography sx={{fontSize: 32}}>Room Details</Typography>
        </DialogTitle>
        <Box sx= {{marginX: "4rem", marginBottom: "2rem"}}>
            <Box>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Room Type
                    </Typography>
                    <Select
                        variant="outlined"
                        fullWidth
                        value={roomType}
                        onChange={(e) => {
                            if (typeof e.target.value === "string")
                                setRoomType(parseInt(e.target.value));
                            else
                                setRoomType(e.target.value)
                        }}
                    >
                        {allRoomTypes.map((room_type, index) => <MenuItem key={index} value={index}>{room_type}</MenuItem>)}
                    </Select>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Bed Type
                    </Typography>
                    <Select
                        variant="outlined"
                        fullWidth
                        value={bedType}
                        onChange={(e) => {
                            setBedType(e.target.value);
                        }}
                    >
                        {allBedTypes.map((bed_type, index) => <MenuItem key={index} value={bed_type}>{bed_type}</MenuItem>)}
                    </Select>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Max Occupancy per room
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={maxOccupancy}
                        onChange={(e) => setMaxOccupancy(parseInt(e.target.value))}
                        type="number"
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Total number of rooms
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={totalRooms}
                        onChange={(e) => setTotalRooms(parseInt(e.target.value))}
                        type="number"
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Amenities
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {allRoomAmenities.map((amenity, index) => {
                            return <Box key={index} display="flex" alignItems="center">
                                <Checkbox onChange={(e) => {
                                    if (e.target.checked){
                                        setAmenities(amenities | (1 << index));
                                    } else {
                                        setAmenities(amenities & ~(1 << index));
                                    }
                                }}
                                    checked={Boolean(amenities & (1 << index))}
                                />
                                <Typography>{amenity}</Typography>
                            </Box>
                        })}
                    </Stack>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Price
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        type="number"
                    />
                </Box>
                <Box sx={{display: "flex", marginTop: "1rem", justifyContent: "right"}}>
                    <Button variant="contained" onClick={() => {
                        setRoom({
                            room_type: roomType,
                            bed_type: bedType,
                            max_occupancy: maxOccupancy,
                            price: price,
                            total_rooms: totalRooms,
                            room_amenities: amenities,
                        });
                        onClose();
                    }}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    </Dialog>
}

export const EditPropertyTabPanel = ({isNew, hotelId, ...props}: EditPropertyProps) => {
    const [property, setProperty] = useState<PropertyInterface>({
        hotel_name: "",
        property_images: [],
        description: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        country: "",
        amenities: 0,
        tag_list: "",
        rooms: [],
        property_paper_path: ""
    });
    const [rooms, setRooms] = useState<RoomInterface[]>([]);
    const [roomDialogIndex, setRoomDialogIndex] = useState<number>(-1);
    const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
    const [isPDFUploading, setIsPDFUploading] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>(property?.tag_list?.split(",").filter((tag => tag !== '')) || []);

    const navigate = useNavigate();

    const amenities = [
        "Free Wifi",
        "Beach Access",
        "Parking",
        "Beach Voleyball",
        "Breakfast",
        "Cab Services",
        "Kitchen",
        "Swimming Pool",
        "Gym"
    ]

    useEffect(() => {
        const func = async () => {
            if (!isNew){
                var temp_property = property;

                var res = await axios.post(`/hotels/view_hotel`, {hotel_id: hotelId})
                setTags(res.data.listings.tag_list.split(","));
                temp_property = {...temp_property, ...res.data.listings};

                res = await axios.post(`/hotels/get_rooms`, {hotel_id: hotelId})

                const temp_rooms = res.data.rooms.map((room: any) => {
                    return {
                        room_type: room.room_type,
                        bed_type: room.bed_type,
                        max_occupancy: room.max_occupancy,
                        price: room.price,
                        total_rooms: room.total_rooms,
                        room_amenities: room.room_amenities
                    }
                })

                setRooms(temp_rooms);
                temp_property = {...temp_property, rooms: temp_rooms};

                res = await axios.post("/hotels/get_images", {hotel_id: hotelId})
                setProperty({...temp_property, property_images: res.data.images.map((image: any) => image.photo_url)});
            }
        }
        func();
    }, [isNew, hotelId])

    const saveProperty = async () => {
        console.log(property);
        try {
            if (property.hotel_name === ""){
                alert("Hotel name cannot be empty");
                return;
            }
            if (!property.property_images || property.property_images.length === 0){
                alert("Please upload atleast one image");
                return;
            }
            if (property.description === ""){
                alert("Description cannot be empty");
                return;
            }
            if (property.pincode === ""){
                alert("Pincode cannot be empty");
                return;
            }
            if (property.locality === ""){
                alert("Locality cannot be empty");
                return;
            }
            if (property.address === ""){
                alert("Address cannot be empty");
                return;
            }
            if (property.city === ""){
                alert("City cannot be empty");
                return;
            }
            if (property.state === ""){
                alert("State cannot be empty");
                return;
            }
            if (property.country === ""){
                alert("Country cannot be empty");
                return;
            }
            if (!property.rooms || property.rooms.length === 0){
                alert("Please add atleast one room");
                return;
            }
            if (property.tag_list === ""){
                alert("Please add atleast one tag");
                return;
            }
            if (property.property_paper_path === ""){
                alert("Please upload property paper");
                return;
            }

            if (isNew){
                const res = await axios.post("/hotels/add_hotel", property)
                console.log(res);
            } else {
                const res = await axios.post(`/hotels/edit_hotel/${hotelId}`, property)
                console.log(res);
            }
            alert("Hotel Saved")
            setProperty({
                hotel_name: "",
                property_images: [],
                description: "",
                pincode: "",
                locality: "",
                address: "",
                city: "",
                state: "",
                country: "",
                amenities: 0,
                tag_list: "",
                rooms: [],
                property_paper_path: ""
            })
            setRooms([]);
            setTags([]);
            navigate("/partner?tab=1")
        } catch (e){
            alert("Error: " + e);
        }
    }

    return (
        <Box {...props} marginBottom="4rem">
            <Box>
                <Typography variant="h4">{isNew ? "List a Property" : "Edit Property"}</Typography>
                <Divider sx={{marginY: "1rem"}}/>
            </Box>
            <Box>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
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
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
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
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{marginBottom: "1rem"}}>
                        {property?.property_images?.map((url, index) => (
                            <Box key={index} position="relative">
                                <Box component="img" src={url} alt="property_image" style={{width: "auto", height: "15rem", maxWidth: "60rem"}}/>
                                <IconButton
                                    onClick={async (e) => {
                                        const target = e.target as HTMLButtonElement;
                                        target.disabled = true;
                                        const res = await axios.post("/misc/delete_file", {file_id: url});
                                        target.disabled = false;
                                        console.log(res);
                                        setProperty({...property, property_images: property?.property_images?.filter((_, i) => i != index)})
                                    }}
                                    sx={{position: "absolute", top: 0, right: 0, backgroundColor: "white", "": ""}}
                                >
                                    <Clear/>
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                    <FileHandler
                        type="image"
                        onChange={async (files: FileList) => {
                            setIsImageUploading(true);
                            const urls = await upload_files(Array.from(files), (progress) => {
                                console.log(progress);
                            });
                            setIsImageUploading(false);
                            setProperty({...property, property_images: urls.concat(property?.property_images || [])})
                            console.log("urls", urls);
                        }}
                        multiple={true}
                        text={isImageUploading ? "Uploading..." : "Upload Images"}
                        isUploading={isImageUploading}
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
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
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
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
                <Grid container columnSpacing="2rem">
                    <Grid item xs={6} sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                        <Typography variant="h6" sx={{marginRight: "2rem"}}>
                            City
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={property?.city}
                            onChange={(e) => setProperty({...property, city: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                        <Typography variant="h6" sx={{marginRight: "2rem"}}>
                            State
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={property?.state}
                            onChange={(e) => setProperty({...property, state: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                        <Typography variant="h6" sx={{marginRight: "2rem"}}>
                            Country
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={property?.country}
                            onChange={(e) => setProperty({...property, country: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
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
                    </Grid>
                </Grid>
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Property Paper
                    </Typography>
                    {property?.property_paper_path && <Box display="flex" alignItems="center">
                        <Typography sx={{marginRight: "1rem"}}>
                            <a href={property?.property_paper_path} target="_blank" rel="noreferrer">View Property Paper</a>
                        </Typography>
                        {isNew && <IconButton onClick={async () => {
                            const res = await axios.post("/misc/delete_file", {file_id: property?.property_paper_path});
                            console.log(res);
                            setProperty({...property, property_paper_path: ""})
                        }}>
                            <Delete/>
                        </IconButton>}
                    </Box> || <FileHandler
                        type="pdf"
                        onChange={async (files: FileList) => {
                            setIsPDFUploading(true);
                            const url = await upload_files(Array.from(files), (progress) => {
                                console.log(progress);
                            });
                            setIsPDFUploading(false);
                            if (property?.property_paper_path && property?.property_paper_path !== ""){
                                const res = await axios.post("/misc/delete_file", {file_id: property?.property_paper_path});
                                console.log(res);
                            }
                            setProperty({...property, property_paper_path: url[0]})
                        }}
                        text={hotelId != null ? "Cannot re-upload property papers" : (isPDFUploading ? "Uploading..." : "Upload PDF")}
                        isUploading={isPDFUploading || hotelId != null}
                    />}
                </Box>
                <Divider sx={{marginY: "1rem"}} />
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Hotel Amenities
                    </Typography>
                    <Grid container>
                         {amenities.map((amenity, index) => {
                            return <Grid item xs={3} key={index}>
                                <Box display="flex" alignItems="center">
                                    <Checkbox onChange={(e) => {
                                        if (e.target.checked){
                                            setProperty({...property, amenities: property.amenities | (1 << index)});
                                            console.log(property.amenities | (1 << index))
                                        } else {
                                            setProperty({...property, amenities: property.amenities & ~(1 << index)});
                                            console.log(property.amenities & ~(1 << index))
                                        }
                                    }}
                                        checked={Boolean(property?.amenities & (1 << index))}
                                    />
                                    <Typography>{amenity}</Typography>
                                </Box>
                            </Grid>
                         })}
                    </Grid>
                </Box>
                <Divider sx={{marginY: "1rem"}} />
                <Box sx={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Rooms
                    </Typography>
                    {rooms.map((room, index) => {
                        return <Box key={index}>
                            <RoomDialog
                                room={room}
                                setRoom={(room) => {
                                    const newRooms = rooms.map((r, i) => i == index ? room : r);
                                    setProperty({...property, rooms: newRooms});
                                    setRooms(newRooms);
                                }}
                                open={roomDialogIndex == index}
                                onClose={() => {
                                    setRoomDialogIndex(-1);
                                }}
                            />
                            <Box sx={{display: "flex", flexDirection: "row", marginTop: "1rem", alignItems: "center"}}>
                                <Room room={room}
                                    onEdit={() => {
                                        setRoomDialogIndex(index);
                                    }}
                                    onDelete={() => {
                                        setRooms(rooms.filter((_, i) => i != index));
                                    }}
                                />
                            </Box>
                        </Box>
                    })}
                    <Box sx={{marginTop: "1rem"}}>
                        <Button variant="outlined" onClick={() => {
                            const newRoom = {
                                room_type: 0,
                                bed_type: allBedTypes[0],
                                max_occupancy: 0,
                                price: 0,
                                total_rooms: 0,
                                room_amenities: 0
                            }
                            setProperty({...property, rooms: [...rooms, newRoom]});
                            setRooms([...rooms, newRoom]);
                            setRoomDialogIndex(rooms.length);
                        }}>
                            Add room
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{marginY: "1rem"}} />
                <Box>
                    <Typography variant="h6" sx={{marginRight: "2rem"}}>
                        Tags
                    </Typography>
                    <TextField
                        sx={{
                            marginTop: "1rem"
                        }}
                        variant="outlined"
                        fullWidth
                        onKeyDown={(e) => {
                            if (e.key == "Enter"){
                                const target = e.target as HTMLInputElement;
                                const newTags = [...tags, target.value];
                                setTags(newTags);
                                target.value = "";
                                setProperty({...property, tag_list: newTags.join(",")});
                            }
                        }}
                    />
                    <Stack direction="row" spacing={1} marginY="1rem" flexWrap="wrap">
                        {tags.map((tag, index) => (
                            <Box key={index} display="flex" alignItems="center" sx={{
                                border: "1px solid black",
                                borderRadius: 3,
                                paddingLeft: "1rem",
                                marginY: "1rem"
                            }}>
                                <Typography marginRight="1rem">{tag}</Typography>
                                <IconButton onClick={() => {
                                    setTags(tags.filter((_, i) => i != index));
                                    setProperty({...property, tag_list: tags.filter((_, i) => i != index).join(",")});
                                }}>
                                    <Clear />
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                </Box>
                <Box sx={{display: "flex", marginTop: "1rem", justifyContent: "right"}}>
                    <Button variant="contained" onClick={saveProperty}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}


export const ListAPropertyTabPanel = () => {
    const [ searchParams, _setSearchParams ] = useSearchParams();
    const hotel_id = searchParams.get("hotel_id");
    if (hotel_id){
        return <EditPropertyTabPanel hotelId={parseInt(hotel_id)} />
    }
    return <Box>
        <EditPropertyTabPanel isNew />
    </Box>
}
