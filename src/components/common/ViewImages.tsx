
// interface ViewImagesProps {
//     images: string[];
//     onDelete: (index: number) => void;
// }

// export const ViewImages = ({images, onDelete}: ViewImagesProps) => {
//     return <Box>
//         <Stack direction="row" spacing={1}>
//             {images.map((url, index) => (
//                 <Box key={index} sx={{position: "relative"}}>
//                     <Box component="img" src={url} alt="property_image" style={{width: "auto", height: "15rem", maxWidth: "30rem"}}/>
//                     <IconButton
//                         onClick={async () => {
//                             const res = await axios.post("/misc/delete_file", {file_id: url});
//                             console.log(res);
//                             setProperty({...property, property_images: property?.property_images?.filter((_, i) => i != index)})
//                         }}
//                         sx={{position: "absolute", top: 0, right: 0}}
//                     >
//                         <Delete/>
//                     </IconButton>
//                 </Box>
//             ))}
//         </Stack>
//     </Box>
// }