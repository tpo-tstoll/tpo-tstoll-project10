import React, { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context';
import ValidationError from '../components/ValidationError';


const CreateCourse = () => {

    let history = useHistory()


    const { value: { user, validationError }, value: { actions: { setNewCourse } } } = useContext(Context);

    const courseTitle = useRef('');
    const courseDescription = useRef('');
    const estimatedTime = useRef('');
    const materialsNeeded = useRef('');

    const onSubmit = e => {
        e.preventDefault();

        const course = { 
            title: courseTitle.current.value, 
            description: courseDescription.current.value, 
            estimatedTime: estimatedTime.current.value, 
            materialsNeeded: materialsNeeded.current.value,
            userId: user.id
        };

        // check to see if user has been authenticated, route to forbidden page if not
        user.authenticated ? setNewCourse(course) : history.push('/forbidden');
    }

    const onCancel = () => {
        history.push('/');
    }

    return ( 
        <div className="wrap">
                <h2>Create Course</h2>

                {validationError ? <ValidationError />: null}
                
                <form onSubmit={onSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle}/>

                            <label htmlFor="courseAuthor">Course Author</label>
                            <input id="courseAuthor" name="courseAuthor" type="text" value={user.userName} readOnly/>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" >Create Course</button>
                    <button className="button button-secondary" onClick={onCancel}>Cancel</button>
                </form>
            </div>
     );
}
 
export default CreateCourse;