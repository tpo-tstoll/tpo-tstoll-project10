import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignOut = () => {

    const history = useHistory();

    //removes cookies, refreshes and redirects home
    useEffect(() => {
        Cookies.remove('email');
        Cookies.remove('pass');
        Cookies.remove('username');
        Cookies.remove('loggedIn');
        Cookies.remove('userId');
        history.go(0);
        // eslint-disable-next-line
    }, [])

    return ( 
        <Redirect to="/" />
    );
}
 
export default SignOut;