import axios from 'axios';

export default {
    signIn(emailAddress, password) {
        return axios.post(`/authentication/signin`, {
          emailAddress: emailAddress,
          password: password
        })
        .then(response => response.data)
    }
}