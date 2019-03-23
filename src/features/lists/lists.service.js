import axios from 'axios';
import lodash from 'lodash';

export default {
  getList(listId) {
    return axios.get(`/lists/${listId}`).then(response => response.data);
  },
  getLists() {
    return axios.get('/lists').then(response => {
      let lists = lodash.orderBy(
        response.data,
        ["position", "id"],
        ["asc", "asc"]
      );
      return lists
    });
  },
  updateListOrder(lists) {
    return axios.post('/lists/order', {
      listIds: lodash.map(lists, "id")
    });
  },
  delete(listId) {
    return Promise.all([
      axios.delete(`/lists/${listId}`),
      axios.delete(`/lists/${listId}/todoItems`)
    ]);
  },
  create(title, description, imageSource) {
    return axios.post(`/lists`, {
      name: title,
      description: description,
      imageSource: imageSource
    })
    .then(response => response.data);
  }
}