import axios from "axios"
import { base_url } from "../src/constants/url"

export const fetchUsers = async()=>{
    let response = await axios.get(`${base_url}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json' 
        }
      })
      if(response.status == 200) {
        return response.data
      } else {
        console.log('error fetching users data')
    }
}

export const filterResults = async(year,month,date,type,userEmail,category)=>{
    const queryParams = (month && date) ? year += ('-' + month+ '-' + date) : month ? year += '-' + month : year
    let basicUrl = `${base_url}/${type}?year=${queryParams}`
    if (userEmail) basicUrl += `&user=${userEmail}`
    if(category) basicUrl += `&category=${category}`
    let response = await axios.get(basicUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      })
      if(response.status == 200) {
        return response.data
      } else {
        console.log('error filtering results')
    }
}