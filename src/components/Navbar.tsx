import '../styles/Navbar.css'
import Topsection from "./Topsection";
import Middlesection from "./Middlesection";
import Bottomsection from "./Bottomsection";

interface Props {
    searchBar: boolean;
    isLoggedIn: boolean;
}

const Navbar: React.FC<Props> = ({ searchBar, isLoggedIn }) => {
    return (
        <div className='backGradient'>
            <Topsection isLoggedIn={isLoggedIn} />
            <Middlesection />
            <Bottomsection searchBar={searchBar} />
        </div>
    )
}

export default Navbar;