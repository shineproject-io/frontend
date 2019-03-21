import axios from 'axios';

export default {
    getSuggestions() {
        return axios.get('/lists/suggestions')
            .then(response => response.data);
    }
}