import axios from "axios"
import { base_url } from "../src/constants/url"

export const addOthers = async(newItem)=>{
    let response = await axios.post(`${base_url}/others`, newItem, {
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
    let response = await axios.put(`${base_url}/others?operation=edit`, item, {
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
  let response = await axios.put(`${base_url}/others?operation=delete`, item, {
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