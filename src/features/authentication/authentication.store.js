import authenticationService from '@/features/authentication/authentication.service.js';

const state = {
    authenticationToken: null,
};
const getters = {
    getAuthenticationToken: state => state.authenticationToken,
}
const mutations = {
    setAuthenticationToken: (state, token) => {
        state.authenticationToken = token;
    }
}
const actions = {
    signIn: ({
        commit
    }, fields) => {
        return authenticationService.signIn(fields.emailAddress, fields.password)
            .then(data => {
                commit('setAuthenticationToken', data.token);
            });
    },
    signOut: ({
        commit
    }) => {
        commit('setAuthenticationToken', null);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}