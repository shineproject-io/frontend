import axios from 'axios';
import lodash from 'lodash';

import todoService from '@/features/todoitems/todo.service.js';

const state = {
    todoItems: [],
    currentListId: null
};
const getters = {
    openTodoItems: state => {
        let openTodoItems = lodash.filter(state.todoItems, function (tdo) {
            return tdo.state === "Open";
        });

        return lodash.orderBy(
            openTodoItems,
            ["position", "dateCreated"],
            ["asc", "asc"]
        );
    },
    completedTodoItems: state => {
        return lodash.filter(state.todoItems, function (tdo) {
            return tdo.state === "Completed";
        });
    }
}
const mutations = {
    setTodoItems: (state, todoItems) => {
        state.todoItems = todoItems;
    },
    setCurrentListId: (state, currentListId) => {
        state.currentListId = currentListId;
    },
    setTodoItemOrder: (state, openTodoItems) => {
        var loop = 1;

        lodash.forEach(openTodoItems, function (tdo) {
            var stateTodo = lodash.find(state.todoItems, function (stdo) {
                return stdo.id === tdo.id;
            });

            stateTodo.position = loop++;
        });
    }
}
const actions = {
    signOut: ({
        commit
    }) => {
        commit('setTodoItems', []);
        commit('setCurrentListId', []);
    },
    setCurrentListId: ({
        commit
    }, listId) => {
        commit('setCurrentListId', listId);
        commit('setTodoItems', []);
    },
    setTodoItemsOrder: ({
        commit
    }, dispatchModel) => {
        if (dispatchModel.todoItems.length > 0) {
            axios.post(`/lists/${dispatchModel.listId}/todoItems/order`, {
                todoItemIds: lodash.map(dispatchModel.todoItems, "id")
            });

            commit('setTodoItemOrder', dispatchModel.todoItems);
        }
    },
    getTodoItems: ({
        commit,
        state
    }) => {
        return axios.get(`/lists/${state.currentListId}/todoItems`).then(response => {
            commit('setTodoItems', response.data);
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
    getters,
    mutations,
    actions
}