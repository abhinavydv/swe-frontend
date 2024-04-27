import { Box, Button } from "@mui/material";
import axios, { AxiosProgressEvent } from "axios";

interface FileHandlerProps {
    type: "image" | "pdf" | "other";
    onChange: (file: FileList) => void;
    onFileRemove?: (index: number) => void;
    multiple?: boolean;
    text: string;
    isUploading?: boolean;
}

export const upload_files = async (files: File[], onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
    var urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        var formData = new FormData();
        formData.append("file", file);

        console.log("uploading file", file);

        try {
            const res = await axios.post("/misc/upload_file", formData, {onUploadProgress: onUploadProgress});

            if (res.data && res.data.status == "OK"){
                urls.push(res.data.url);
                console.log("uploaded file", file);
            } else {
                console.log("error uploading file:", res.data.message);
            }
        } catch (e) {
            console.log("error uploading file:", e);
        }
    }
    return urls;
}


export const FileHandler = ({type, multiple, onChange, onFileRemove, isUploading, text="Upload Image", ...props}: FileHandlerProps) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type == "image" ? "image/*" : type == "pdf" ? "application/pdf" : "*";
    input.multiple = multiple || false;
    input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files){
            onChange(target.files);
        }
    }
    return <Box width="100%" {...props}>
        <Button disabled={isUploading} variant="outlined" onClick={() => {
            input.click();
        }}>
            {text}
        </Button>
    </Box>
}
