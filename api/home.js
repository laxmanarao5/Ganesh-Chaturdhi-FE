import axios from "axios"
import { base_url } from "../src/constants/url"

export const getHomePageData = async()=>{
    let response = await axios.get(`${base_url}/home?year=2024`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json' 
        }
      })
      if(response.status == 200) {
        return response.data.data
      } else {
        console.log('error fetching users data')
    }
}