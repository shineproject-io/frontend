import listsService from '@/features/lists/lists.service.js';
import lodash from 'lodash';

const state = {
    lists: [],
    currentList: undefined
}
const getters = {
    otherLists: state => {
        return lodash.filter(state.lists, lst => {
            return lst.id !== state.currentList.id;
        });
    }
}
const mutations = {
    setLists: (state, lists) => {
        state.lists = lists;
    },
    setList: (state, list) => {
        state.currentList = list;
    },
    setBackground: (state, imageSource) => {
        state.currentList.imageSource = imageSource
    }
}
const actions = {
    signOut: ({
        commit
    }) => {
        commit('setLists', []);
    },
    getList: ({
        commit
    }, listId) => {
        commit('setList', null);
        return listsService.getList(listId).then(data => {
            commit('setList', data);
        });
    },
    setBackground: ({
        commit
    }, imageSource) => {
        commit('setBackground', imageSource);
    },
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
    getters,
    mutations,
    actions
}