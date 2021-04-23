import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from '../context';

const PrivateRoute = ({ component: Component, location }) => {
    const { value } = useContext(Context);
    //If a user is not signed in, redirects to sign in and passes current location as a prop object, else renders the component
    return (
        <Route>
            {value.user.authenticated  ?  <Component /> 
            : 
            <Redirect to={{ 
                pathname: '/signin',
                state: { from: location } 
                }}
            />}
        </Route>
  );


};

export default PrivateRoute;