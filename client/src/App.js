import React, { useContext } from 'react';
import Context from './context';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CourseDetail from './components/CourseDetail'
import Notfound from './components/NotFound'
import CreateCourse from './components/CreateCourse';
import DeleteCourse from './components/DeleteCourse';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './components/PrivateRoute';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';

function App() {
  const { value } = useContext(Context);

  return (
    <>
      <Header userName={value.user.userName}/>
      <Switch>
        <Route exact path='/' component={Courses} />
        <Route exact path='/signin' component={UserSignIn} />
        <Route exact path='/signup' component={UserSignUp} />
        <Route exact path='/signout' component={UserSignOut} />
        <PrivateRoute exact path={'/courses/create'} component={CreateCourse}/>
        <Route exact path={`/courses/:id`} component={CourseDetail}/>
        <PrivateRoute exact path={'/courses/:id/update'} component={UpdateCourse}/>
        <PrivateRoute exact path={'/courses/:id/delete'} component={DeleteCourse}/>
        <Route exact path='/error' component={UnhandledError} />
        <Route exact path='/forbidden' component={Forbidden}/>
        <Route exact path='/notfound' component={Notfound} />
        <Redirect to='/notfound' />
      </Switch>
    </>
  );
}

export default withRouter(App);
