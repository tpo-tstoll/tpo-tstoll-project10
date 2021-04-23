import React, { useContext, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Context from '../context';
import api from '../utils/api.js';
import ValidationError from './ValidationError';

const UserSignUp = () => {

    const { value } = useContext(Context);
    const history = useHistory();

    const firstNameInput = useRef('');
    const lastNameInput = useRef('');
    const emailInput = useRef('');
    const passwordInput = useRef('');
    const confirmPasswordInput = useRef('');

    //creates user based upon inputs and encodes password
    const createUser = async () => {
        const encodedPassword = btoa(passwordInput.current.value);
        await api.postCreateUser('users', firstNameInput.current.value, lastNameInput.current.value, emailInput.current.value, passwordInput.current.value);
        
        const response = await api.getUser('users', emailInput.current.value, encodedPassword);
        const { data: {  id, name, email } } = response;

        value.actions.setUser({
            authenticated: true,
            id,
            email,
            userName: name,
            password: encodedPassword,
        });

        history.push('/');
    }

    //sets custom validation to password and confirm password fields
    const validatePassword = () => {
        if (passwordInput.current.value === confirmPasswordInput.current.value) {
            confirmPasswordInput.current.setCustomValidity('');
        } else {
            confirmPasswordInput.current.setCustomValidity("Passwords do not match");
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        value.actions.asyncHandler(createUser);
    }

    return (
        <>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {value.validationError ? <ValidationError /> : null}
                <form onSubmit={onSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" ref={firstNameInput} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" ref={lastNameInput} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailInput} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={validatePassword} ref={passwordInput} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" onKeyUp={validatePassword} ref={confirmPasswordInput} />
                    <button className="button" type="submit">Sign Up</button>
                    <NavLink to="/"><button className="button button-secondary">Cancel</button></NavLink>
                </form>
                <p>Already have a user account? Click here to <NavLink to='/signin'>sign in!</NavLink></p>
            </div>
        </>
    );
}


export default UserSignUp;