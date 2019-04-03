import axios from 'axios';

export default {
    getUserProfile() {
        return axios.get('/userprofiles/me')
            .then(response => response.data);
    },
    delete() {
        return axios.post("/userprofiles/me/delete");
    },
    createWelcomeList() {
        return axios.post("/lists/welcome")
            .then(response => response.data);
    },
    createWelcomeTodoItems(listId) {
        return axios.post(`/lists/${listId}/welcome`);
    },
    uploadAvatar(formData) {
        return axios.put("/userprofiles/me/profilepicture/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    setName(givenName, familyName) {
        return axios.put("/userprofiles/me/name", {
            givenName: givenName,
            familyName: familyName
        });
    },
    setEmailAddress(emailAddress) {
        return axios.put("/userprofiles/me/emailaddress", {
            emailAddress: emailAddress
        });
    }
}