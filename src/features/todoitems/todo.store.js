import axios from 'axios';
import lodash from 'lodash';

import todoService from '@/features/todoitems/todo.service.js';

const state = {
    todoItems: [],
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
    },
    setTodoItemsOrder: ({
        commit,
        rootState
    }, todoItems) => {
        var currentListId = rootState.listsModule.currentList.id;

        if (todoItems.length > 0) {
            axios.post(`/lists/${currentListId}/todoItems/order`, {
                todoItemIds: lodash.map(todoItems, "id")
            });

            commit('setTodoItemOrder', todoItems);
        }
    },
    getTodoItems: ({
        commit,
        rootState
    }) => {
        var currentListId = rootState.listsModule.currentList.id;

        return axios.get(`/lists/${currentListId}/todoItems`).then(response => {
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