import axios from "axios"

export const fetchUsers = async()=>{
    let response = await axios.get('https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response.data
      } else {
        console.log('error fetching users data')
    }
}

export const filterResults = async(year,month,date,type)=>{
    const queryParams = (month && date) ? year += ('-' + month+ '-' + date) : month ? year += '-' + month : year
    let response = await axios.get(`https://b3pvkocb62.execute-api.us-east-1.amazonaws.com/dev/${type}?year=${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'  // Optional, depending on your API needs
        }
      })
      if(response.status == 200) {
        return response.data
      } else {
        console.log('error filtering results')
    }
}