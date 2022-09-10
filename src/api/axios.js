import axios from "axios";
import { URL } from "../constant";

export const API = axios.create({
    baseURL:URL.BASE,
    "Content-type":"application/json"
})