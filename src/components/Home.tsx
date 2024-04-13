import { Box } from "@mui/material";
import Body from "./Body";
import Navbar from "./Navbar";

interface Props {
    searchBar: boolean;
}

const Home: React.FC<Props> = ({ searchBar }) => {
    return (
        <div>
            <Navbar searchBar={searchBar} />
            <Box>
                <Body />
            </Box>
        </div>
    )
}

export default Home;