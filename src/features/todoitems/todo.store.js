import axios from 'axios';
import lodash from 'lodash';

const state = {
    todoItems: null,
    completedItems: null,
    currentListId: null
}
const mutations = {
    setTodoItems: (state, todoItems) => {
        state.todoItems = todoItems;
    },
    setCompletedItems: (state, completedItems) => {
        state.completedItems = completedItems;
    },
    setCurrentListId: (state, currentListId) => {
        state.currentListId = currentListId;
    }
}
const actions = {
    signOut: ({
        commit
    }) => {
        commit('setTodoItems', null);
        commit('setCompletedItems', null);
        commit('setCurrentListId', null);
    },
    setCurrentListId: ({
        commit
    }, listId) => {
        commit('setCurrentListId', listId);
    },
    setTodoItemsOrder: ({
        commit
    }, dispatchModel) => {
        if (dispatchModel.todoItems.length > 0) {
            axios.post(`/lists/${dispatchModel.listId}/todoItems/order`, {
                todoItemIds: lodash.map(dispatchModel.todoItems, "id")
            });

            commit('setTodoItems', dispatchModel.todoItems);
        }
    },
    getTodoItems: ({
        commit,
        state
    }) => {
        return axios.get(`/lists/${state.currentListId}/todoItems`).then(response => {
            let openTodoItems = lodash.filter(response.data, function (tdo) {
                return tdo.state === "Open";
            });

            openTodoItems = lodash.orderBy(
                openTodoItems,
                ["position", "dateCreated"],
                ["asc", "asc"]
            );

            let completedItems = lodash.filter(response.data, function (tdo) {
                return tdo.state === "Completed";
            });

            commit('setTodoItems', openTodoItems);
            commit('setCompletedItems', completedItems);
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}