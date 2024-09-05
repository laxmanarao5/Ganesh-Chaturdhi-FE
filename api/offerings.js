import axios from "axios"
import { base_url } from "../src/constants/url"

export const addOffering = async(newItem)=>{
    let response = await axios.post(`${base_url}/offerings`, newItem, {
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
    let response = await axios.put(`${base_url}/offering?operation=edit`, item, {
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
  let response = await axios.put(`${base_url}/offering?operation=delete`, item, {
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