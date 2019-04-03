import axios from 'axios';

export default {
    getUserProfile() {
        return axios.get('/userprofiles/me')
            .then(response => response.data);
    },
    delete() {
        return axios.post("/userprofiles/me/delete")
            .then(response => response.data);
    },
    createWelcomeList() {
        return axios.post("/lists/welcome")
            .then(response => response.data);
    },
    createWelcomeTodoItems(listId) {
        return axios.post(`/lists/${listId}/welcome`)
            .then(response => response.data);
    }
}