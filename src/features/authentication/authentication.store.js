import authenticationService from '@/features/authentication/authentication.service.js';

const state = {
    authenticationToken: null,
    authenticationExpiry: null
};
const getters = {
    isAnonymous: state => {
        return state.authenticationToken === null;
    }
};
const mutations = {
    setAuthenticationToken: (state, token) => {
        state.authenticationToken = token;
    },
    setAuthenticationExpiry: (state, expiry) => {
        state.authenticationExpiry = expiry;
    }
}
const actions = {
    signIn: ({
        commit
    }, fields) => {
        return authenticationService.signIn(fields.emailAddress, fields.password)
            .then(data => {
                commit('setAuthenticationToken', data.token);
                commit('setAuthenticationExpiry', data.expiration);
            });
    },
    signOut: ({
        commit
    }) => {
        commit('setAuthenticationToken', null);
        commit('setAuthenticationExpiry', null);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}