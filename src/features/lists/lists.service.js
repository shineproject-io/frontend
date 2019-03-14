import axios from 'axios';
import lodash from 'lodash';

export default {
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
  addList() {
    return axios.post('/lists', {
        name: `New list`,
        description: "My new list",
        imageSource: "https://shinestorage.azureedge.net/productlistbackgrounds/1.jpg"
      })
      .then(response => response.data);
  },
  deleteList(listId){
    return Promise.all([
      axios.delete(`/lists/${listId}`),
      axios.delete(`/lists/${listId}/todoItems`)
    ]);
  }
}