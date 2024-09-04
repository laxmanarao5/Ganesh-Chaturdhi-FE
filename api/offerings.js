import axios from "axios"

export const addOffering = async(newItem)=>{
    let response = await axios.post(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/offerings`, newItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error adding offering')
    }
}

export const editOffering = async(item)=>{
    let response = await axios.put(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/offering?operation=edit`, item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error editing offering')
    }
}

export const deleteOffering = async(item)=>{
  let response = await axios.put(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/offering?operation=delete`, item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'  // Optional, depending on your API needs
      }
    })
    if(response.status == 200) {
      return response
    } else {
      console.log('error deleting offering')
  }
}