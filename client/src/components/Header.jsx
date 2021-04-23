import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
    //username passed in a prop
    const { userName } = props;

    //dynamically returns header if a user is logged in or logged out
    return ( 
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                {userName ? 
                    <nav>
                        <ul className="header--signedin">
                            <li>Welcome, {userName}!</li>
                            <li><NavLink to="/signout">Sign Out</NavLink></li>
                        </ul>
                    </nav>
                :
                    <nav className="header--signedout">
                        <ul >
                            <li><NavLink to="/signup">Sign Up</NavLink></li>
                            <li><NavLink to="/signin">Sign In</NavLink></li>
                        </ul>
                    </nav>
                }
            </div>
        </header>
    );
}
 
export default Header;
