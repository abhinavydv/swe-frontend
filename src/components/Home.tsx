import Body from "./Body";
import Navbar from "./Navbar";

interface Props {
    searchBar: boolean;
}

const Home: React.FC<Props> = ({ searchBar }) => {
    return (
        <div>
            <Navbar searchBar={searchBar} />
            <Body />
        </div>
    )
}

export default Home;