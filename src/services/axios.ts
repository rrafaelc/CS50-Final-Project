import axios from 'axios'
import { appURL } from 'constants/urls'

const api = axios.create({
  baseURL: appURL,
})

export default api
