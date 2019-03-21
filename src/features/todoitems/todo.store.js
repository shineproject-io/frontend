import axios from 'axios';
import lodash from 'lodash';

import todoService from '@/features/todoitems/todo.service.js';

const state = {
    todoItems: [],
    completedItems: [],
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
        commit('setTodoItems', []);
        commit('setCompletedItems', []);
        commit('setCurrentListId', []);
    },
    setCurrentListId: ({
        commit
    }, listId) => {
        commit('setCurrentListId', listId);
        commit('setTodoItems', []);
        commit('setCompletedItems', []);
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
    },
    changeTodoTitle: ({
        state
    }, model) => {
        todoService
            .changeTitle(model.listId, model.todoItemId, model.title)
            .then(() => {
                var matchedTodoItem = lodash.find(state.todoItems, function (tdo) {
                    return tdo.id === model.todoItemId;
                });

                matchedTodoItem.title = model.title;
            });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}