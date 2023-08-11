// Axios instance with mindplug auth
import axios from 'axios';


const env = process.env.NODE_ENV;

const backend = axios.create({
    baseURL: env==="development" ? "http://localhost:3001/api" : 'https://connect.mindplug.io/api',
    headers: {
      "Content-Type": "application/json",
    }
});

 export default backend; 