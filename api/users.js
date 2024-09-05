import axios from "axios"
import { base_url } from "../src/constants/url"

export const addUser = async(newItem)=>{
    let response = await axios.put(`${base_url}/user`, newItem, {
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
    let response = await axios.put(`${base_url}/user?operation=edit`, item, {
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
  let response = await axios.put(`${base_url}/user?operation=delete`, item, {
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