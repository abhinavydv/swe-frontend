import Body from "./Body";
import Navbar from "./Navbar";

interface Props {
    searchBar: boolean;
    isLoggedIn: boolean;
}

const Home: React.FC<Props> = ({ searchBar, isLoggedIn }) => {
    return (
        <div>
            <Navbar searchBar={searchBar} isLoggedIn={isLoggedIn} />
            <Body />
        </div>
    )
}

export default Home;