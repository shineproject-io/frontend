import axios from 'axios';

export default {
    addTodo(listId, todoItemName) {
        var requestModel = {
            title: todoItemName
        };

        return axios.post(`/lists/${listId}/todoItems`, requestModel)
            .then(response => response.data);
    },
    changeTitle(listId, todoItemId, newTitle) {
        return axios.put(`/lists/${listId}/todoItems/${todoItemId}/title`, {
                title: newTitle
            })
            .then(response => response.data);
    },
    changeState(listId, todoItemId, state) {
        var requestModel = {
            state: state
        };

        return axios.put(`/lists/${listId}/todoItems/${todoItemId}/state`, requestModel)
            .then(response => response.data);
    }
}