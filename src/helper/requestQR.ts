import axios from 'axios'
import { Cookies } from 'react-cookie'
 
// import { getToken } from '@/utils/auth'

enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
// create an axios instance
const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
})

// request interceptor
http.interceptors.request.use(
  (config) => {
    // do something before request is sent
    config.headers.Authorization = `Bearer ${new Cookies().get('auth-token')}`
    config.headers['x-client-id'] = process.env.REACT_APP_QR_CLIENT_ID
    
    config.headers['x-api-key'] = process.env.REACT_APP_QR_API_KEY
    
    config.headers['Content-Type'] = ContentTypeEnum.JSON
    config.headers['Access-Control-Allow-Origin'] =  '*'
    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  },
)

// response interceptor
http.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
      
    
      return   response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
