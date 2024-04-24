import { Link } from 'react-router-dom';
import '../styles/Body.css';

function Body() {
    return (
        <div className='page'>
            <div className='trending'>
                <h1 className='heading'>Trending Destinations</h1>
                <h3 id='subHeading'>Popular choices of over a million Indians</h3>
            </div>

            <div className='row'>
                <Link to='/search?query=Mumbai&dates=' className='card-l mumbai'>
                    <div className='fade'>
                        <div className='spacer'></div>
                        <div className='cardName'>
                            <div className='cardNameContainer'>
                                <h3>Mumbai,</h3>
                                <p>Maharashtra</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to='/search?query=Delhi&dates=' className='card-l delhi'>
                    <div className='fade'>
                        <div className='spacer'></div>
                        <div className='cardName'>
                            <div className='cardNameContainer'>
                                <h3>New Delhi,</h3>
                                <p>Delhi</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            <div className='row'>
                <Link to='/search?query=Hyderabad&dates=' className='card-m hyderabad'>
                    <div className='fade'>
                        <div className='spacer'></div>
                        <div className='cardName'>
                            <div className='cardNameContainer'>
                                <h3>Hyderabad,</h3>
                                <p>Telangana</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to='/search?query=Goa&dates=' className='card-m goa'>
                    <div className='fade'>
                        <div className='spacer'></div>
                        <div className='cardName'>
                            <div className='cardNameContainer'>
                                <h3>Goa</h3>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to='/search?query=Mysore&dates=' className='card-m mysore'>
                    <div className='fade'>
                        <div className='spacer'></div>
                        <div className='cardName'>
                            <div className='cardNameContainer'>
                                <h3>Mysore,</h3>
                                <p>Karnataka</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            
        </div>
    );
}

export default Body;