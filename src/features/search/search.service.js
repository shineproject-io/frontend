import axios from 'axios';

export default {
    search(searchQuery) {
        return axios.get(`/search?searchQuery=${searchQuery}`)
            .then(response => response.data);
    }
}