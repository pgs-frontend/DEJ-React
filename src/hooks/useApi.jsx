import { useNavigate } from "@tanstack/react-router";
import axios from "axios"

// Global Axios Defaults
axios.defaults.baseURL = 'https://web.devpgs.com/dubai-economy-jobs/api/data/en';
axios.defaults.headers.post['Content-Type'] = 'application/json';
 
const useApi = () => {

    // Global API Functions
    const get = async (url)=> {
        try {
            const res = await axios.get(url)
            return res.data
        }catch(error){
            throw Error(error)
        }
    }

    const post = async (url, body)=> {
        try {
            const res = await axios.post(url, body)
            return res.data
        }catch(error){
            throw Error(error)
        }
    }

    const update = async (url, body)=> {
        try {
            const res = await axios.patch(url, body)
            return res.data
        }catch(error){
            throw Error(error)
        }
    }


  return {
    get,
    post,
    update,
  }
}

export default useApi