import axios from "axios"
import { base_url } from "../src/constants/url"

export const addDonation = async(newItem)=>{
    let response = await axios.post(`${base_url}/dev/donations`, newItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error adding donation')
    }
}

export const editDonation = async(item)=>{
    let response = await axios.put(`${base_url}/dev/donations?operation=edit`, item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response
      } else {
        console.log('error editing donation')
    }
}

export const deleteDonation = async(item)=>{
  let response = await axios.put(`${base_url}/donations?operation=delete`, item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'  // Optional, depending on your API needs
      }
    })
    if(response.status == 200) {
      return response
    } else {
      console.log('error deleting donation')
  }
}