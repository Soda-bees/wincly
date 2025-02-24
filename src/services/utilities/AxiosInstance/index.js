import axios from 'axios';
import backendURL from '../../config/backendURL';

// const backendURL = "http://192.168.100.59:5000/"

const timeout = 10000

const apiInstance = axios.create({
    backendURL,
    timeout,
    withCredentials: true,   
});



export default apiInstance;