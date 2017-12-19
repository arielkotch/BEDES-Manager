import axios from 'axios';

export default class Delete {

  deleteTerm(id){
    axios.get('/api/term/proposed/delete/'+ id)
    .then(
      console.log('Deleted'))
    .catch(
      err => console.log(err))
    }
}
