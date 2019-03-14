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
  updateListOrder(lists){
    return axios.post('/lists/order', {
      listIds: lodash.map(lists, "id")
    });
  }
}