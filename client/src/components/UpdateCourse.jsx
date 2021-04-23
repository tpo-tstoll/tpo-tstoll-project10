import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';


import api from '../utils/api';
import Context from '../context';
import ValidationError from './ValidationError';

const UpdateCourse = () => {
    const { value } = useContext(Context);
    const history = useHistory();

    //Obtains course id from url
    const path = history.location.pathname.split('/');
    const index = parseInt(path[2]);

    useEffect(() => {
        let course;
        let getCourse = async () => {
            // try to get a course using the course id from url //
            try {
                let response = await api.getCourse(`courses/${index}`)
                course = {
                    courseId: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    estimatedTime: response.data.estimatedTime,
                    materialsNeeded: response.data.materialsNeeded,
                    userId: response.data.User.id
                }
                value.actions.setCourseValues(course);
                // redirect to /forbidden if the user doesn't own the course
                if (course.courseId && course.userId !== value.user.id) {
                    history.push('/forbidden');
                }
            } catch (error) {
                // redirect to notfound if the course doesn't exist, redirect to /error if there is a server error
                error.response.status === 400 ? history.push('/notfound') : history.push('/error');
            }
        }
        getCourse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    //sets CourseValues states with inputs
    const changeHandler = (e) => {
        value.actions.setCourseValues({ ...value.courseValues, [e.target.name]: e.target.value })
    }

    //Submits changes to api
    const changeCourseValues = async (e) => {    
        await api.updateCourse(`courses/${value.courseValues.courseId}`, value.user.email, value.user.password, value.courseValues.title, value.courseValues.description, value.courseValues.estimatedTime, value.courseValues.materialsNeeded);
        history.goBack();
    }
     const onSubmit = async (e) => {
         e.preventDefault();
         value.actions.asyncHandler(changeCourseValues);
     }
    
    const resetValidationErrors = () => {
        value.actions.setValidationError(null);
    }


    //LOWER UPDATE
    return (
        <div className="wrap">
            <h2>Update Course</h2>
            {value.validationError ? <ValidationError /> : null}
            <form onSubmit={onSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="title" type="text" onChange={changeHandler} value={value.courseValues.title} />

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="description" onChange={changeHandler} value={value.courseValues.description}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" onChange={changeHandler} value={value.courseValues.estimatedTime} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" type="text" onChange={changeHandler} value={value.courseValues.materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit" onClick={resetValidationErrors}>Update Course</button>
                <NavLink to={`/courses/${value.courseValues.courseId}`}><button className="button button-secondary" onClick={resetValidationErrors}>Cancel</button></NavLink>
            </form>
        </div>
    );
}

export default UpdateCourse;
