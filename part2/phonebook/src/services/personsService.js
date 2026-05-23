import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log('promise fulfilled')
  return request
  .then(response => response.data) 
  .catch(error => {
      console.error("Error all person:", error)
    })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request
      .then(response => response.data)
      .catch(error => {
      console.error("Error adding person:", error)
    })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
  .catch(error => {
      console.error("Error updating person:", error)
    })
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data) 
  .catch(error => {
      console.error("Error remove person:", error)
    })
}

export default { getAll, create, update, remove }
