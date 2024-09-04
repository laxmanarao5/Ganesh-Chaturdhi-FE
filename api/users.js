import axios from "axios"

export const addUser = async(newItem)=>{
    let response = await axios.put(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/user`, newItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error adding expenditure')
    }
}

export const editUser = async(item)=>{
    let response = await axios.put(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/user?operation=edit`, item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error editing expenditure')
    }
}

export const deleteUser = async(item)=>{
  let response = await axios.put(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/user?operation=delete`, item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'  // Optional, depending on your API needs
      }
    })
    if(response.status == 200) {
      return response
    } else {
      console.log('error deleting expenditure')
  }
}