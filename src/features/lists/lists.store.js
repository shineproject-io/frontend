import listsService from '@/features/lists/lists.service.js';
import lodash from 'lodash';

const state = {
    lists: null,
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
    updateListOrder: ({
        commit
    }, lists) => {
        commit('setLists', lists);
        listsService.updateListOrder(lists);
    },
    getDefaultList({
        state
    }, currentListId) {
        return new Promise((resolve, reject) => {
            if (state.lists.length <= 1) {
                reject(Error("There is no default list"));
            } else {
                var listsInDescendingOrder = lodash.orderBy(
                    state.lists,
                    ["position", "id"],
                    ["desc", "desc"]
                );

                var defaultList = lodash.find(listsInDescendingOrder, function (lst) {
                    return lst.id !== currentListId;
                });

                resolve({
                    listId: defaultList.id
                });
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}