import axios from "axios"

  const http = axios.create({
    baseURL: 'https://provinces.open-api.vn',
    timeout: 30000
  })
  http.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => { 
      return Promise.reject(error)
    },
  )
  
  // response interceptor
  http.interceptors.response.use( 
    (response) => {
      const res = response 
      if (res.status !== 200)
        return Promise.reject(new Error(res.statusText || 'Error'))
  
      else
        return res.data
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  export function getCities(extra = '') {
    return http({
        method: "get",
        url: `/api${extra}`,
      })
  }