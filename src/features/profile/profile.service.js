import axios from 'axios';

export default {
    getUserProfile() {
        return axios.get('/userprofiles/me')
            .then(response => response.data);
    }
}