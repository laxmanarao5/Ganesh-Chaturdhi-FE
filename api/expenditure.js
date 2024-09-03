import axios from "axios"

export const addExpenditure = async(newItem)=>{
    let response = await axios.post(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/expenditure`, newItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error filtering results')
    }
}

export const editExpenditure = async(item)=>{
    let response = await axios.put(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/expenditure?operation=edit`, item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error filtering results')
    }
}

export const deleteExpenditure = async(item)=>{
  let response = await axios.put(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/expenditure?operation=delete`, item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'  // Optional, depending on your API needs
      }
    })
    if(response.status == 200) {
      return response
    } else {
      console.log('error filtering results')
  }
}