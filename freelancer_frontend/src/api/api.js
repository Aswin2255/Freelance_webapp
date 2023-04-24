import axiosinstance from "./axios"

export const signUp =  (url,data)=>{
   return axiosinstance.post(url,{data})
}
export const logIn = (url,data)=>{
    return axiosinstance.post(url,{data})
}
export const addJob = (url,data)=>{
    return axiosinstance.post(url,{data})
}
export const getAllclientjobs = (url,data)=>{
    return axiosinstance.get(url)
}
export const getAlljobs = (url,data)=>{
    return axiosinstance.get(url)
}
export const applyJob = (url,data)=>{
    return axiosinstance.post(url,{data})
}
export const getAppliedjob = (url,data)=>{
    return axiosinstance.get(url)
}
export const getjobreq = (url)=>{
    return axiosinstance.get(url)
}