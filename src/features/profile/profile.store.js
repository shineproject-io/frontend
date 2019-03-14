import profileService from '@/features/profile/profile.service.js';

const state = {
    userProfile: null,
};
const mutations = {
    setUserProfile: (state, userProfile) => {
        state.userProfile = userProfile;
    },
    clearStore: state => {
        state.userProfile = null;
    },
}

const actions = {
    loadUserProfile: ({
        commit, state
    }, shouldOverwrite) => {
        if (state.userProfile === null || shouldOverwrite){
            profileService.getUserProfile()
            .then(data => {
                commit('setUserProfile', data);
            });
        }
    },
    clearStore: ({commit}) =>{
        commit('clearStore');
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}