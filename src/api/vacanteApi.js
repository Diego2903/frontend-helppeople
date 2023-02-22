import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";



const { VITE_API_URL } = getEnvVariables()


const vacanteApi = axios.create({
    
    baseURL : VITE_API_URL

})


export default vacanteApi;
