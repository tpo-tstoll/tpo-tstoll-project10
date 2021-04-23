import axios from 'axios';

const url = 'http://localhost:5000/api/'

//Api requests

// eslint-disable-next-line
export default {

    getCourse: async (path) => {
        const response = await axios.get(`${url}${path}`);
        return response;
    },
     
    getUser: async (path, email, password) => {
        const decodedPassword = atob(password);
        const response = await axios.get(`${url}${path}`, {
            auth: {
                username: email,
                password: decodedPassword
            }
        });
        return response;
    },

    postCreateUser: async (path, firstName, lastName, emailAddress, password) => {

        const response = await axios.post(`${url}${path}`, {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            password: password
        });
        return await response;

    },

    postNewCourse: async (course, email, password) => {
        const decodedPassword = atob(password);

        const response = await axios.post(
            `${url}courses`, course,
            {
                auth: {
                    username: email,
                    password: decodedPassword
                },
            }
        )
        return response
    },

    deleteCourse: async(path, email, password) => {
        const decodedPassword = atob(password);
        await axios.delete(`${url}${path}`, {
            auth: {
                username: email,
                password: decodedPassword
            }
        });
    },
    
    updateCourse: async(path, email, password, courseTitle, courseDescription, courseTime, courseMaterials) => {
        const decodedPassword = atob(password);
        const response = await axios.put(`${url}${path}`, {
            title: courseTitle,
            description: courseDescription,
            estimatedTime: courseTime,
            materialsNeeded: courseMaterials
            }, 
            {
            auth: {
                username: email,
                password: decodedPassword
            }
        });
        return response;
    }
}
