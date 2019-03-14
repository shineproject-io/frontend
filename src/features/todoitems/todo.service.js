import axios from 'axios';

export default {
    addTodo(listId, todoItemName) {
        var requestModel = {
            title: todoItemName
        };

        return axios.post(`/lists/${listId}/todoItems`, requestModel)
            .then(response => response.data);
    }
}