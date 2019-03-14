import listsService from '@/features/lists/lists.service.js';

const state = {
    lists: null,
};
const getters = {
    getLists: state => state.lists,
}
const mutations = {
    setLists: (state, lists) => {
        state.lists = lists;
    }
}
const actions = {
    getLists: ({
        commit
    }) => {
        return listsService.getLists()
            .then(data => {
                commit('setLists', data);
            });
    },
    updateListOrder: ({commit}, lists) => {
        commit('setLists', lists);

        listsService.updateListOrder(lists);

        window.console.log("Updated List Order");
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}