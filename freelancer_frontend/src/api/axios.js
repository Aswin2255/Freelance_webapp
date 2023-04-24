import Axios from 'axios'



//for local host
//const baseURL = 'http://localhost:3001/api'
const token =  'Bearer' + localStorage.getItem('token')
console.log(token)


//for production
const baseURL = 'https://freelancer-webapp.onrender.com/api'
const axiosinstance = Axios.create({
    baseURL : baseURL,
    withCredentials:true
   
  
})
export default axiosinstance;