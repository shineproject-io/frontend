import profileService from '@/features/profile/profile.service.js';

const state = {
    userProfile: null,
};
const mutations = {
    setUserProfile: (state, userProfile) => {
        state.userProfile = userProfile;
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
    signOut: ({commit}) =>{
        commit('setUserProfile', null);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}