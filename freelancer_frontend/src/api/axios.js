import Axios from 'axios'



//for local host
const baseURL = 'http://localhost:3001/api'


//for production
//const baseURL = 'https://freelancer-webapp.onrender.com/api'
const axiosinstance = Axios.create({
    baseURL : baseURL,
    withCredentials:true
   
  
})
export default axiosinstance;