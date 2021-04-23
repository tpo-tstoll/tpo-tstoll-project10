import React, { useContext } from 'react';
import Context from '../context';
import { NavLink } from 'react-router-dom';
import CourseCard from './CourseCard';

//Navigates to page and updates path based upon click. 
const Courses = () => {
    const { value } = useContext(Context);

    const resetValidationErrors = () => {
        const { actions: { setValidationError } } = value;
        setValidationError(null);
    }

    return (
        <>
            <main>
                <div className="wrap main--grid">
                {value.courses.map(course => { 
                    return <CourseCard key={course.id} title={course.title} href={course.id} />
                 })}
                    <NavLink onClick={resetValidationErrors} className="course--module course--add--module" to={'/courses/create'}>
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                        </span>
                    </NavLink>
                </div>
            </main>
        </>
    );
}

export default Courses;