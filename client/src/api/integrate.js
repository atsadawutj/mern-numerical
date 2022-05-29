import axios from "axios"

const config = { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcHNpIiwiaWF0IjoxNjUzNTQxOTQzLCJleHAiOjE2ODUwNzc5NDN9.t_ENYPHSnkLj18auCs_2UV9hauWyvMGcMBRAh7-Eqbg` }
export const fetchDataIntegrate = async () => {
    try{
        return await axios.get('http://localhost:3500/integrate', {headers: config})
            .then(response => {
                console.log(response.data)
                return response.data
            })
    } catch (err) {
        console.log(err)
    }
}