import axios from 'axios';
import lodash from 'lodash';

const state = {
    todoItems: [],
    completedItems: [],
    currentListId: null
};
const getters = {
    getTodoItems: state => state.todoItems,
    getCompletedItems: state => state.completedItems,
    getCurrentListId: state => state.currentListId
}
const mutations = {
    setTodoItems: (state, todoItems) => {
        state.todoItems = todoItems;
    },
    setCompletedItems: (state, completedItems) => {
        state.completedItems = completedItems;
    },
    setCurrentListId: (state, currentListId) =>{
        state.currentListId = currentListId;
    }
}
const actions = {
    setCurrentListId: ({commit}, listId) => {
        commit('setCurrentListId', listId);
    },
    getTodoItems: ({
        commit, state
    }) => {
        return axios.get(`/lists/${state.currentListId}/todoItems`).then(response => {
            let openTodoItems = lodash.filter(response.data, function(tdo) {
              return tdo.state === "Open";
            });
    
            openTodoItems = lodash.orderBy(
              openTodoItems,
              ["position", "dateCreated"],
              ["asc", "asc"]
            );
    
            let completedItems = lodash.filter(response.data, function(tdo) {
              return tdo.state === "Completed";
            });

            commit('setTodoItems', openTodoItems);
            commit('setCompletedItems', completedItems);
          });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}