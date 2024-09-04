import axios from "axios"

export const addOthers = async(newItem)=>{
    let response = await axios.post(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/others`, newItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error adding others')
    }
}

export const editOthers = async(item)=>{
    let response = await axios.put(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/others?operation=edit`, item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error editing others')
    }
}

export const deleteOthers = async(item)=>{
  let response = await axios.put(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/others?operation=delete`, item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'  // Optional, depending on your API needs
      }
    })
    if(response.status == 200) {
      return response
    } else {
      console.log('error deleting others')
  }
}