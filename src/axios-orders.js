import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-d0d57.firebaseio.com/'
});

export default instance;