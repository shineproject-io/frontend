import suggestionService from '@/features/suggestions/suggestions.service.js';

const state = {
    suggestions: [],
};
const mutations = {
    setSuggestions: (state, suggestions) => {
        state.suggestions = suggestions;
    },
};
const actions = {
    getSuggestions: ({
        commit,
        state
    }) => {
        if (state.suggestions.length === 0) {
            suggestionService.getSuggestions()
                .then(data => {
                    commit('setSuggestions', data);
                });
        }
    },
    signOut: ({
        commit
    }) => {
        commit('setSuggestions', []);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}