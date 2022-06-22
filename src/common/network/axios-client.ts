import axios from "axios"
import { BASE_URL } from "../../shared/constants"


const axiosClient = axios.create({

    // We should use .env for baseUrl in production but
    // for simplicity let's just hardcode it
    baseURL: BASE_URL,

    headers: {
        'Content-type': 'application/json',
    },
})

//TODO: Add axios interceptors if necessary 

export { axiosClient }