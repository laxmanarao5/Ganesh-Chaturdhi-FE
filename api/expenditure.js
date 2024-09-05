import axios from "axios"
import { base_url } from "../src/constants/url"

export const addExpenditure = async(newItem)=>{
    let response = await axios.post(`${base_url}/expenditure`, newItem, {
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

export const editExpenditure = async(item)=>{
    let response = await axios.put(`${base_url}/expenditure?operation=edit`, item, {
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

export const deleteExpenditure = async(item)=>{
  let response = await axios.put(`${base_url}/expenditure?operation=delete`, item, {
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