import '../styles/Bottomsection.css';
import Placeholder from '../assets/placeholder.png';
import Calendar from '../assets/calendar.png';

function Bottomsection() {
    return (
        <div id='bottomContainer'>
            <div id='bar'>
                <div id='location'>
                    <img src={Placeholder} alt='Map pin icon' id='pin'/>
                    Where do you want to go?
                </div>
                <div id='dates'>
                    <img src={Calendar} alt='Calendar icon' id='calendar'/>
                    Select dates
                </div>
                <button id='search'>
                    <div id='searchDiv'>
                        Search
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Bottomsection;